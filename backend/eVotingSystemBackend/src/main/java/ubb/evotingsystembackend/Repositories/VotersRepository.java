package ubb.evotingsystembackend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ubb.evotingsystembackend.Domain.Voter;

public interface VotersRepository extends JpaRepository<Voter, Long> {
}
