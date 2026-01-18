package ubb.evotingsystembackend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ubb.evotingsystembackend.Domain.EncryptedVote;

@Repository
public interface EncryptedVotesRepository extends JpaRepository<EncryptedVote, Integer> {
}
