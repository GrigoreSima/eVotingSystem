package ubb.evotingsystembackend.Services;

import org.springframework.stereotype.Service;
import ubb.evotingsystembackend.Domain.Candidate;
import ubb.evotingsystembackend.Domain.Citizen;
import ubb.evotingsystembackend.Domain.DTOs.CitizenDTO;
import ubb.evotingsystembackend.Domain.EncryptedVote;
import ubb.evotingsystembackend.Domain.Voter;
import ubb.evotingsystembackend.Repositories.*;
import ubb.evotingsystembackend.Utility.CitizenMapper;

import java.security.KeyPair;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CitizenService {

    private final CertificateService certificateService;

    private final CitizensRepository citizensRepository;
    private final CandidatesRepository candidatesRepository;
    private final VotesRepository votesRepository;
    private final VotersRepository votersRepository;
    private final EncryptedVotesRepository encryptedVotesRepository;
    private final EncryptionService encryptionService;

    public CitizenService(CitizensRepository citizensRepository, CandidatesRepository candidatesRepository, VotesRepository votesRepository, VotersRepository votersRepository, CertificateService certificateService, EncryptedVotesRepository encryptedVotesRepository, EncryptionService encryptionService) {
        this.citizensRepository = citizensRepository;
        this.candidatesRepository = candidatesRepository;
        this.votesRepository = votesRepository;
        this.votersRepository = votersRepository;
        this.certificateService = certificateService;
        this.encryptedVotesRepository = encryptedVotesRepository;
        this.encryptionService = encryptionService;
    }

    public List<Candidate> getCandidates() {
        return candidatesRepository.findAll();
    }

    public CitizenDTO login(String email, String password) {
        Optional<Citizen> citizenOptional = citizensRepository.findByEmail(email);

        if (citizenOptional.isPresent()) {
            Citizen citizen = citizenOptional.get();
            if (citizen.getPassword().equals(password))
                return CitizenMapper.toDTO(citizen);
        }

        return new CitizenDTO();
    }

    public void vote(String encryptedVote, String signedVote, Integer citizenID) {

        citizensRepository.findById(citizenID).ifPresent(citizen -> {
            if (votersRepository.findByCitizenId(citizenID).isPresent()) {
                return;
            }

            if (certificateService.verify(encryptedVote, signedVote, citizen.getCAPubK())) {
                return;
            }

            votersRepository.save(new Voter(citizen));
            encryptedVotesRepository.save(new EncryptedVote(encryptedVote));
        });
    }

    public void initiate() {
        encryptionService.generateKeys();

        createCitizens().forEach(citizen -> {

            KeyPair keys = certificateService.generateCAKeys();

            citizen.setCAPubK(keys.getPublic());
            citizen.setCAPrivK(keys.getPrivate());

            citizensRepository.save(citizen);
        });

        candidatesRepository.saveAll(createCandidates());
    }

    public List<Citizen> createCitizens() {
        List<Citizen> citizens = new ArrayList<>();

        citizens.add(new Citizen("James", "Smith", "james.smith@example.com", "Pass123!"));
        citizens.add(new Citizen("Maria", "Garcia", "m.garcia@corporation.co", "Secure$Net1"));
        citizens.add(new Citizen("Robert", "Johnson", "rjohnson@university.edu", "Study_Hard88"));
        citizens.add(new Citizen("Lisa", "Williams", "lisa.dev@techloop.io", "Python_Lover"));
        citizens.add(new Citizen("David", "Brown", "david.brown@local.gov", "CityHall2024"));
        citizens.add(new Citizen("Jennifer", "Jones", "jenny.j@gmail.com", "musiclover1"));
        citizens.add(new Citizen("Charles", "Miller", "cmiller@provider.net", "Xy9#mP!2"));
        citizens.add(new Citizen("Patricia", "Davis", "patty.davis99@yahoo.com", "99887766"));
        citizens.add(new Citizen("Bo", "Li", "bo.li@startup.asia", "Beijing#1"));
        citizens.add(new Citizen("Linda", "Martinez-Ruiz", "linda.mr@legal.org", "CourtCase55"));
        citizens.add(new Citizen("Thomas", "Anderson", "neo@matrix.net", "RedPillBluePill"));
        citizens.add(new Citizen("Elizabeth", "Taylor", "liz.taylor@hollywood.com", "StarPower*"));
        citizens.add(new Citizen("Daniel", "Thomas", "dan_thomas@sports.tv", "Touchdown7"));
        citizens.add(new Citizen("Susan", "Jackson", "info@susanart.com", "PaintBrush!"));
        citizens.add(new Citizen("Paul", "White", "admin@whitesecurity.com", "RootAccess00"));
        citizens.add(new Citizen("Karen", "Harris", "karen.h@shop.net", "DiscountCode20"));
        citizens.add(new Citizen("Mark", "Martin", "mark1985@retro.org", "80sMusicRules"));
        citizens.add(new Citizen("Donald", "Thompson", "thethompsons@family.net", "FamilyFirst<3"));
        citizens.add(new Citizen("George", "King", "gking@castle.uk", "CrownJewels"));
        citizens.add(new Citizen("Sandra", "Scott", "SANDRA.SCOTT@MAIL.COM", "CapsLockOn?"));

        return citizens;
    }

    public List<Candidate> createCandidates() {
        List<Candidate> candidates = new ArrayList<>();

        candidates.add(new Candidate("Grigore", "Sima"));
        candidates.add(new Candidate("Andreea-Georgiana", "Szabo"));
        candidates.add(new Candidate("Ilie", "Bolojan"));
        candidates.add(new Candidate("George", "Simion"));
        candidates.add(new Candidate("Nicusor", "Dan"));
        candidates.add(new Candidate("Calin", "Georgescu"));
        candidates.add(new Candidate("Elena-Valerica", "Lasconi"));

        return candidates;
    }
}

