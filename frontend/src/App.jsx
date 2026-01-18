import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Candidates from "./pages/Candidates.jsx";
import VerifyVote from "./pages/VerifyVote.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />

                    <Route path="/candidates" element={<Candidates />} />
                    <Route path="/verify" element={<VerifyVote />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;