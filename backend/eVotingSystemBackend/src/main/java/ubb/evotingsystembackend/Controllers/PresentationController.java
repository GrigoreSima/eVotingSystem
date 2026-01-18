package ubb.evotingsystembackend.Controllers;

import jakarta.servlet.ServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import ubb.evotingsystembackend.Responses.CountsResponse;
import ubb.evotingsystembackend.Services.PresentationService;

@RestController
@RequestMapping("/presentation")
public class PresentationController {

    private final PresentationService presentationService;

    public PresentationController(PresentationService presentationService) {
        this.presentationService = presentationService;
    }

    @GetMapping("/counts")
    public CountsResponse getCounts() {
        return new CountsResponse(presentationService.getNumberOfVoters(), presentationService.getNumberOfCitizens());
    }
    
}
