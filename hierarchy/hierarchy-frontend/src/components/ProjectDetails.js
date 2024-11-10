import React, { useState } from 'react';
import CreateProjectForm from './CreateProjectForm';
import './ProjectDetails.css';

function ProjectDetails({ project, onClose, onEdit, onDelete, availableEmployees }) {
    const [showEditOverlay, setShowEditOverlay] = useState(false);
    console.log("Available Employees in ProjectDetails:", availableEmployees);
    const formattedStartDate = new Date(project.startDate).toLocaleDateString();
    const formattedEndDate = new Date(project.endDate).toLocaleDateString();

    const statusLabels = {
        NOT_STARTED: "Not Started",
        IN_PROGRESS: "In Progress",
        COMPLETED: "Completed",
        ON_HOLD: "On Hold",
    };

    const readableStatus = statusLabels[project.status] || project.status;

    const handleEditClick = () => {
        setShowEditOverlay(true);
    };

    const closeEditOverlay = () => {
        setShowEditOverlay(false);
    };

    return (
        <div className="project-details-overlay">
            <div className="project-details-modal">
                <span className="close-x" onClick={onClose}>&times;</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p><strong>Status:</strong> {readableStatus}</p>
                <p><strong>Start Date:</strong> {formattedStartDate}</p>
                <p><strong>End Date:</strong> {formattedEndDate}</p>
                <h4>Assigned Employees:</h4>
                <ul>
                    {project.employees && project.employees.length > 0 ? (
                        project.employees.map((employee) => (
                            <li key={employee.id}>{employee.name}</li>
                        ))
                    ) : (
                        <li>No employees assigned</li>
                    )}
                </ul>
                <div className="project-actions">
                    <button onClick={handleEditClick}>Edit Project</button>
                    <button onClick={onDelete} className="delete-button">Delete Project</button>
                </div>
            </div>

            {showEditOverlay && (
                <div className="edit-overlay">
                    <CreateProjectForm
                        project={project}
                        availableEmployees={availableEmployees}
                        onSubmit={(updatedProject) => {
                            onEdit(updatedProject);
                            closeEditOverlay();
                        }}
                        onCancel={closeEditOverlay}
                    />

                </div>
            )}
        </div>
    );
}

export default ProjectDetails;
