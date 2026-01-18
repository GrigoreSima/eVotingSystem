package ubb.evotingsystembackend.Services;

import org.springframework.stereotype.Service;
import ubb.evotingsystembackend.Repositories.CitizensRepository;
import ubb.evotingsystembackend.Repositories.VotersRepository;

@Service
public class PresentationService {

    private final VotersRepository votersRepository;
    private final CitizensRepository citizensRepository;

    public PresentationService(VotersRepository votersRepository, CitizensRepository citizensRepository) {
        this.citizensRepository = citizensRepository;
        this.votersRepository = votersRepository;
    }

    public Integer getNumberOfVoters() {
        return votersRepository.findAll().size();
    }

    public Integer getNumberOfCitizens() {
        return citizensRepository.findAll().size();
    }
}
