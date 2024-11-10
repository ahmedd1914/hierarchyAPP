    // src/components/Sidebar.js
    import React from 'react';
    import { Link } from 'react-router-dom';
    import './Sidebar.css';

    function Sidebar() {
        return (
            <div className="sidebar">
                <h2>Hierarchy</h2>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/org-chart">Org Chart</Link>
                    </li>
                    <li>
                        <Link to="/projects">Projects</Link> {/* New Projects Link */}
                    </li>
                </ul>
                <div className="profile">
                    <img src="/path/to/profile-icon.png" alt="Profile" />
                </div>
            </div>
        );
    }

    export default Sidebar;
