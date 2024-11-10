// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import OrgChart from './pages/OrgChart';
import About from './pages/About';
import Projects from './pages/Projects'


function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
                    <Routes>
                        {/* Redirect root to /about */}
                        <Route path="/" element={<Navigate to="/about" />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/org-chart" element={<OrgChart />} />
                        <Route path="/projects" element={<Projects />} />

                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
