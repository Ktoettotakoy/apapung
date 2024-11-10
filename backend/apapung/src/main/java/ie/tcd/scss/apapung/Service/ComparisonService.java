package ie.tcd.scss.apapung.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ComparisonService {
    private static final Logger logger = LoggerFactory.getLogger(ComparisonService.class);

    @Autowired
    private DogService dogService;

    @Autowired
    private PokeService pokeService;

    public Map<String, Object> comparePokemonAndDogs(String pokemonName, String dogName) {
        logger.info("Comparing Pokemon: {} with dog: {}", pokemonName, dogName);

        Map<String, Object> response = new HashMap<>();

        // Fetch Pokémon stats
        Map<String, Object> pokemonStats = pokeService.getPokeApiStats(pokemonName);

        if (!pokemonStats.containsKey("Total base stats")) {
            throw new RuntimeException("Total base stats not found for Pokémon: " + pokemonName);
        }

        int pokemonBaseStatTotal = (int) pokemonStats.get("Total base stats");
        logger.info("Pokémon Base Stat Total: {}", pokemonBaseStatTotal);

        // Fetch dog breed info
        Map<String, Object> dogBreedInfo = dogService.getBreedInfo(dogName);

        if (dogBreedInfo == null) {
            throw new RuntimeException("Breed information not found for dog: " + dogName);
        }

        double dogStrength = dogService.calculateStrengthScore(dogBreedInfo);
        logger.info("Dog Strength: {}", dogStrength);

        // Handle invalid dog strength score
        if (dogStrength <= 0) {
            throw new RuntimeException("Invalid dog strength score: " + dogStrength);
        }

        // Calculate the number of dogs needed to exceed Pokémon's base stat total
        int dogsNeeded = (int) Math.ceil((double) pokemonBaseStatTotal / dogStrength);
        logger.info("Number of dogs required: {}", dogsNeeded);

        response.put("dogsNeeded", dogsNeeded);
        response.put("dogStrength", dogStrength);
        response.put("pokemonBaseStatTotal", pokemonBaseStatTotal);

        return response;
    }
}