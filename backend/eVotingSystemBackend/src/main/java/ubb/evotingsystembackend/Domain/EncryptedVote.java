package ubb.evotingsystembackend.Domain;

import jakarta.persistence.*;

@Entity
public class EncryptedVote {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Integer id;

    @Column(length = 2048)
    private String encryptedVote;

    public EncryptedVote() {
    }

    public EncryptedVote(String encryptedVote) {
        this.encryptedVote = encryptedVote;
    }

    public String getEncryptedVote() {
        return encryptedVote;
    }
}
