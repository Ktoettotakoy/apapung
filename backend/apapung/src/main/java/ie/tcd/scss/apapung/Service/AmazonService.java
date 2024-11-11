package ie.tcd.scss.apapung.Service;

import io.github.cdimascio.dotenv.Dotenv;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AmazonService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private DogService dogService;

    private final String apiKey;

    private static final Logger logger = LoggerFactory.getLogger(ComparisonService.class);

    public AmazonService() {
        Dotenv dotenv = Dotenv.load(); // Load .env file
        this.apiKey = dotenv.get("AMAZON_TOKEN"); // Get the API key from the .env file
    }

    public Map<String, Object> getProductDetails(String asin) {
        // Construct the URL with ASIN
        String url = "https://real-time-amazon-data.p.sulu.sh/v2/product-offers?country=gb&asin=" + asin;

        // Set up headers with API key for authentication
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey); // Include the API key in the Authorization header

        // Create HttpEntity with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Send GET request to the endpoint with the headers
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

        // Check if the response body contains product information
        if (response.getBody() != null) {
            Map<String, Object> productData = (Map<String, Object>) response.getBody().get("data");

            if (productData != null) {
                // Extract the product title and price
                String productTitle = (String) productData.get("product_title");
                String productPrice = (String) productData.get("product_price");
                String productLink = (String) productData.get("product_url");
                String productImage = (String) productData.get("product_photo");

                // Shorten the title
                String shortenedTitle = productTitle.length() > 50 ? productTitle.substring(0, 50) + "..."
                        : productTitle;

                // Convert the price from GBP to EUR by multiplying by 1.2
                double priceInGbp = Double.parseDouble(productPrice.replace("£", "").trim());
                double priceInEur = priceInGbp * 1.2;

                // Return the product details along with the converted price
                return Map.of(
                        "product_title", shortenedTitle,
                        "product_price_gbp", "£" + String.format("%.2f", priceInGbp),
                        "product_price_eur", "€" + String.format("%.2f", priceInEur),
                        "product_link", productLink,
                        "product_image", productImage);
            } else {
                throw new RuntimeException("No product data found for ASIN: " + asin);
            }
        } else {
            throw new RuntimeException("Unable to fetch product data for ASIN: " + asin);
        }
    }

    public List<Map<String, Object>> getBestSellingProducts(String category, String breed) {
        String url = String.format("https://real-time-amazon-data.p.sulu.sh/v2/best-sellers?country=gb&category=%s&page=1", category);
    
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
    
        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
    
            // Extract the "data" object and then get the "best_sellers" list within it
            Map<String, Object> data = (Map<String, Object>) response.getBody().get("data");
            List<Map<String, Object>> bestSellers = (List<Map<String, Object>>) data.get("best_sellers");
    
            if (bestSellers == null || bestSellers.isEmpty()) {
                throw new RuntimeException("No best-selling products found.");
            }
    
            // Fetch dog price based on breed
            double dogPrice = dogService.getDogPrice(breed);
    
            // Calculate the price range (±30% of dogPrice)
            double minPrice = dogPrice * 0.7; // 30% lower than dogPrice
            double maxPrice = dogPrice * 1.3; // 30% higher than dogPrice
    
            // Filter products based on the price range
            List<Map<String, Object>> filteredProducts = bestSellers.stream()
                    .filter(product -> {
                        String priceStr = (String) product.get("product_price");
                        // Clean the price string to get the numeric value
                        double productPrice = parsePrice(priceStr);
                        return productPrice >= minPrice && productPrice <= maxPrice;
                    })
                    .map(product -> Map.of(
                            "product_title", truncateTitle((String) product.get("product_title")), // Truncate title
                            "product_price", product.get("product_price"),
                            "product_photo", product.get("product_photo"),
                            "product_url", product.get("product_url"),
                            "quantity_can_buy", 1
                    ))
                    .limit(6) // Get only the top 6 products within the price range
                    .collect(Collectors.toList());
    
            // If filtered products are fewer than 6, fill the remaining spots with products outside the price range
            if (filteredProducts.size() < 6) {
                // Find out-of-range products and calculate how many of them can be bought with dogPrice
                List<Map<String, Object>> outOfRangeProducts = bestSellers.stream()
                        .filter(product -> {
                            String priceStr = (String) product.get("product_price");
                            double productPrice = parsePrice(priceStr);
                            return productPrice < minPrice || productPrice > maxPrice; // Out of the price range
                        })
                        .map(product -> {
                            String priceStr = (String) product.get("product_price");
                            double productPrice = parsePrice(priceStr);
    
                            // Calculate how many of this product can be bought with dogPrice
                            int quantity = (int) (dogPrice / productPrice);
    
                            // Add the product and quantity information
                            return Map.of(
                                    "product_title", truncateTitle((String) product.get("product_title")),
                                    "product_price", product.get("product_price"),
                                    "product_photo", product.get("product_photo"),
                                    "product_url", product.get("product_url"),
                                    "quantity_can_buy", quantity // Add calculated quantity
                            );
                        })
                        .collect(Collectors.toList());
    
                // Add out-of-range products to the filtered products until we have 6 items
                Collections.shuffle(outOfRangeProducts);
                int remainingSpots = 6 - filteredProducts.size();
                filteredProducts.addAll(outOfRangeProducts.subList(0, Math.min(remainingSpots, outOfRangeProducts.size())));
            }
            return filteredProducts;
        } catch (Exception e) {
            logger.error("Failed to fetch best-selling products for category: " + category, e);
            throw new RuntimeException("Error fetching best-selling products.", e);
        }
    }
    
    // Helper method to parse the price string to a double
    private double parsePrice(String priceStr) {
        // Assuming the price string is in the format "£12.99"
        try {
            return Double.parseDouble(priceStr.replace("£", "").trim());
        } catch (NumberFormatException e) {
            return 0.0; // Return a default value if the price format is invalid
        }
    }
    
    // Helper method to truncate the title to 50 characters
    private String truncateTitle(String title) {
        return title.length() > 50 ? title.substring(0, 50) + "..." : title;
    }    
}
