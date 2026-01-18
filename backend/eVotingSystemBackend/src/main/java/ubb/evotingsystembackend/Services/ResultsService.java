package ubb.evotingsystembackend.Services;

import org.springframework.stereotype.Service;
import ubb.evotingsystembackend.Repositories.CandidatesRepository;
import ubb.evotingsystembackend.Repositories.EncryptedVotesRepository;
import ubb.evotingsystembackend.Repositories.VotesRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResultsService {

    private final EncryptedVotesRepository encryptedVotesRepository;
    private final VotesRepository votesRepository;
    private final EncryptionService encryptionService;
    private final CandidatesRepository candidatesRepository;

    private final Map<Integer, Integer> results;

    public ResultsService(EncryptedVotesRepository encryptedVotesRepository, VotesRepository votesRepository, EncryptionService encryptionService, CandidatesRepository candidatesRepository) {
        this.encryptedVotesRepository = encryptedVotesRepository;
        this.votesRepository = votesRepository;
        this.encryptionService = encryptionService;
        this.candidatesRepository = candidatesRepository;

        this.results = new HashMap<>();

    }

    public void decryptVotes() {
        encryptedVotesRepository.findAll().forEach(encryptedVote -> {
            String vote = encryptionService.decrypt(encryptedVote.getEncryptedVote());
            System.out.println(vote);

            results.compute(Integer.parseInt(vote), (k, v) -> v + 1);
        });
    }

    public Map<Integer, Integer> getResults() {
        results.clear();
        candidatesRepository.findAll().forEach((candidate) -> results.put(candidate.getId(), 0));
        System.out.println(results);
        decryptVotes();
        return results;
    }
}
