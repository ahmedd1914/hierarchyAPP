import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './CreateProjectForm.css';

function CreateProjectForm({ onSubmit, onCancel, availableEmployees = [], project }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('IN_PROGRESS');
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // Format dates to "YYYY-MM-DD"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    useEffect(() => {
        if (project) {
            // Initialize form with existing project data
            setName(project.name || '');
            setDescription(project.description || '');
            setStartDate(project.startDate ? formatDate(project.startDate) : '');
            setEndDate(project.endDate ? formatDate(project.endDate) : '');
            setStatus(project.status || 'IN_PROGRESS');

            // Initialize selected employees
            const initialSelectedEmployees = project.employees?.map(emp => ({
                value: emp.id,
                label: emp.name,
            })) || [];
            setSelectedEmployees(initialSelectedEmployees);
        }
    }, [project]);
    console.log("Available Employees in CreateProjectForm:", availableEmployees);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: project?.id || null,
            name,
            description,
            startDate,
            endDate,
            status,
            employees: selectedEmployees.map(employee => employee.value), // Get employee IDs
        };
        console.log("Submitting payload:", payload); // Debug output
        onSubmit(payload);
    };

    const handleEmployeeSelection = (selectedOptions) => {
        setSelectedEmployees(selectedOptions || []);
    };

    const employeeOptions = availableEmployees.map(employee => ({
        value: employee.id,
        label: employee.name,
    }));

    return (
        <div className="create-project-form-overlay">
            <div className="create-project-form-modal">
                <span className="close-button" onClick={onCancel}>&times;</span>
                <h3>{project ? "Edit Project" : "Create Project"}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ON_HOLD">On Hold</option>
                    </select>
                    <Select
                        isMulti
                        value={selectedEmployees}
                        onChange={handleEmployeeSelection}
                        options={employeeOptions}
                        placeholder="Assign Employees"
                        className="employee-select-dropdown"
                    />
                    <button type="submit">{project ? "Save Changes" : "Create"}</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProjectForm;
