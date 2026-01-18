package ubb.evotingsystembackend.Domain.DTOs;

import java.security.PrivateKey;

public class CitizenDTO {
    private Integer id;
    private String firstName;
    private String lastName;

    private String email;
    private String CAPrivK;

    public CitizenDTO() {
    }

    public CitizenDTO(Integer id, String firstName, String lastName, String email, String CAPrivK) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.CAPrivK = CAPrivK;
    }

    public String getCAPrivK() {
        return CAPrivK;
    }

    public void setCAPrivK(String CAPrivK) {
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
