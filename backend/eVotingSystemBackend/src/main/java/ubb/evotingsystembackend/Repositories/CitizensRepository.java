package ubb.evotingsystembackend.Repositories;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ubb.evotingsystembackend.Domain.Citizen;

import java.util.Optional;

@Repository
public interface CitizensRepository extends JpaRepository<Citizen, Integer> {

    public Optional<Citizen> findByEmail(String email);
}
