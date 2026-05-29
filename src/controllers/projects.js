// Import any needed model functions
import { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails } from '../models/projects.js';

// Constant for number of upcoming projects
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions

// Show upcoming projects page
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

// Show individual project details page
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const title = project.title;

    res.render('project', { title, project });
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };