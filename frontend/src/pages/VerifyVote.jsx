// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { finalizeVote } from "../services/voteService";
// import axios from "axios";
// import "./design/VerifyVote.css";
//
// export default function VerifyVote() {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const { voter, systemPublicKey } = useAuth();
//     const [step, setStep] = useState(0);
//
//     const candidate = state?.candidate || { name: "Unknown", id: 0, img: "https://i.pravatar.cc/150", role: "Candidate" };
//
//     const handleConfirmAndSign = async () => {
//         setStep(1); // Start Encrypting phase
//
//         setTimeout(() => {
//             setStep(2); // Start Signing phase
//
//             setTimeout(async () => {
//                 setStep(3); // Start Sending phase
//
//                 try {
//                     const securePayload = finalizeVote(
//                         candidate.id,
//                         systemPublicKey,
//                         voter.signingKey,
//                         voter.id
//                     );
//
//                     await axios.post("http://localhost:8080/api/cast-vote", securePayload);
//                     setTimeout(() => navigate("/dashboard"), 1500);
//                 } catch (err) {
//                     alert("Security Bridge Failed: Backend not responding");
//                     setStep(0);
//                 }
//             }, 1500);
//         }, 1500);
//     };
//
//     return (
//         <div className="verify-bg">
//             <div className="verify-container">
//                 {/* LEFT SIDE: The elegant Card from before + Avatar */}
//                 <div className="verify-side-form">
//
//                     <div className="verify-card-elegant">
//
//                         {/*<div className="security-badge">*/}
//                         {/*    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
//                         {/*        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />*/}
//                         {/*    </svg>*/}
//                         {/*    SECURE SESSION*/}
//                         {/*</div>*/}
//                         <div className="security-icon">
//                             <div className="shield-ring"></div>
//                             <svg width="48" height="48" fill="none" stroke="#10b981" strokeWidth="2"
//                                  viewBox="0 0 24 24">
//                                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//                                 <path d="M9 12l2 2 4-4"/>
//                             </svg>
//
//                         </div>
//                         <div className="candidate-identity">
//
//                             <h2>Confirm Selection</h2>
//                             <p className="role-text">You are casting a vote for:</p>
//                         </div>
//
//                         <div className="selection-details">
//                             <div className="avatar-wrapper">
//                                 <img src={candidate.img} alt=""/>
//                                 <div className="status-dot"></div>
//                             </div>
//                             <span className="c-name">{candidate.name}</span>
//                             <span className="c-id">Internal ID: #{candidate.id}</span>
//                         </div>
//                         <div className="action-footer">
//                             <button
//                                 className="sign-btn-complex"
//                                 onClick={handleConfirmAndSign}
//                                 disabled={step > 0}
//                             >
//                                 {step === 0 ? "SIGN & CAST VOTE" : "EXECUTING..."}
//                             </button>
//                             <button className="other-btn" onClick={() => navigate("/candidates")}>
//                                 Select another candidate
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* RIGHT SIDE: The 3 Security Circles (Complex Animation) */}
//                 <div className="verify-side-visual">
//                     <div className="visual-content">
//                         <div className="security-steps">
//                             <div className={`step-node ${step >= 1 ? "active" : ""} ${step === 1 ? "pulse" : ""}`}>
//                                 <div className="node-icon">🔒</div>
//                                 <span>ENCRYPT</span>
//                             </div>
//                             <div className="node-connector"></div>
//                             <div className={`step-node ${step >= 2 ? "active" : ""} ${step === 2 ? "pulse" : ""}`}>
//                                 <div className="node-icon">✍️</div>
//                                 <span>SIGN</span>
//                             </div>
//                             <div className="node-connector"></div>
//                             <div className={`step-node ${step >= 3 ? "active" : ""} ${step === 3 ? "pulse" : ""}`}>
//                                 <div className="node-icon">🚀</div>
//                                 <span>SEND</span>
//                             </div>
//                         </div>
//
//                         <div className="terminal-log">
//                             <p className={step >= 1 ? "log-active" : ""}>&gt; RSA-2048 Protocol...</p>
//                             <p className={step >= 2 ? "log-active" : ""}>&gt; Generating SHA-256 Signature...</p>
//                             <p className={step >= 3 ? "log-active" : ""}>&gt; Handshaking with server...</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Background Glows */}
//             <div className="abstract-shape shape-1"></div>
//             <div className="abstract-shape shape-2"></div>
//         </div>
//     );
// }

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { finalizeVote } from "../services/voteService";
import axios from "axios";
import "./design/VerifyVote.css";

