package ie.tcd.scss.apapung.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import ie.tcd.scss.apapung.Service.DogService;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DogController {

    @Autowired
    private DogService dogService;

    @GetMapping("/breed-info/{fullBreed}")
    public Map<String, Object> getBreedInfo(@PathVariable String fullBreed) {
        String breedQuery = fullBreed.replace("-", " ");
        return dogService.getBreedInfo(breedQuery);
    }

    @GetMapping("breed-info/{fullBreed}/clean")
    public Map<String, Object> getCleanBreedInfo(@PathVariable String fullBreed) {
        Map<String, Object> result = new HashMap<>();

        String breedQuery = fullBreed.replace("-", " ");
        Map<String, Object> info = dogService.getBreedInfo(breedQuery);

        // clean the data
        result.put("name", info.get("name"));
        result.put("weight", ((Map<String, String>) info.get("weight")).get("metric"));
        result.put("height", ((Map<String, String>) info.get("height")).get("metric"));
        result.put("lifespan", info.get("life_span"));
        result.put("images", info.get("images"));
        result.put("strength", "????"); // Masked strength

        return result;
    }

    @GetMapping("price/{breed}")
    public double getBreedPrice(@PathVariable String breed) {
        return dogService.getDogPrice(breed);
    }
}