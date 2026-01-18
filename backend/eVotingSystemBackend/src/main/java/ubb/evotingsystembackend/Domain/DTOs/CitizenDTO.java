package ubb.evotingsystembackend.Domain.DTOs;

import java.security.PrivateKey;

public class CitizenDTO {
    private Integer id;
    private String firstName;
    private String lastName;

    private String email;
    private PrivateKey CAPrivK;

    public CitizenDTO() {
    }

    public CitizenDTO(Integer id, String firstName, String lastName, String email, PrivateKey CAPrivK) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.CAPrivK = CAPrivK;
    }

    public PrivateKey getCAPrivK() {
        return CAPrivK;
    }

    public void setCAPrivK(PrivateKey CAPrivK) {
        this.CAPrivK = CAPrivK;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
}
