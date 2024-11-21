package ie.tcd.scss.apapung.controllers;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;

import ie.tcd.scss.apapung.Service.DogService;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DogServiceTest {
    
    @Autowired
    private DogService dogService;
    
    @Test
    public void testCalculateStrengthScore() {
        // sample input
        Map<String, Object> breedInfo = Map.of(
            "weight", Map.of("imperial", "25 - 38", "metric", "11 - 17"),
            "height", Map.of("imperial", "10.5 - 12.5", "metric", "27 - 32"),
            "id", 68,
            "name", "Cardigan Welsh Corgi",
            "bred_for", "Cattle droving",
            "breed_group", "Herding",
            "life_span", "12 - 14 years",
            "temperament", "Affectionate, Devoted, Alert, Companionable, Intelligent, Active",
            "reference_image_id", "SyXN-e9NX",
            // "image", Map.of("id", "SyXN-e9NX", "width", 800, "height", 600, "url", "https://cdn2.thedogapi.com/images/SyXN-e9NX.jpg"),
            "images", new String[]{"https://cdn2.thedogapi.com/images/SyXN-e9NX_1280.jpg"}
        );

        // Call the method
        double result = dogService.calculateStrengthScore(breedInfo);

        // Assert the result
        assertThat(result).isEqualTo(0.6181428571428572); 
    }
    
}
