// import React from "react";
// import {useLocation, useNavigate} from "react-router-dom";
// import "./design/Candidates.css";
//
// export default function Candidates() {
//
//         const { state } = useLocation();
//         // Folosim lista primită de la login sau o listă goală dacă lipsește
//         const candidates = state?.candidates || [];
//
//         return (
//             <div className="candidates-grid">
//                 {candidates.map((c) => (
//                     <div key={c.id} className="candidate-card">
//
//                         <h3>{c.name}</h3>
//                         <p>{c.description || "Official Candidate"}</p>
//                         <button onClick={() => navigate("/verify", { state: { candidate: c } })}>
//                             Select Candidate
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         );
//     }
//     // Simulated data from an API call
//     const candidateList = [
//         { id: 1, name: "Alexander Pierce", role: "Department Head", img: "https://i.pravatar.cc/150?u=1" },
//         { id: 2, name: "Sarah Jenkins", role: "Tech Lead", img: "https://i.pravatar.cc/150?u=2" },
//         { id: 3, name: "Michael Vance", role: "Senior Researcher", img: "https://i.pravatar.cc/150?u=3" },
//         { id: 4, name: "Elena Rodriguez", role: "Product Manager", img: "https://i.pravatar.cc/150?u=4" },
//         { id: 5, name: "David Kim", role: "Lead Engineer", img: "https://i.pravatar.cc/150?u=5" },
//         { id: 6, name: "Olivia Thorne", role: "Security Expert", img: "https://i.pravatar.cc/150?u=6" },
//     ];
//
//
//
//     const handleVote = (candidate) => {
//         // Navigate to verification page with selected candidate
//         navigate("/verify", { state: { candidate } });
//     };
//
//     return (
//         <div className="candidates-bg">
//             <div className="candidates-container">
//                 <header className="candidates-header">
//                     <div className="status-badge">System Active: RSA-2048 Secure</div>
//                     <h1>Cast Your Secure Vote</h1>
//                     <p>Select a representative to continue to the encryption stage.</p>
//                 </header>
//
//                 <div className="candidates-grid">
//                     {candidateList.map((c) => (
//                         <div key={c.id} className="candidate-card">
//                             <div className="card-avatar">
//                                 <img src={c.img} alt={c.name} />
//                             </div>
//                             <div className="card-info">
//                                 <h3>{c.name}</h3>
//                                 <p>{c.role}</p>
//                             </div>
//                             <button className="vote-btn" onClick={() => handleVote(c)}>
//                                 Select Candidate
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//
//                 <footer className="candidates-footer">
//                     <button className="back-link" onClick={() => navigate("/")}>← Return to Login</button>
//                     <div className="session-info">Voter ID: V-2024-9182</div>
//                 </footer>
//             </div>
//
//             {/* Background Glows (same as login) */}
//             <div className="abstract-shape shape-1"></div>
//             <div className="abstract-shape shape-2"></div>
//         </div>
//     );
// }
//
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./design/Candidates.css";
//
// export default function Candidates() {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const { voter } = useAuth(); // Luăm datele cetățeanului logat (CitizenDTO)
//
//     // Lista de candidați primită de la Login via API (GET /citizen/candidates)
//     const candidates = state?.candidates || [];
//
//     const handleVote = (candidate) => {
//         // Navigăm spre verificare cu obiectul candidatului adaptat
//         navigate("/verify", {
//             state: {
//                 candidate: {
//                     ...candidate,
//                     name: `${candidate.firstName} ${candidate.lastName}`
//                 }
//             }
//         });
//     };
//
//     return (
//         <div className="candidates-bg">
//             <div className="candidates-container">
//                 <header className="candidates-header">
//                     <div className="status-badge">System Active: RSA-2048 Secure</div>
//                     <h1>Cast Your Secure Vote</h1>
//                     <p>Select a representative to continue to the encryption stage.</p>
//                 </header>
//
//                 <div className="candidates-grid">
//                     {candidates.map((c) => (
//                         <div key={c.id} className="candidate-card">
//                             <div className="card-avatar">
//                                 <img src={`https://i.pravatar.cc/150?u=${c.id}`} alt={c.firstName} />
//                             </div>
//                             <div className="card-info">
//                                 <h3>{c.firstName} {c.lastName}</h3>
//                                 <p>Candidate ID: #{c.id}</p>
//                             </div>
//                             <button className="vote-btn" onClick={() => handleVote(c)}>
//                                 Select Candidate
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//
//                 <footer className="candidates-footer">
//                     <button className="back-link" onClick={() => navigate("/")}>
//                         ← Return to Login
//                     </button>
//
//                     <div className="voter-identity-display">
//                         <span className="voter-name-label">Voter: <strong>{voter?.name || "User"}</strong></span>
//                         <div className="session-info">Voter ID: {voter?.id || "N/A"}</div>
//                     </div>
//                 </footer>
//             </div>
//
//             {/* Background Glows */}
//             <div className="abstract-shape shape-1"></div>
//             <div className="abstract-shape shape-2"></div>
//         </div>
//     );
// }

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./design/Candidates.css";

export default function Candidates() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { voter } = useAuth();

    const candidates = state?.candidates || [];

    const getProfileImage = (firstName, id) => {

        const isFemale = firstName.toLowerCase().endsWith('a') ||
            firstName.toLowerCase() === 'carmen' ||
            firstName.toLowerCase() === 'beatrice';

        const gender = isFemale ? "female" : "male";


        return `https://xsgames.co/randomusers/assets/avatars/${gender}/${(id % 50)}.jpg`;
    };

    const handleVote = (candidate) => {
        const fullName = `${candidate.firstName} ${candidate.lastName}`;
        navigate("/verify", {
            state: {
                candidate: {
                    ...candidate,
                    name: fullName,
                    img: getProfileImage(candidate.firstName, candidate.id)
                }
            }
        });
    };

    return (
        <div className="candidates-bg">
            <div className="candidates-container">
                <header className="candidates-header">
                    <div className="status-badge">System Active: RSA-2048 Secure</div>
                    <h1>Cast Your Secure Vote</h1>
                    <p>Select a representative to continue to the encryption stage.</p>
                </header>

                <div className="candidates-grid">
                    {candidates.map((c) => (
                        <div key={c.id} className="candidate-card">
                            <div className="card-avatar">
                                <img
                                    src={getProfileImage(c.firstName, c.id)}
                                    alt={`${c.firstName} ${c.lastName}`}
                                />
                            </div>
                            <div className="card-info">
                                <h3>{c.firstName} {c.lastName}</h3>
                                <p className="candidate-role">Official Candidate</p>
                                <p className="candidate-id">ID: #{c.id}</p>
                            </div>
                            <button className="vote-btn" onClick={() => handleVote(c)}>
                                Select Candidate
                            </button>
                        </div>
                    ))}
                </div>

                <footer className="candidates-footer">
                    <button className="back-link" onClick={() => navigate("/")}>
                        ← Return to Login
                    </button>

                    <div className="voter-identity-display">
                        <span className="voter-name-label">Voter: <strong>{voter?.name || "User"}</strong></span>
                        <div className="session-info">Voter ID: {voter?.id || "N/A"}</div>
                    </div>
                </footer>
            </div>

            <div className="abstract-shape shape-1"></div>
            <div className="abstract-shape shape-2"></div>
        </div>
    );
}