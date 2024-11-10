// src/components/EmployeeDetails.js
import React from 'react';
import './EmployeeDetails.css';

function EmployeeDetails({ employee, onClose, onPromote, onDelete}) {
    if (!employee) return null;

    return (
        <div className="employee-details-overlay">
            <div className="employee-details">
                <button className="close-button" onClick={onClose}>X</button>
                <h3>{employee.name}</h3>
                <p>Position: {employee.position?.title || "No Position"}</p>
                <p>Department: {employee.department?.name || "No Department"}</p>
                <p>Gender: {employee.gender}</p>
                <p>Hire Date: {new Date(employee.hireDate).toLocaleDateString()}</p>
                <div className="employee-details-buttons">
                    <button onClick={onPromote}>Promote</button>
                    <button onClick={onDelete}>Fire</button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;
