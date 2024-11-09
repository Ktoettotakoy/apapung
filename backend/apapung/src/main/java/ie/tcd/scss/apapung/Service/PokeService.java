package ie.tcd.scss.apapung.Service;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import java.time.Duration;

import java.util.Map;

@Service
public class PokeService {
    private final String pokeAPIToken;
    private final RestTemplate restTemplate;

    public PokeService(RestTemplateBuilder restTemplateBuilder) {
        Dotenv dotenv = Dotenv.configure().load();
        this.pokeAPIToken = dotenv.get("POKEAPI_TOKEN");
        if (this.pokeAPIToken == null) {
            throw new IllegalStateException("POKEAPI_TOKEN is missing from the .env file.");
        }

        // Configure RestTemplate with timeouts
        this.restTemplate = restTemplateBuilder
                .setConnectTimeout(Duration.ofSeconds(5))
                .setReadTimeout(Duration.ofSeconds(5))
                .build();
    }

    // checks if the parameter is a valid pokemon name.
    public boolean isValidName(String name) {
        String url = "https://pokeapi.p.sulu.sh/api/v2/pokemon/" + name + "/";

        // Set up access headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", this.pokeAPIToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return response.getStatusCode() == HttpStatus.OK;
        } catch (HttpClientErrorException.NotFound e) {
            return false;
        }
    }

    // private Map<String, Object> getPokeApiStats(String pokemon) {
    // String url = "https://pokeapi.p.sulu.sh/api/v2/stat/" + pokemon + "/";
    // RestTemplate restTemplate = new RestTemplate();

    // // Fetch data from PokeAPI
    // Map<String, Object> response = restTemplate.getForObject(url, Map.class);

    // return response;
    // }

    // private void processPokeData(Map<String, Object> data) {
    // // Example of processing the data: Add calculated values to the map, etc.
    // if (data != null) {
    // // Perform any calculations or modifications to 'data' here
    // // e.g., data.put("processedValue", calculatedValue);
    // }
    // }

}