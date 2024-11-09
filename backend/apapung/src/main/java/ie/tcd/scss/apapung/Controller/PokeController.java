package ie.tcd.scss.apapung.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ie.tcd.scss.apapung.Service.PokeService;

import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/pokemon")
public class PokeController {

    private final PokeService pokeService;

    public PokeController(PokeService pokeService) {
        this.pokeService = pokeService;
    }

    @GetMapping("/{pokemon}/strength")
    public ResponseEntity<Map<String, Object>> getPokeStats(@PathVariable String pokemon) {
        // determine if pokemon is a valid pokemon name
        if (!pokeService.isValidName(pokemon)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("Error", "Pokemon name invalid"));
        }
        // calculate the total base stat of the pokemon
        int baseStats = 0;

        return ResponseEntity.ok(Map.of("Success", "The name was recognised as vaild."));

    }

    // @GetMapping("/{pokemon}/sprite}")
    // public String getMethodName(@RequestParam String param) {
    // return "Function not fully developed.";
    // }

}