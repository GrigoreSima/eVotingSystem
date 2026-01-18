package ubb.evotingsystembackend.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ubb.evotingsystembackend.Services.CitizenService;

@RestController
public class InitController {

    private final CitizenService citizenService;

    public InitController(CitizenService citizenService) {
        this.citizenService = citizenService;
    }

    @GetMapping("/initiate")
    public String initiate() {

        citizenService.initiate();
        return "initiated successfully";
    }
}
