import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

const updateProjectCount = () => {
    const projectsCount = projectsContainer.children.length;
    const projectsTitle = document.querySelector('.projects-title');
    projectsTitle.textContent = `${projectsCount} Projects`;
};

document.addEventListener('DOMContentLoaded', updateProjectCount);
updateProjectCount();