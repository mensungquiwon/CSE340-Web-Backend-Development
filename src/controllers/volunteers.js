import { addVolunteer, removeVolunteer, getVolunteerProjects } from '../models/volunteers.js';

// Add volunteer signup
const processAddVolunteer = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    try {
        await addVolunteer(userId, projectId);
        req.flash('success', 'You have signed up to volunteer for this project!');
    } catch (error) {
        console.error('Error adding volunteer:', error);
        req.flash('error', 'There was an error signing up for this project.');
    }
    res.redirect(`/projects/${projectId}`);
};

// Remove volunteer signup
const processRemoveVolunteer = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    try {
        await removeVolunteer(userId, projectId);
        req.flash('success', 'You have been removed as a volunteer for this project.');
    } catch (error) {
        console.error('Error removing volunteer:', error);
        req.flash('error', 'There was an error removing you from this project.');
    }
    res.redirect(`/projects/${projectId}`);
};

// Show dashboard with volunteer projects
const volunteerDashboard = async (req, res) => {
    const userId = req.session.user.user_id;
    const projects = await getVolunteerProjects(userId);
    const title = 'My Dashboard';
    res.render('dashboard', { title, projects });
};

export { processAddVolunteer, processRemoveVolunteer, volunteerDashboard };