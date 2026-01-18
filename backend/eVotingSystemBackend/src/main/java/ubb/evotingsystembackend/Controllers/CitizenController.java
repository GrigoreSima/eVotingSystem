package ubb.evotingsystembackend.Controllers;

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

    private final CitizenService citizenService;
    private final EncryptionService encryptionService;

    public CitizenController(CitizenService citizenService, EncryptionService encryptionService) {
        this.encryptionService = encryptionService;
        this.citizenService = citizenService;
    }

    @GetMapping("/public_key")
    public byte[] getPublicKey() {
        return encryptionService.getPublicKey().getEncoded();
    }

    @GetMapping("/candidates")
    public Candidate[] getCandidates() {
        return citizenService.getCandidates().toArray(new Candidate[0]);
    }

    @PostMapping("/login")
    public CitizenDTO login(@RequestBody LoginRequest request) {
        return citizenService.login(request.email(), request.password());
    }

    @PostMapping("/vote")
    public void vote(@RequestBody VoteRequest request) {
        citizenService.vote(request.encrytedVote(), request.signedVote(), request.citizenID());
    }

    @GetMapping("/test")
    public void test() {

    }
}
