package ubb.evotingsystembackend.Domain;

import jakarta.persistence.*;

@Entity
public class Voter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Citizen citizen;

    public Voter() {
    }

    public Voter(Citizen citizen) {
        this.citizen = citizen;
    }
}
