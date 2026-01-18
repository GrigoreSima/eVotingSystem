// import forge from 'node-forge';
// import axios from 'axios';
//
// const API_URL = 'http://localhost:8080/citizen';
//
// export const getCandidates = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/candidates`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || "Could not fetch candidates.";
//     }
// };
// /**
//  * Prepares the vote payload as requested by the backend.
//  * Logic: Encrypt(CandidateID) -> Sign(Ciphertext)
//  */
//
// export const finalizeVote = (candidateId, publicKeyPem, signingPrivateKeyPem, voterId) => {
//     try {
//         // // 1. Load the RSA keys
//
//         // 2. Encrypt the Candidate ID using RSA-OAEP
//         const encrypted = publicKey.encrypt(candidateId.toString(), 'RSA-OAEP');
//         const encryptedBase64 = forge.util.encode64(encrypted);
//
//         // 3. Sign the encrypted ID (the ciphertext) using SHA-256
//         const md = forge.md.sha256.create();
//         md.update(encryptedBase64, 'utf8');
//         const signature = privateKey.sign(md);
//         const signatureBase64 = forge.util.encode64(signature);
//
//         // 4. Return the JSON object expects via POST
//         return {
//             mesaj: encryptedBase64,
//             semnatura: signatureBase64,
//             votant: voterId
//         };
//     } catch (err) {
//         console.error("Crypto operation failed", err);
//         throw err;
//     }
// };

import forge from 'node-forge';
import axios from 'axios';

const API_URL = 'http://localhost:8080/citizen';

/**
 * Fetches the official list of candidates from the backend.
 */
export const getCandidates = async () => {
    try {
        const response = await axios.get(`${API_URL}/candidates`);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Could not fetch candidates.";
    }
};

/**
 * Secures the vote using a two-step cryptographic process:
 * 1. Encrypts the Candidate ID with the System's Public Key (RSA-2048).
 * 2. Signs the resulting ciphertext with the Voter's Private Key (SHA-256).
 */
export const finalizeVote = (candidateId, publicKeyPem, privateKeyPem, voterId) => {
    try {
        // 1. Load RSA keys from PEM format
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

        // 2. Encrypt the Candidate ID using RSA-OAEP
        // The candidate ID is converted to string for the encryption process
        const encrypted = publicKey.encrypt(candidateId.toString(), 'RSA-OAEP', {
            md: forge.md.sha256.create(),
            mgf1: {
                md: forge.md.sha256.create()
            }
        });
        const encryptedBase64 = forge.util.encode64(encrypted);

        // 3. Create a Digital Signature (SHA-256)
        // We sign the Base64 encrypted message to ensure integrity and authenticity
        const md = forge.md.sha256.create();
        md.update(encryptedBase64, 'utf8');

        const signature = privateKey.sign(md);
        const signatureBase64 = forge.util.encode64(signature);

        // 4. Construct the final JSON payload for the POST /citizen/vote endpoint
        return {
            mesaj: encryptedBase64,    // The encrypted Candidate ID
            semnatura: signatureBase64, // The voter's digital signature
            votant: voterId             // The voter's unique identifier (email/ID)
        };
    } catch (err) {
        console.error("Critical Crypto Error:", err);
        throw new Error("Failed to secure the vote. Please verify key formats.");
    }
};