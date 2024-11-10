import React, { useState, useEffect } from 'react';
import ProjectDetails from '../components/ProjectDetails';
import CreateProjectForm from '../components/CreateProjectForm';
import './Projects.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const statusLabels = {
        NOT_STARTED: "Not Started",
        IN_PROGRESS: "In Progress",
        COMPLETED: "Completed",
        ON_HOLD: "On Hold",
    };

    useEffect(() => {
        fetchProjects();
        fetchEmployees();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/projects');
            if (!response.ok) throw new Error('Failed to fetch projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/employees');
            if (!response.ok) throw new Error('Failed to fetch employees');
            const data = await response.json();
            console.log("Fetched Employees:", data);
            setEmployees(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCreateProject = async (newProject) => {
        try {
            const response = await fetch('http://localhost:8080/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject),
            });
            if (!response.ok) throw new Error('Failed to create project');
            fetchProjects();
            setShowCreateForm(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdateProject = async (updatedProject) => {
        try {
            const response = await fetch(`http://localhost:8080/api/projects/${updatedProject.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject),
            });

            if (!response.ok) throw new Error('Failed to update project');

            const updatedData = await response.json();

            // Update the projects state with the new data
            setProjects((prevProjects) => prevProjects.map(
                (proj) => proj.id === updatedData.id ? updatedData : proj
            ));
            setSelectedProject(updatedData); // Update selected project for display
        } catch (error) {
            setError(error.message);
        }
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await fetch(`http://localhost:8080/api/projects/${projectId}`, {
                method: 'DELETE',
            });
            fetchProjects();
            setSelectedProject(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="projects-page">
            <h2>Projects</h2>
            <button onClick={() => setShowCreateForm(true)}>Create Project</button>


            {showCreateForm && (
                <CreateProjectForm
                    availableEmployees={employees} // Pass employees to the form
                    project={selectedProject}
                    onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
                    onCancel={() => {
                        setShowCreateForm(false);
                        setSelectedProject(null);
                    }}
                />
            )}




            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div className="project-list">
                {projects.map(project => (
                    <div
                        key={project.id}
                        className="project-item"
                        onClick={() => handleProjectClick(project)}
                    >
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <p>Status: {statusLabels[project.status] || project.status}</p>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <ProjectDetails
                    project={selectedProject}
                    availableEmployees={employees}
                    onClose={() => setSelectedProject(null)}
                    onEdit={() => {
                        setShowCreateForm(true);
                        setSelectedProject(selectedProject);
                    }}
                    onDelete={() => handleDeleteProject(selectedProject.id)}
                />
            )}
        </div>
    );
}

export default Projects;
