package ubb.evotingsystembackend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ubb.evotingsystembackend.Domain.Voter;

import java.util.Optional;

public interface VotersRepository extends JpaRepository<Voter, Long> {
    public Optional<Voter> findByCitizenId(Integer id);
}
