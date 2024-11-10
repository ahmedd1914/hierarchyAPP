// src/components/FilterMenu.js
import React, { useState } from 'react';
import './FilterMenu.css';

function FilterMenu({ employees, onFilter, onClose }) {
    const [gender, setGender] = useState("");
    const [minYears, setMinYears] = useState(0);
    const [maxYears, setMaxYears] = useState(10);

    const handleFilter = () => {
        const filteredEmployees = employees.filter(employee => {
            const yearsOfExperience = new Date().getFullYear() - new Date(employee.hireDate).getFullYear();
            return (
                (!gender || employee.gender === gender) &&
                (yearsOfExperience >= minYears && yearsOfExperience <= maxYears)
            );
        });
        onFilter(filteredEmployees);
    };

    return (
        <div className="filter-menu-overlay">
            <div className="filter-menu">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h3>Filter Employees</h3>
                <form>
                    <label>
                        Gender:
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">All</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </label>
                    <label>
                        Min Years:
                        <input
                            type="number"
                            value={minYears}
                            onChange={(e) => setMinYears(Math.max(0, Number(e.target.value)))}
                        />
                    </label>
                    <label>
                        Max Years:
                        <input
                            type="number"
                            value={maxYears}
                            onChange={(e) => setMaxYears(Math.max(0, Number(e.target.value)))}
                        />
                    </label>
                    <button type="button" className="apply-filter" onClick={handleFilter}>Apply Filter</button>
                    <button type="button" className="clear-filter" onClick={() => onFilter(employees)}>Clear Filter</button>
                </form>
            </div>
        </div>
    );
}

export default FilterMenu;
