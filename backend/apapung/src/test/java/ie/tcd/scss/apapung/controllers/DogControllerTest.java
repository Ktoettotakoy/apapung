package ie.tcd.scss.apapung.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DogControllerTest {
    @LocalServerPort
    protected int port;

    @Autowired
    protected TestRestTemplate restTemplate;

    @Test
    public void getBreed_shouldReturnFirstResultFound() {
        String breed = "hound";
        ResponseEntity<String> response = restTemplate.getForEntity(
                "http://localhost:" + port + "/breed-info/" + breed,
                String.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getBreed_shouldReturnCorrectAttributes() {
        String breed = "scottish-deerhound";
        ResponseEntity<String> response = restTemplate.getForEntity(
                "http://localhost:" + port + "/breed-info/" + breed,
                String.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        
        String responseBody = response.getBody();

        assertThat(responseBody).contains("\"weight\":{\"imperial\":\"70 - 130\",\"metric\":\"32 - 59\"}"); 
        assertThat(responseBody).contains("\"height\":{\"imperial\":\"28 - 32\",\"metric\":\"71 - 81\"}"); 
        assertThat(responseBody).contains("\"life_span\":\"8 - 10 years\"");

    }
}
