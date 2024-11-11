package ie.tcd.scss.apapung.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

@Service
public class DogService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${external.dog.api.key}")
    private String apiKey;

    public Map<String, Object> getBreedInfo(String breedQuery) {
        // Construct the URL for searching the breed and sub-breed
        String url = "https://api.thedogapi.com/v1/breeds/search?q=" + breedQuery;

        // Set up headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make the GET request
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);
        List<Map<String, Object>> breeds = response.getBody();

        if (breeds != null && !breeds.isEmpty()) {
            Map<String, Object> breedInfo = breeds.get(0); // Get the first result

            // Fetch images using the breed ID from the response
            int breedId = (int) breedInfo.get("id");
            List<String> images = getBreedImages(breedId);

            // Add images to the breed info
            breedInfo.put("images", images);

            // Calculate and add the strength score to the breed info
            double strengthScore = calculateStrengthScore(breedInfo);
            breedInfo.put("strength", strengthScore);

            double dogPrice = getDogPrice(breedQuery);
            breedInfo.put("average price", dogPrice);

            return breedInfo;
        } else {
            throw new RuntimeException("No data found for breed: " + breedQuery);
        }
    }

    private List<String> getBreedImages(int breedId) {
        String url = "https://api.thedogapi.com/v1/images/search?breed_id=" + breedId + "&limit=5"; // Limit to 5 images

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);
        List<Map<String, Object>> imagesData = response.getBody();

        return imagesData.stream()
                .map(imageData -> (String) imageData.get("url"))
                .toList();
    }

    public double calculateStrengthScore(Map<String, Object> breedInfo) {
        int weightScore = 0;
        int heightScore = 0;

        // Weight: get the metric weight and normalize it
        Map<String, String> weightMap = (Map<String, String>) breedInfo.get("weight");
        if (weightMap != null) {
            String metricWeight = weightMap.get("metric");
            int avgWeight = parseRangeToAverage(metricWeight);
            weightScore = Math.min(avgWeight, 20); // Max out weight score at 40
        }

        // Height: get the metric height and normalize it
        Map<String, String> heightMap = (Map<String, String>) breedInfo.get("height");
        if (heightMap != null) {
            String metricHeight = heightMap.get("metric");
            int avgHeight = parseRangeToAverage(metricHeight);
            heightScore = Math.min(avgHeight, 30); // Max out height score at 30
        }

        // Calculate the raw strength score, with a max of 100
        double rawStrengthScore = weightScore + heightScore;

        // Now, scale it down to the range 0.01 to 1
        // Assuming the max possible raw strength score is 70 (40 + 30 from weight and
        // height max)
        double normalizedStrength = Math.min(rawStrengthScore / 70.0, 1.0); // Scale to [0, 1]
        return Math.max(normalizedStrength * 0.99 + 0.01, 0.01); // Scale to [0.01, 1]
    }

    // Helper method to parse a range and get the average
    private int parseRangeToAverage(String range) {
        try {
            String[] parts = range.split("-");
            int low = Integer.parseInt(parts[0].trim());
            int high = Integer.parseInt(parts[1].trim());
            return (low + high) / 2;
        } catch (Exception e) {
            return 0;
        }
    }

    // Web scrape to find the average price of the breed
    public int getDogPrice(String breed) {
        try {
            // URL to scrape
            String url = "https://dogsforsaleireland.ie/search-results/?ad_title=" + breed;

            Document document = Jsoup.connect(url).get();

            Elements priceElements = document.select("div.price");

            List<Double> prices = new ArrayList<>();

            for (Element priceElement : priceElements) {
                // Extract the price text
                String priceText = priceElement.ownText();

                // Use regex to extract only the numeric part of the price (e.g., "600.00")
                String numericPrice = priceText.replaceAll("[^\\d.]", "").trim();

                try {
                    // Parse to double and add to the list
                    if (!numericPrice.isEmpty()) {
                        prices.add(Double.parseDouble(numericPrice));
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Skipping invalid price: " + priceText);
                }
            }

            // Calculate the average
            double sum = prices.stream().mapToDouble(Double::doubleValue).sum();
            return prices.isEmpty() ? (int) (Math.random() * (550 - 250) + 250) : (int) Math.ceil(sum / prices.size());
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching price of breed: " + breed);
        }
    }
}