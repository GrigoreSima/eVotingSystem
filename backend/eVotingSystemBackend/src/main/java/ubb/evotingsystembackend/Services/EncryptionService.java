package ubb.evotingsystembackend.Services;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Arrays;

@Service
public class EncryptionService {

    private PublicKey publicKey;
    private PrivateKey privateKey;

    public EncryptionService() {
    }

    public PublicKey getPublicKey() {
        return publicKey;
    }

    public void generateKeys() {
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            KeyPair keyPair = keyPairGenerator.generateKeyPair();

            publicKey = keyPair.getPublic();
            privateKey = keyPair.getPrivate();

            System.out.println("Public key: " + Arrays.toString(keyPair.getPublic().getEncoded()));
            System.out.println("Private key: " + Arrays.toString(keyPair.getPrivate().getEncoded()));
        } catch (Exception e) {
            System.out.println("Error generating keys");
        }
    }

    public byte[] encrypt(String plainText) {
        try {
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);
            return cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            System.out.println("Error encrypting vote");
            throw new IllegalStateException("Error encrypting vote");
        }
    }

    public String decrypt(byte[] cipherText) {
        try {
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            byte[] result = cipher.doFinal(cipherText);
            return new String(result);
        } catch (Exception e) {
            System.out.println("Error decrypting vote");
            throw new IllegalStateException("Error decrypting vote");
        }
    }

}
