package ubb.evotingsystembackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ubb.evotingsystembackend.Services.CitizenService;

@SpringBootApplication
public class EVotingSystemBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EVotingSystemBackendApplication.class, args);
    }

}
