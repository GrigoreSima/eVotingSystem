package ubb.evotingsystembackend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ubb.evotingsystembackend.Domain.Vote;

@Repository
public interface VotesRepository extends JpaRepository<Vote,  Integer> {
}
