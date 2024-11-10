package ie.tcd.scss.apapung.Controller;

import ie.tcd.scss.apapung.Service.ComparisonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ComparisonController {

    @Autowired
    private ComparisonService comparisonService;

    @GetMapping("/compare/{pokemonName}/{dogName}")
    public Map<String, Object> comparePokemonAndDogs(
            @PathVariable String pokemonName, 
            @PathVariable String dogName) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Call the service to calculate the number of dogs needed
            Map<String, Object> result = comparisonService.comparePokemonAndDogs(pokemonName, dogName);

            // Extract data from the result map
            int dogsNeeded = (int) result.get("dogsNeeded");
            int dogStrength = (int) result.get("dogStrength");
            int pokemonBaseStatTotal = (int) result.get("pokemonBaseStatTotal");

            // Prepare the response with the comparison details
            response.put("pokemon", pokemonName);
            response.put("dogBreed", dogName);
            response.put("dogsNeeded", dogsNeeded);
            response.put("dogStrength", dogStrength);
            response.put("pokemonBaseStatTotal", pokemonBaseStatTotal);
        } catch (Exception e) {
            // Handle error and return a response
            response.put("error", "Error occurred during comparison: " + e.getMessage());
        }
        return response;
    }
}

