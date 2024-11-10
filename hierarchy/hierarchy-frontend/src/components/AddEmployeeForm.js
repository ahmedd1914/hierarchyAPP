import React, { useState } from 'react';
import './AddEmployeeForm.css';

function AddEmployeeForm({ onSubmit, onCancel, positions, departments }) {
    const [name, setName] = useState("");
    const [positionId, setPositionId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [gender, setGender] = useState("");
    const [hireDate, setHireDate] = useState("");

    const positionsForDepartment = positions.filter(position => position.department?.id === parseInt(departmentId, 10));

    const handleSubmit = (e) => {
        e.preventDefault();
        const today = new Date();
        const selectedDate = new Date(hireDate);

        if (selectedDate > today) {
            alert("Hire date cannot be in the future.");
            return;
        }
        onSubmit({
            name,
            position: { id: positionId },
            department: { id: departmentId },
            gender,
            hireDate
        });
    };

    return (
        <div className="add-employee-form-overlay">
            <div className="add-employee-form">
                <h3>Add New Employee</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <select
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={positionId}
                        onChange={(e) => setPositionId(e.target.value)}
                        required
                        disabled={!departmentId}
                    >
                        <option value="">Select Position</option>
                        {positionsForDepartment.map(position => (
                            <option key={position.id} value={position.id}>
                                {position.title}
                            </option>
                        ))}
                    </select>

                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>

                    <input
                        type="date"
                        placeholder="Hire Date"
                        value={hireDate}
                        onChange={(e) => setHireDate(e.target.value)}
                        required
                    />

                    <button type="submit">Create</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddEmployeeForm;