export default function VerifyVote() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { voter, systemPublicKey } = useAuth();
    const [step, setStep] = useState(0);

    const candidate = state?.candidate || { name: "Unknown", id: 0, img: "https://i.pravatar.cc/150", role: "Candidate" };

    const handleConfirmAndSign = async () => {
        // Start phase 1: RSA Encryption
        setStep(1);

        setTimeout(() => {
            // Start phase 2: Digital Signature
            setStep(2);

            setTimeout(async () => {
                // Start phase 3: Secure Transmission
                setStep(3);

                try {
                    // Execute the cryptographic protocol
                    const securePayload = finalizeVote(
                        candidate.id,
                        systemPublicKey, // System's RSA-2048 Public Key
                        voter.signingKey, // Voter's Private Key
                        voter.id          // Voter's ID
                    );

                    // Send the secured payload to the backend
                    await axios.post("http://localhost:8080/citizen/vote", securePayload);

                    // On success, redirect to the live dashboard
                    setTimeout(() => navigate("/dashboard"), 1500);
                } catch (err) {
                    console.error("Transmission error:", err);
                    alert("Security Bridge Failed: The backend did not accept the signed vote.");
                    setStep(0); // Reset UI on error
                }
            }, 1500);
        }, 1500);
    };

    return (
        <div className="verify-bg">
            <div className="verify-container">
                {/* Information Panel */}
                <div className="verify-side-form">
                    <div className="verify-card-elegant">
                        <div className="security-icon">
                            <div className="shield-ring"></div>
                            <svg width="48" height="48" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>

                        <div className="candidate-identity">
                            <h2>Confirm Selection</h2>
                            <p className="role-text">You are casting a vote for:</p>
                        </div>

                        <div className="selection-details">
                            <div className="avatar-wrapper">
                                <img src={candidate.img} alt=""/>
                                <div className="status-dot"></div>
                            </div>
                            <span className="c-name">{candidate.name}</span>
                            <span className="c-id">Internal ID: #{candidate.id}</span>
                        </div>

                        <div className="action-footer">
                            <button
                                className="sign-btn-complex"
                                onClick={handleConfirmAndSign}
                                disabled={step > 0}
                            >
                                {step === 0 ? "SIGN & CAST VOTE" : "EXECUTING SECURITY PROTOCOL..."}
                            </button>
                            <button className="other-btn" onClick={() => navigate("/candidates")}>
                                Select another candidate
                            </button>
                        </div>
                    </div>
                </div>

                {/* Technical Visualization Panel */}
                <div className="verify-side-visual">
                    <div className="visual-content">
                        <div className="security-steps">
                            <div className={`step-node ${step >= 1 ? "active" : ""} ${step === 1 ? "pulse" : ""}`}>
                                <div className="node-icon">🔒</div>
                                <span>ENCRYPT</span>
                            </div>
                            <div className="node-connector"></div>
                            <div className={`step-node ${step >= 2 ? "active" : ""} ${step === 2 ? "pulse" : ""}`}>
                                <div className="node-icon">✍️</div>
                                <span>SIGN</span>
                            </div>
                            <div className="node-connector"></div>
                            <div className={`step-node ${step >= 3 ? "active" : ""} ${step === 3 ? "pulse" : ""}`}>
                                <div className="node-icon">🚀</div>
                                <span>SEND</span>
                            </div>
                        </div>

                        <div className="terminal-log">
                            <p className={step >= 1 ? "log-active" : ""}>&gt; Applying RSA-2048 encryption...</p>
                            <p className={step >= 2 ? "log-active" : ""}>&gt; Generating SHA-256 digital signature...</p>
                            <p className={step >= 3 ? "log-active" : ""}>&gt; Transmitting encrypted payload to secure server...</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="abstract-shape shape-1"></div>
            <div className="abstract-shape shape-2"></div>
        </div>
    );
}