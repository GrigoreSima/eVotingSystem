package ubb.evotingsystembackend.Utility;

import ubb.evotingsystembackend.Domain.Citizen;
import ubb.evotingsystembackend.Domain.DTOs.CitizenDTO;

public class CitizenMapper {
    public static CitizenDTO toDTO(Citizen citizen) {
        return new CitizenDTO(citizen.getId(), citizen.getFirstName(), citizen.getLastName(), citizen.getEmail(), citizen.getCAPrivK());
    }
}
