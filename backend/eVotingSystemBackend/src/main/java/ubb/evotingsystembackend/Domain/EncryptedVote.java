package ubb.evotingsystembackend.Domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EncryptedVote {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Integer id;

    private byte[] encryptedVote;

    public EncryptedVote() {
    }

    public EncryptedVote(byte[] encryptedVote) {
        this.encryptedVote = encryptedVote;
    }

    public byte[] getEncryptedVote() {
        return encryptedVote;
    }
}
