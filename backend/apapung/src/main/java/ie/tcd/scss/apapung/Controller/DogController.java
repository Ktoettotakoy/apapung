package ie.tcd.scss.apapung.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import ie.tcd.scss.apapung.Service.DogService;

import java.util.Map;

@RestController
public class DogController {

    @Autowired
    private DogService dogService;

    @GetMapping("/breed-info/{fullBreed}")
    public Map<String, Object> getBreedInfo(@PathVariable String fullBreed) {
        String breedQuery = fullBreed.replace("-", " ");
        return dogService.getBreedInfo(breedQuery);
    }
}