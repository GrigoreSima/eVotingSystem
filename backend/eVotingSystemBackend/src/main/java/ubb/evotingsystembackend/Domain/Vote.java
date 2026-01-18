package ubb.evotingsystembackend.Domain;

import jakarta.persistence.*;

@Entity
public class Vote {
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    public Vote() {
    }

    public Vote(Candidate candidate) {
        this.candidate = candidate;
    }
}
