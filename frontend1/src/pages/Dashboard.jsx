// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./design/Dashboard.css";
// //
// // export default function Dashboard() {
// //     const navigate = useNavigate();
// //
// //     // 1. State pentru elementele care se schimbă la 5 secunde
// //     const [receiptId, setReceiptId] = useState("TX-" + Math.random().toString(36).substr(2, 9).toUpperCase());
// //     const [totalVoters, setTotalVoters] = useState(1248);
// //     const [isNewVote, setIsNewVote] = useState(false); // Pentru declanșarea animației
// //
// //     // 2. State pentru statistici (le facem dinamice)
// //     const [stats, setStats] = useState([
// //         { name: "Alexander Pierce", percentage: 45 },
// //         { name: "Sarah Jenkins", percentage: 30 },
// //         { name: "Michael Vance", percentage: 15 },
// //         { name: "Others", percentage: 10 }
// //     ]);
// //
// //     const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 59 });
// //
// //     // 3. Simulare Vot Nou (La fiecare 5 secunde)
// //     useEffect(() => {
// //         const voteInterval = setInterval(() => {
// //             // Trigger animație
// //             setIsNewVote(true);
// //
// //             // Schimbăm datele
// //             setReceiptId("TX-" + Math.random().toString(36).substr(2, 9).toUpperCase());
// //             setTotalVoters(prev => prev + 1);
// //
// //             // Modificăm ușor procentele (aleatoriu)
// //             setStats(currentStats => {
// //                 return currentStats.map(s => {
// //                     const change = (Math.random() * 2 - 1).toFixed(1); // mică variație între -1 și 1
// //                     let newVal = parseFloat(s.percentage) + parseFloat(change);
// //                     return { ...s, percentage: Math.max(5, Math.min(60, newVal)).toFixed(1) };
// //                 });
// //             });
// //
// //             // Oprim animația după 1 secundă ca să poată fi repornită data viitoare
// //             setTimeout(() => setIsNewVote(false), 1000);
// //
// //         }, 5000);
// //
// //         return () => clearInterval(voteInterval);
// //     }, []);
// //
// //     // 4. Cronometru (la 1 secundă)
// //     useEffect(() => {
// //         const timer = setInterval(() => {
// //             setTimeLeft(prev => {
// //                 if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
// //                 if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
// //                 if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
// //                 return prev;
// //             });
// //         }, 1000);
// //         return () => clearInterval(timer);
// //     }, []);
// //
// //     return (
// //         <div className="dash-bg">
// //             <div className="dash-container">
// //                 <div className="dash-side-info">
// //                     {/* Am adăugat clasa dinamică 'new-vote-anim' pe card */}
// //                     <div className={`success-card ${isNewVote ? "new-vote-anim" : ""}`}>
// //                         <div className="status-badge-live">VOTE RECORDED</div>
// //
// //                         {/*<div className="success-icon-wrapper">*/}
// //                         {/*    /!* Inelul pulsează doar când apare un vot nou *!/*/}
// //                         {/*    <div className={`check-ring ${isNewVote ? "active-pulse" : ""}`}></div>*/}
// //                         {/*    <svg width="40" height="40" fill="none" stroke="#10b981" strokeWidth="3" viewBox="0 0 24 24">*/}
// //                         {/*        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />*/}
// //                         {/*    </svg>*/}
// //                         {/*</div>*/}
// //
// //                         <div className="receipt-box">
// //                             <label>DIGITAL RECEIPT (HASH)</label>
// //                             <div className="receipt-value">{receiptId}</div>
// //                         </div>
// //
// //                         <div className="stats-grid">
// //                             <div className="stat-item">
// //                                 <span className="stat-label">TOTAL VOTERS</span>
// //                                 <span className="stat-value">{totalVoters.toLocaleString()}</span>
// //                             </div>
// //                             <div className="stat-item">
// //                                 <span className="stat-label">TIME REMAINING</span>
// //                                 <span className="stat-value">
// //                                     {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
// //                                 </span>
// //                             </div>
// //                         </div>
// //
// //                         <div className="chart-container">
// //                             <h3>Real-time Standings</h3>
// //                             {stats.map((item, index) => (
// //                                 <div key={index} className="chart-row">
// //                                     <div className="chart-label">
// //                                         <span>{item.name}</span>
// //                                         <span>{item.percentage}%</span>
// //                                     </div>
// //                                     <div className="bar-bg">
// //                                         {/* Bara se va anima automat datorită tranziției CSS pe width */}
// //                                         <div className="bar-fill" style={{ width: `${item.percentage}%` }}></div>
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //
// //                         <button className="finish-btn" onClick={() => navigate("/")}>
// //                             BACK TO LOGIN
// //                         </button>
// //                     </div>
// //                 </div>
// //
// //                 <div className="dash-side-visual">
// //                     <div className="visual-content">
// //                         {/* Cercul din dreapta pulsează și el la vot nou */}
// //                         <div className={`pulse-circle ${isNewVote ? "ping" : ""}`}>
// //                             <div className="inner-glow"></div>
// //                             <h2>100%</h2>
// //                             <span>SECURE</span>
// //                         </div>
// //                         <div className="terminal-feed-mini">
// //                             {/*<p className="log-green">> Hash validation: Success</p>*/}
// //                             {/*<p className="log-green">> Signature verified: TRUE</p>*/}
// //                             {/*<p className="log-blue">> Encryption: RSA-2048 Active</p>*/}
// //                             {/*<p className="log-white">> Incoming packet... {isNewVote ? "RECEIVED" : "WAITING"}</p>*/}
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //
// //             <div className="abstract-shape shape-1"></div>
// //             <div className="abstract-shape shape-2"></div>
// //         </div>
// //     );
// // }
//
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./design/Dashboard.css";
//
// export default function Dashboard() {
//     const navigate = useNavigate();
//
//     // 1. Monitoring States
//     const [totalCitizens] = useState(5000);
//     const [voterCount, setVoterCount] = useState(1248);
//     const [isVotingEnded, setIsVotingEnded] = useState(false);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [showVoteAlert, setShowVoteAlert] = useState(false);
//     const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 38, seconds: 46 });
//
//     // 2. Candidate Stats
//     const stats = [
//         { name: "Alexander Pierce", percentage: 45 },
//         { name: "Sarah Jenkins", percentage: 30 },
//         { name: "Michael Vance", percentage: 15 },
//         { name: "Others", percentage: 10 }
//     ];
//
//     const attendance = ((voterCount / totalCitizens) * 100).toFixed(1);
//
//     // 3. New Vote Simulation (Every 6 seconds)
//     useEffect(() => {
//         if (isVotingEnded) return;
//         const interval = setInterval(() => {
//             setIsProcessing(true);
//             setTimeout(() => {
//                 setIsProcessing(false);
//                 setShowVoteAlert(true);
//                 setVoterCount(prev => prev + 1);
//                 setTimeout(() => setShowVoteAlert(false), 2000);
//             }, 1500);
//         }, 6000);
//         return () => clearInterval(interval);
//     }, [isVotingEnded]);
//
//     // 4. Countdown Timer
//     useEffect(() => {
//         if (isVotingEnded) return;
//         const timer = setInterval(() => {
//             setTimeLeft(prev => {
//                 if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
//                 if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
//                 return prev;
//             });
//         }, 1000);
//         return () => clearInterval(timer);
//     }, [isVotingEnded]);
//
//     return (
//         <div className="dash-bg">
//             <div className="dash-container">
//                 <div className="dash-side-info">
//                     <div className="success-card">
//
//                         {/* Time Remaining Header */}
//                         <div className="time-display-box">
//                             <label>TIME REMAINING UNTIL CLOSING</label>
//                             <div className="time-value">
//                                 {isVotingEnded ? "SESSION CLOSED" : `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
//                             </div>
//                         </div>
//
//                         {/* Population & Voter Count Side by Side */}
//                         <div className="stats-grid">
//                             <div className="stat-item">
//                                 <span className="stat-label">TOTAL CITIZENS</span>
//                                 <span className="stat-value">{totalCitizens.toLocaleString()}</span>
//                             </div>
//                             <div className="stat-item highlight-green">
//                                 <span className="stat-label">REGISTERED VOTES</span>
//                                 <span className="stat-value animate-number">{voterCount.toLocaleString()}</span>
//                             </div>
//                         </div>
//
//                         {/* Candidates Standings */}
//                         <div className={`chart-container ${!isVotingEnded ? "blurred-stats" : "revealed-stats"}`}>
//                             <div className="overlay-text">Results will be revealed once polls close</div>
//                             <h3>Candidate Standings</h3>
//                             {stats.map((item, index) => (
//                                 <div key={index} className="chart-row">
//                                     <div className="chart-label">
//                                         <span>{item.name}</span>
//                                         <span>{isVotingEnded ? `${item.percentage}%` : "--%"}</span>
//                                     </div>
//                                     <div className="bar-bg">
//                                         <div className="bar-fill" style={{ width: isVotingEnded ? `${item.percentage}%` : "0%" }}></div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//
//                         {/* Tiny End Votation Link */}
//                         {!isVotingEnded && (
//                             <button className="tiny-end-btn" onClick={() => setIsVotingEnded(true)}>
//                                 Close voting session
//                             </button>
//                         )}
//
//                         <button className="finish-btn" onClick={() => navigate("/")}>
//                             BACK TO LOGIN
//                         </button>
//                     </div>
//                 </div>
//
//                 <div className="dash-side-visual">
//                     <div className="visual-content">
//                         {/* Attendance Percentage */}
//                         <div className="pulse-circle">
//                             <div className="inner-glow"></div>
//                             <h2>{attendance}%</h2>
//                             <span>ATTENDANCE</span>
//                         </div>
//
//                         {/* Citizen Info & Encouragement Message */}
//                         <div className="citizen-info-panel">
//                             <h3>Why E-Voting is Safe?</h3>
//                             <p>
//                                 Your vote is protected by <strong>RSA-2048 asymmetric encryption</strong> and
//                                 digital signatures. This ensures your choice is anonymous, untamperable and
//                                 instantly verifiable.
//                             </p>
//                             <p className="highlight-text">
//                                 Skip the lines and make your voice heard from anywhere in the world.
//                                 Secure, fast and transparent.
//                             </p>
//                             <div className="encouragement">
//                                 Your future is in your hands. <strong>Go vote today!</strong>
//                             </div>
//                         </div>
//
//                         {/* Friendly Status Messages (Bottom Right) */}
//                         <div className="live-status-monitor">
//                             {isProcessing && (
//                                 <div className="processing-tag">
//                                     <span className="spinner"></span>
//                                     SECURING A NEW VOTE...
//                                 </div>
//                             )}
//                             {showVoteAlert && (
//                                 <div className="vote-recorded-alert">
//                                     VOTE CONFIRMED & ADDED TO BALLOT BOX
//                                 </div>
//                             )}
//                             {!isProcessing && !showVoteAlert && (
//                                 <div className="waiting-tag">SYSTEM IDLE - WAITING FOR VOTERS...</div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="abstract-shape shape-1"></div>
//             <div className="abstract-shape shape-2"></div>
//         </div>
//     );
// }
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./design/Dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();

    // --- State Management ---
    const [totalCitizens, setTotalCitizens] = useState(0);
    const [voterCount, setVoterCount] = useState(0);
    const [isVotingEnded, setIsVotingEnded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showVoteAlert, setShowVoteAlert] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 38, seconds: 46 });

    const [allCandidates, setAllCandidates] = useState([]);
    const [stats, setStats] = useState([]);

    // Use a ref to track the previous count without triggering re-renders
    const prevVoterCountRef = useRef(0);

    // --- Initial Setup and Real-Time Polling ---
    useEffect(() => {
        // 1. Initial fetch for candidates and total citizens
        const fetchSetup = async () => {
            try {
                const candidatesRes = await axios.get("http://localhost:8080/citizen/candidates");
                setAllCandidates(candidatesRes.data);

                const countsRes = await axios.get("http://localhost:8080/presentation/counts");
                setTotalCitizens(countsRes.data.totalCitizens);
                setVoterCount(countsRes.data.currentVotes);
                prevVoterCountRef.current = countsRes.data.currentVotes;
            } catch (err) {
                console.error("Setup Error:", err);
            }
        };
        fetchSetup();

        // 2. Real-Time Polling: Check backend for new votes every 3 seconds
        const pollInterval = setInterval(async () => {
            if (isVotingEnded) return;

            try {
                const response = await axios.get("http://localhost:8080/presentation/counts");
                const newCount = response.data.currentVotes;

                // Logic: If backend count increased, trigger the "New Vote" animation
                if (newCount > prevVoterCountRef.current) {
                    prevVoterCountRef.current = newCount; // Update ref immediately
                    triggerNewVoteAnimation(newCount);
                }
            } catch (err) {
                console.warn("Polling error: Backend may be offline.");
            }
        }, 3000);

        return () => clearInterval(pollInterval);
    }, [isVotingEnded]);

    // Function to handle the visual feedback when a real vote is detected
    const triggerNewVoteAnimation = (newCount) => {
        setIsProcessing(true);

        // Match the visual timing to the backend processing feel
        setTimeout(() => {
            setIsProcessing(false);
            setShowVoteAlert(true);
            setVoterCount(newCount); // Officially update the UI counter

            setTimeout(() => setShowVoteAlert(false), 2500);
        }, 1200);
    };

    // --- Session Control ---
    const handleCloseSession = async () => {
        try {
            const response = await axios.get("http://localhost:8080/results");
            const rawResults = response.data;
            const totalVotesCalculated = Object.values(rawResults).reduce((a, b) => a + b, 0);

            const formattedStats = allCandidates.map(candidate => {
                const votesForThisCandidate = rawResults[candidate.id] || 0;
                return {
                    name: `${candidate.firstName} ${candidate.lastName}`,
                    percentage: totalVotesCalculated > 0
                        ? ((votesForThisCandidate / totalVotesCalculated) * 100).toFixed(1)
                        : 0
                };
            });

            setStats(formattedStats);
            setIsVotingEnded(true);
        } catch (err) {
            alert("Security Protocol Error: Could not retrieve decrypted results.");
        }
    };

    const attendance = totalCitizens > 0 ? ((voterCount / totalCitizens) * 100).toFixed(1) : 0;

    // --- Countdown Timer ---
    useEffect(() => {
        if (isVotingEnded) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isVotingEnded]);

    return (
        <div className="dash-bg">
            <div className="dash-container">
                <div className="dash-side-info">
                    <div className="success-card">
                        <div className="time-display-box">
                            <label>TIME REMAINING UNTIL CLOSING</label>
                            <div className="time-value">
                                {isVotingEnded ? "SESSION CLOSED" : `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
                            </div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-label">TOTAL CITIZENS</span>
                                <span className="stat-value">{totalCitizens.toLocaleString()}</span>
                            </div>
                            <div className="stat-item highlight-green">
                                <span className="stat-label">REGISTERED VOTES</span>
                                <span className="stat-value animate-number">{voterCount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className={`chart-container ${!isVotingEnded ? "blurred-stats" : "revealed-stats"}`}>
                            <div className="overlay-text">Results will be revealed once polls close</div>
                            <h3>Candidate Standings</h3>
                            {allCandidates.length > 0 ? (
                                (isVotingEnded ? stats : allCandidates).map((item, index) => (
                                    <div key={index} className="chart-row">
                                        <div className="chart-label">
                                            <span>{isVotingEnded ? item.name : `${item.firstName} ${item.lastName}`}</span>
                                            <span>{isVotingEnded ? `${item.percentage}%` : "--%"}</span>
                                        </div>
                                        <div className="bar-bg">
                                            <div className="bar-fill" style={{ width: isVotingEnded ? `${item.percentage}%` : "0%" }}></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{color: '#475569', fontSize: '11px'}}>Connecting to secure node...</p>
                            )}
                        </div>

                        {!isVotingEnded && (
                            <button className="tiny-end-btn" onClick={handleCloseSession}>
                                Close voting session
                            </button>
                        )}

                        <button className="finish-btn" onClick={() => navigate("/")}>
                            BACK TO LOGIN
                        </button>
                    </div>
                </div>

                <div className="dash-side-visual">
                    <div className="visual-content">
                        <div className="pulse-circle">
                            <div className="inner-glow"></div>
                            <h2>{attendance}%</h2>
                            <span>ATTENDANCE</span>
                        </div>

                        <div className="citizen-info-panel">
                            <h3>Why E-Voting is Safe?</h3>
                            <p>
                                Your vote is protected by <strong>RSA-2048 asymmetric encryption</strong> and
                                digital signatures. This ensures your choice remains private and verifiable.
                            </p>
                            <div className="encouragement">
                                Your future is in your hands. <strong>Go vote today!</strong>
                            </div>
                        </div>

                        {/* Real-Time Status Feed */}
                        <div className="live-status-monitor">
                            {isProcessing && (
                                <div className="processing-tag">
                                    <span className="spinner"></span>
                                    SECURING INCOMING VOTE...
                                </div>
                            )}
                            {showVoteAlert && (
                                <div className="vote-recorded-alert">
                                    NEW VOTE SUCCESSFULLY ENCRYPTED & RECORDED
                                </div>
                            )}
                            {!isProcessing && !showVoteAlert && (
                                <div className="waiting-tag">SYSTEM IDLE - MONITORING LIVE TRAFFIC</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="abstract-shape shape-1"></div>
            <div className="abstract-shape shape-2"></div>
        </div>
    );
}