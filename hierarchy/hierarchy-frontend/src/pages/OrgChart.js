// src/pages/OrgChart.js
import React, { useEffect, useState } from 'react';
import EmployeeCard from "../components/EmployeeCard";
import EmployeeDetails from "../components/EmployeeDetails";
import AddEmployeeForm from "../components/AddEmployeeForm";
import FilterMenu from "../components/FilterMenu";
import './OrgChart.css';

function OrgChart() {
    const [employees, setEmployees] = useState([]);
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchAllEmployees();
        fetchPositions();
        fetchDepartments();
    }, []);

    const toggleForm = () => setShowForm(prevShowForm => !prevShowForm);
    const toggleFilter = () => setShowFilter(prevShowFilter => !prevShowFilter);

    const fetchAllEmployees = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/employees');
            if (!response.ok) throw new Error('Failed to fetch employees');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPositions = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/positions');
            if (!response.ok) throw new Error('Failed to fetch positions');
            const data = await response.json();
            setPositions(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/departments');
            if (!response.ok) throw new Error('Failed to fetch departments');
            const data = await response.json();
            setDepartments(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddEmployee = async (newEmployee) => {
        try {
            const response = await fetch('http://localhost:8080/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEmployee),
            });
            if (!response.ok) throw new Error('Failed to create employee');
            const addedEmployee = await response.json();
            setEmployees([...employees, addedEmployee]);
            setShowForm(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleFilter = (filteredEmployees) => {
        setEmployees(filteredEmployees);
        setShowFilter(false);
    };

    const openEmployeeDetails = (employee) => {
        setSelectedEmployee(employee);
    };

    const closeEmployeeDetails = () => {
        setSelectedEmployee(null);
    };

    const handlePromote = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/employees/${selectedEmployee.id}/promote`, {
                method: 'PUT',
            });
            if (!response.ok) throw new Error('Failed to promote employee');
            const updatedEmployee = await response.json();
            setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
            setSelectedEmployee(updatedEmployee);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:8080/api/employees/${selectedEmployee.id}`, {
                method: 'DELETE',
            });
            setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
            closeEmployeeDetails();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="org-chart">
            <h2>Organization Chart</h2>
            <button onClick={toggleForm}>
                {showForm ? "Close Add Employee" : "Add Employee"}
            </button>
            <button onClick={toggleFilter}>
                {showFilter ? "Close Filter" : "Filter Employees"}
            </button>

            {showForm && (
                <AddEmployeeForm
                    onSubmit={handleAddEmployee}
                    onCancel={() => setShowForm(false)}
                    positions={positions}
                    departments={departments}
                />
            )}

            {showFilter && (
                <FilterMenu
                    onFilter={handleFilter}
                    employees={employees}
                    onClose={() => setShowFilter(false)}
                />
            )}

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div className="employee-list">
                {employees.map(employee => (
                    <EmployeeCard
                        key={employee.id}
                        name={employee.name}
                        position={employee.position?.title || "No Position"}
                        onClick={() => openEmployeeDetails(employee)}
                    />
                ))}
            </div>

            {selectedEmployee && (
                <EmployeeDetails
                    employee={selectedEmployee}
                    onClose={closeEmployeeDetails}
                    onPromote={handlePromote}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default OrgChart;
