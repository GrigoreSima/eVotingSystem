package ubb.evotingsystembackend.Controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import ubb.evotingsystembackend.Domain.Candidate;
import ubb.evotingsystembackend.Domain.DTOs.CitizenDTO;
import ubb.evotingsystembackend.Requests.LoginRequest;
import ubb.evotingsystembackend.Requests.VoteRequest;
import ubb.evotingsystembackend.Services.CitizenService;
import ubb.evotingsystembackend.Services.EncryptionService;


@RestController
@RequestMapping("/citizen")
public class CitizenController {


    private static final Logger log = LoggerFactory.getLogger(CitizenController.class);

    private final CitizenService citizenService;
    private final EncryptionService encryptionService;

    public CitizenController(CitizenService citizenService, EncryptionService encryptionService) {
        this.encryptionService = encryptionService;
        this.citizenService = citizenService;
    }

    @GetMapping("/public_key")
    public String getPublicKey() {
        log.info("Getting public key");
        return encryptionService.getPublicKeyAsString();
    }

    @GetMapping("/candidates")
    public Candidate[] getCandidates() {
        log.info("Getting candidates");
        return citizenService.getCandidates().toArray(new Candidate[0]);
    }

    @PostMapping("/login")
    public CitizenDTO login(@RequestBody LoginRequest request) {
        log.info("Login request: {}", request.toString());
        return citizenService.login(request.email(), request.password());
    }

    @PostMapping("/vote")
    public void vote(@RequestBody VoteRequest request) {
        log.info("Vote request: {}", request.toString());
        citizenService.vote(request.encrytedVote(), request.signedVote(), request.citizenID());
    }

    @GetMapping("/test")
    public void test() {

    }
}
