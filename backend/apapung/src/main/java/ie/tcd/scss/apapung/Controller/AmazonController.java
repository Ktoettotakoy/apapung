package ie.tcd.scss.apapung.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import ie.tcd.scss.apapung.Service.AmazonService;

@RestController
public class AmazonController {
    @Autowired
    private AmazonService amazonService;

    @GetMapping("amazon/product/{asin}")
    public Map<String, Object> getProductDetails(
            @PathVariable String asin) {

        Map<String, Object> productDetails = amazonService.getProductDetails(asin);
        return productDetails;
    }

    @GetMapping("amazon/bestselling/{category}")
    public List<Map<String, Object>> getBestSellingProducts(
            @PathVariable String category) {
        return amazonService.getBestSellingProducts(category);
    }
}
