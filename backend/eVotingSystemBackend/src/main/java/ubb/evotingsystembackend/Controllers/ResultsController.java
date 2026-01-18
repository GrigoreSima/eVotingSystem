package ubb.evotingsystembackend.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import ubb.evotingsystembackend.Services.ResultsService;

import java.util.Map;

@RestController
@RequestMapping("/results")
public class ResultsController {

    private final ResultsService resultsService;

    ResultsController(ResultsService resultsService) {
        this.resultsService = resultsService;
    }

    @GetMapping
    public Map<Integer, Integer> getResults() {
        return resultsService.getResults();
    }
}
