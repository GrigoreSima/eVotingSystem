package ubb.evotingsystembackend.Domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.security.PrivateKey;
import java.security.PublicKey;

@Entity
public class Citizen {
    @Id
    @GeneratedValue
    private Integer id;

    private String firstName;
    private String lastName;

    // login information
    private String email;
    private String password;

    // certificate information
    @Column(length = 2050)
    private PublicKey CAPubK;
    @Column(length = 2050)
    private PrivateKey CAPrivK;

    public Citizen(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public Citizen(String firstName, String lastName, String email, String password, PublicKey CAPubK, PrivateKey CAPrivK) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.CAPubK = CAPubK;
        this.CAPrivK = CAPrivK;
    }

    public Citizen() {
    }

    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public PublicKey getCAPubK() {
        return CAPubK;
    }

    public void setCAPubK(PublicKey CAPubK) {
        this.CAPubK = CAPubK;
    }

    public PrivateKey getCAPrivK() {
        return CAPrivK;
    }

    public void setCAPrivK(PrivateKey CAPrivK) {
        this.CAPrivK = CAPrivK;
    }
}
