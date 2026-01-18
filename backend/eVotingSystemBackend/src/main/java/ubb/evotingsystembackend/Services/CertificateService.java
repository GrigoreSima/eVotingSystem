package ubb.evotingsystembackend.Services;

import org.springframework.stereotype.Service;

import java.security.*;
import java.util.Arrays;

@Service
public class CertificateService {

    String instance = "SHA256withRSA";

    public KeyPair generateCAKeys() {
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            return keyPairGenerator.generateKeyPair();
        } catch (Exception e) {
            throw new IllegalStateException("Error generating CA keys");
        }
    }

    public byte[] sign(byte[] vote, PrivateKey privateKey) {
        try {
            Signature signature = Signature.getInstance(instance);

            signature.initSign(privateKey);
            signature.update(vote);

            return signature.sign();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalStateException(e);
        }
    }

    public boolean verify(byte[] vote, byte[] signedVote, PublicKey publicKey) {
        try {
            Signature signature = Signature.getInstance(instance);

            signature.initVerify(publicKey);
            signature.update(vote);


            return signature.verify(signedVote);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalStateException(e);
        }
    }
}
