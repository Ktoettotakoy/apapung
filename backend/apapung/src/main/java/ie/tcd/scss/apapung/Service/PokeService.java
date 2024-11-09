package ie.tcd.scss.apapung.Service;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.Duration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@Service
public class PokeService {
    private final String pokeAPIToken;
    private final RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(PokeService.class);

    @Autowired
    public PokeService(RestTemplateBuilder restTemplateBuilder) {
        Dotenv dotenv = Dotenv.configure().load();
        this.pokeAPIToken = dotenv.get("POKEAPI_TOKEN");
        if (this.pokeAPIToken == null) {
            throw new IllegalStateException("POKEAPI_TOKEN is missing from the .env file.");
        }

        // debug prints
        logger.debug("Loaded PokeAPI Token: {}", pokeAPIToken);

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
        headers.set("Authorization", "Bearer " + this.pokeAPIToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return response.getStatusCode() == HttpStatus.OK;
        } catch (HttpClientErrorException.NotFound e) {
            return false;
        }
    }

    public int getPokeApiStats(String pokemon) {
        // set up api url
        String url = "https://pokeapi.p.sulu.sh/api/v2/pokemon/" + pokemon + "/";

        // Set up api access headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", this.pokeAPIToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        int totalBaseStat = 0;

        try {
            // Get response and parse
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            ObjectMapper objectMapper = new ObjectMapper();

            // Use TypeReference to avoid unchecked conversion warning
            Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), new TypeReference<Map<String, Object>>() {});

            // Calculate the total base stats
            List<Map<String, Object>> stats = (List<Map<String, Object>>) responseMap.get("stats");
        
            for (Map<String, Object> stat : stats) {
                totalBaseStat += (int) stat.get("base_stat");
            }
    }
        catch (JsonProcessingException e){
        e.printStackTrace();
        }
            return totalBaseStat;
        }
    }