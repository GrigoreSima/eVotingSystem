package ubb.evotingsystembackend.Services;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.OAEPParameterSpec;
import javax.crypto.spec.PSource;
import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.MGF1ParameterSpec;
import java.util.Arrays;
import java.util.Base64;

@Service
public class EncryptionService {

    private PublicKey publicKey;
    private PrivateKey privateKey;

    public EncryptionService() {
    }

    public PublicKey getPublicKey() {
        return publicKey;
    }

    public String getPublicKeyAsString() {
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
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

    public String decrypt(String cipherText) {
        try {
            byte[] text = Base64.getDecoder().decode(cipherText);

            OAEPParameterSpec oaepParams = new OAEPParameterSpec(
                    "SHA-256",
                    "MGF1",
                    MGF1ParameterSpec.SHA256, // <--- This forces MGF1 to use SHA-256
                    PSource.PSpecified.DEFAULT
            );

            Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPPadding");
            cipher.init(Cipher.DECRYPT_MODE, privateKey, oaepParams);

            byte[] result = cipher.doFinal(text);
            return new String(result);
        } catch (Exception e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
            throw new IllegalStateException("Error decrypting vote");
        }
    }



}
