package ubb.evotingsystembackend.Utility;

import ubb.evotingsystembackend.Domain.Citizen;
import ubb.evotingsystembackend.Domain.DTOs.CitizenDTO;

import java.util.Base64;

public class CitizenMapper {
    public static CitizenDTO toDTO(Citizen citizen) {
        return new CitizenDTO(citizen.getId(), citizen.getFirstName(), citizen.getLastName(), citizen.getEmail(), Base64.getEncoder().encodeToString(citizen.getCAPrivK().getEncoded()));
    }
}
