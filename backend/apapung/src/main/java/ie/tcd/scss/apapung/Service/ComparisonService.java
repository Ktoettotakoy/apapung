package ie.tcd.scss.apapung.Service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComparisonService {
    @Autowired
    private DogService dogService;

    @Autowired
    private PokeService pokeService;

    public int compareDogsAndPokemon(String dogName, String pokemonName) {
        Map<String, Object> pokemonStats = pokeService.getPokeApiStats(pokemonName);

        if (!pokemonStats.containsKey("Total base stats")) {
            throw new RuntimeException("Total base stats not found for Pokémon: " + pokemonName);
        }

        int pokemonBaseStatTotal = (int) pokemonStats.get("Total base stats");

        Map<String, Object> dogBreedInfo = dogService.getBreedInfo(dogName);

        if (dogBreedInfo == null) {
            throw new RuntimeException("Breed information not found for dog: " + dogName);
        }

        int dogStrength = dogService.calculateStrengthScore(dogBreedInfo);

        // Calculate the number of dogs needed to exceed the Pokémon's base stats
        // If dogStrength is 0, avoid division by zero
        if (dogStrength <= 0) {
            throw new RuntimeException("Invalid dog strength score: " + dogStrength);
        }

        // Calculate the minimum number of dogs required, rounding up
        int dogsNeeded = (int) Math.ceil((double) pokemonBaseStatTotal / dogStrength);
        return dogsNeeded;
    }
}
