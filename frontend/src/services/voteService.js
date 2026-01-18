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
// --- Helper Functions ---

// Convert PEM string (with headers) to ArrayBuffer
function pemToArrayBuffer(pem) {
    // Remove headers/footers and newlines
    const b64Lines = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
    const str = window.atob(b64Lines);
    const buf = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i);
    }
    return buf.buffer;
}

// Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// --- Main Function ---

export const finalizeVote = async (candidateId, publicKeyPem, privateKeyPem, voterId) => {
    try {
        const enc = new TextEncoder();

        // 1. Import Public Key (for Encryption)
        // Assumes SPKI format (Standard for Java public keys)
        const publicKey = await window.crypto.subtle.importKey(
            "spki",
            pemToArrayBuffer(publicKeyPem),
            { name: "RSA-OAEP", hash: "SHA-256" },
            false,
            ["encrypt"]
        );

        // 2. Import Private Key (for Signing)
        // Assumes PKCS#8 format (Standard for Java private keys)
        const privateKey = await window.crypto.subtle.importKey(
            "pkcs8",
            pemToArrayBuffer(privateKeyPem),
            { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
            false,
            ["sign"]
        );

        // 3. Encrypt the Candidate ID (RSA-OAEP)
        const candidateData = enc.encode(candidateId.toString());
        const encryptedBuf = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            candidateData
        );
        const encryptedBase64 = arrayBufferToBase64(encryptedBuf);

        // 4. Create Digital Signature (SHA-256)
        // We sign the Encrypted Base64 String to match your original logic
        const dataToSign = enc.encode(encryptedBase64);
        const signatureBuf = await window.crypto.subtle.sign(
            "RSASSA-PKCS1-v1_5",
            privateKey,
            dataToSign
        );
        const signatureBase64 = arrayBufferToBase64(signatureBuf);

        // 5. Construct Payload
        return {
            encrytedVote: encryptedBase64,
            signedVote: signatureBase64,
            citizenID: voterId
        };

    } catch (err) {
        console.error("Critical Crypto Error:", err);
        throw new Error("Failed to secure the vote. Please verify key formats.");
    }
};