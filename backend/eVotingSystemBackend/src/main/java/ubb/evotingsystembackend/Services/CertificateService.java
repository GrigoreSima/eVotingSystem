package ubb.evotingsystembackend.Services;

import org.springframework.stereotype.Service;

import java.security.*;
import java.util.Arrays;
import java.util.Base64;

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

    public boolean verify(String vote, String signedVote, PublicKey publicKey) {
        try {
            Signature signature = Signature.getInstance(instance);

            signature.initVerify(publicKey);

            byte[] encryptedVote = Base64.getDecoder().decode(vote);
            signature.update(encryptedVote);

            byte[] signatureVote = Base64.getDecoder().decode(signedVote);
            return signature.verify(signatureVote);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalStateException(e);
        }
    }
}
