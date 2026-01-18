// //
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import "./design/Login.css";
// //
// // export default function Login() {
// //     const [name, setName] = useState("");
// //     const { setVoter, setSystemPublicKey } = useAuth();
// //     const navigate = useNavigate();
// //
// //     const handleLogin = () => {
// //         setVoter({ id: "V-2024", name, signingKey: "PRIVATE_KEY_HERE" });
// //         setSystemPublicKey("PUBLIC_KEY_HERE");
// //         navigate("/candidates");
// //     };
// //
// //     return (
// //         <div className="login-bg">
// //             <div className="login-container">
// //                 {/* Left Side: The Form */}
// //                 <div className="login-side-form">
// //                     <div className="login-card">
// //                         <div className="login-header">
// //                             <div className="logo-box">
// //                                 <svg width="36" height="36" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
// //                                     <path d="M9 12l2 2 4-4" />
// //                                     <path d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
// //                                 </svg>
// //                             </div>
// //                             <h1>Secure Voting</h1>
// //                             <p>University Encryption Portal</p>
// //                         </div>
// //
// //                         <div className="login-form">
// //                             <label>VOTER IDENTITY</label>
// //                             <input
// //                                 type="text"
// //                                 placeholder="Enter your full name"
// //                                 onChange={(e) => setName(e.target.value)}
// //                             />
// //
// //                             <button className="login-button" onClick={handleLogin}>
// //                                 Access Voting Booth →
// //                             </button>
// //                         </div>
// //
// //                         <div className="login-footer">
// //                             Protected by asymmetric encryption & digital signatures
// //                         </div>
// //                     </div>
// //                 </div>
// //
// //                 {/* Right Side: The Animation */}
// //                 <div className="login-side-visual">
// //                     <div className="visual-content">
// //                         <h2>The future of voting is <br/><span className="highlight">encrypted.</span></h2>
// //                         <p>Using industry-standard RSA-4096 keys and digital signatures to ensure your vote remains
// //                             private and untamperable.</p>
// //                     </div>
// //
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
//
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./design/Login.css";
//
// export default function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const { setVoter, setSystemPublicKey } = useAuth();
//     const navigate = useNavigate();
//
//     const handleLogin = () => {
//         // Aici vei face axios.post către backend-ul nou
//         // Trimitem username și password
//         setVoter({ id: "V-2024", name: username, signingKey: "PRIVATE_KEY_HERE" });
//         setSystemPublicKey("PUBLIC_KEY_HERE");
//         navigate("/candidates");
//     };
//
//     return (
//         <div className="login-bg">
//             <div className="login-container">
//                 {/* Left Side: The Form */}
//                 <div className="login-side-form">
//                     <div className="login-card">
//                         <div className="login-header">
//                             <div className="logo-box">
//                                 <svg width="36" height="36" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
//                                     <path d="M9 12l2 2 4-4" />
//                                     <path d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
//                                 </svg>
//                             </div>
//                             <h1>Secure Voting</h1>
//                             <p>University Encryption Portal</p>
//                         </div>
//
//                         <div className="login-form">
//                             <label>USERNAME</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter your username"
//                                 className="mb-4"
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//
//                             <label>PASSWORD</label>
//                             <input
//                                 type="password"
//                                 placeholder="••••••••"
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//
//                             <button className="login-button" onClick={handleLogin}>
//                                 Access Voting Booth →
//                             </button>
//                         </div>
//
//                         <div className="login-footer">
//                             Protected by asymmetric encryption & digital signatures
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Right Side: The Animation + Dashboard Access */}
//                 <div className="login-side-visual">
//                     <div className="visual-content">
//                         <h2>The future of voting is <br/><span className="highlight">encrypted.</span></h2>
//                         <p>Using industry-standard RSA-2048 keys and digital signatures to ensure your vote remains
//                             private and untamperable.</p>
//
//                         {/* Butonul nou pentru Overview */}
//                         <button className="overview-btn" onClick={() => navigate("/dashboard")}>
//                             <span className="pulse-icon"></span>
//                             View Live Statistics
//                         </button>
//                     </div>
//
//                     {/* Background Animation Shapes */}
//                     <div className="abstract-shape shape-1"></div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginCitizen, getSystemPublicKey } from "../services/authService";
import "./design/Login.css";
import {getCandidates} from "../services/voteService.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setVoter, setSystemPublicKey } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 1. Autentificare: Obținem CitizenDTO (id, name, email, etc.)
            const citizenDto = await loginCitizen(email, password);

            // 2. Solicităm cheia publică a serverului (RSA 2048)
            const publicKey = await getSystemPublicKey();

            // 3. Solicităm lista oficială de candidați
            const candidatesList = await getCandidates();

            // 4. Salvăm totul în Contextul de Autentificare
            console.log(citizenDto);
            setVoter(citizenDto);
            setSystemPublicKey(publicKey);
            // Presupunem că ai o funcție setCandidates în Context
            // setCandidates(candidatesList);

            // 5. Navigăm către pagina de selecție, trimițând lista prin state
            navigate("/candidates", { state: { candidates: candidatesList } });

        } catch (err) {
            setError("Connection failed. Check if backend is running on 8080.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-bg">
            <div className="login-container">
                <div className="login-side-form">
                    <div className="login-card">
                        <div className="login-header">
                            <div className="logo-box">
                                <svg width="36" height="36" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4" />
                                    <path d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
                                </svg>
                            </div>
                            <h1>Secure Voting</h1>
                            <p>University Encryption Portal</p>
                        </div>

                        <form className="login-form" onSubmit={handleLogin}>
                            {error && <div className="error-msg">{error}</div>}

                            <label>EMAIL ADDRESS</label>
                            <input
                                type="email"
                                placeholder="name@university.com"
                                value={email}
                                className="mb-4"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label>PASSWORD</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button className="login-button" type="submit" disabled={loading}>
                                {loading ? "Authenticating..." : "Access Voting Booth →"}
                            </button>
                        </form>

                        <div className="login-footer">
                            Protected by asymmetric encryption & digital signatures
                        </div>
                    </div>
                </div>

                <div className="login-side-visual">
                    <div className="visual-content">
                        <h2>The future of voting is <br/><span className="highlight">encrypted.</span></h2>
                        <p>Using industry-standard RSA-2048 keys and digital signatures to ensure your vote remains private and untamperable.</p>

                        <button className="overview-btn" onClick={() => navigate("/dashboard")}>
                            <span className="pulse-icon"></span>
                            View Live Statistics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}