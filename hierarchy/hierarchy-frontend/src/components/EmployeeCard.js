import React from 'react';
import './EmployeeCard.css';

function EmployeeCard({ name, position, onClick}) {
    return (
        <div className="employee-card" onClick={onClick}>
            <h4>{name}</h4>
            <p>Position: {position}</p>

        </div>
    );
}

export default EmployeeCard;
