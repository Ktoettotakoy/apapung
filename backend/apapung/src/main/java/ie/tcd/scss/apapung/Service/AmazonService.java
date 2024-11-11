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

import java.util.List;
import java.util.Map;

@Service
public class AmazonService {

    @Autowired
    private RestTemplate restTemplate;

    private final String apiKey;

    private static final Logger logger = LoggerFactory.getLogger(ComparisonService.class);

    public AmazonService() {
        Dotenv dotenv = Dotenv.load();  // Load .env file
        this.apiKey = dotenv.get("AMAZON_TOKEN");  // Get the API key from the .env file
    }

    public Map<String, Object> getProductDetails(String asin) {
        // Construct the URL with ASIN
        String url = "https://real-time-amazon-data.p.sulu.sh/v2/product-offers?country=gb&asin=" + asin;

        // Set up headers with API key for authentication
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);  // Include the API key in the Authorization header

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
                String shortenedTitle = productTitle.length() > 50 ? productTitle.substring(0, 50) + "..." : productTitle;

                // Convert the price from GBP to EUR by multiplying by 1.2
                double priceInGbp = Double.parseDouble(productPrice.replace("£", "").trim());
                double priceInEur = priceInGbp * 1.2;

                // Return the product details along with the converted price
                return Map.of(
                    "product_title", shortenedTitle,
                    "product_price_gbp", "£" + String.format("%.2f", priceInGbp),
                    "product_price_eur", "€" + String.format("%.2f", priceInEur),
                    "product_link", productLink,
                    "product_image", productImage
                );
            } else {
                throw new RuntimeException("No product data found for ASIN: " + asin);
            }
        } else {
            throw new RuntimeException("Unable to fetch product data for ASIN: " + asin);
        }
    }


    public List<Map<String, Object>> getBestSellingProducts(String category) {
        String url = String.format("https://real-time-amazon-data.p.sulu.sh/v2/best-sellers?country=gb&category=%s&page=1", category);
    
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
    
        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
    
            // Extract the "data" object and then get the "products" list within it
            Map<String, Object> data = (Map<String, Object>) response.getBody().get("data");
            List<Map<String, Object>> bestSellers = (List<Map<String, Object>>) data.get("best_sellers");
    
            List<Map<String, Object>> topProducts = bestSellers.subList(0, Math.min(bestSellers.size(), 6)).stream()
            .map(product -> Map.of(
                "product_title", product.get("product_title"),
                "product_price", product.get("product_price"),
                "product_photo", product.get("product_photo"),
                "product_url", product.get("product_url")
            ))
            .toList();

            return topProducts;
    
        } catch (Exception e) {
            logger.error("Failed to fetch best-selling products for category: " + category, e);
            throw new RuntimeException("Error fetching best-selling products.", e);
        }
    }
}
