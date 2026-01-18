package ubb.evotingsystembackend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ubb.evotingsystembackend.Domain.Candidate;

@Repository
public interface CandidatesRepository extends JpaRepository<Candidate, Integer> {
}
