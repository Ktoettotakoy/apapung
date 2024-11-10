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
    public Map<String, Object> comparePokemonAndDog(
            @PathVariable String pokemonName, 
            @PathVariable String dogName) {

        // Call the service to calculate the number of dogs needed
        int dogsNeeded = comparisonService.compareDogsAndPokemon(pokemonName, dogName);

        // Prepare the response
        Map<String, Object> response = new HashMap<>();
        response.put("pokemon", pokemonName);
        response.put("dogBreed", dogName);
        response.put("dogsNeeded", dogsNeeded);
        
        return response;
    }
}
