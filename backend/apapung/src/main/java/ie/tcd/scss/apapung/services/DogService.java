package ie.tcd.scss.apapung.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;
import java.util.List;
import java.util.Map;

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
            Map<String, Object> breedInfo = breeds.get(0);  // Get the first result

            // Fetch images using the breed ID from the response
            int breedId = (int) breedInfo.get("id");
            List<String> images = getBreedImages(breedId);

            // Add images to the breed info
            breedInfo.put("images", images);
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
}

