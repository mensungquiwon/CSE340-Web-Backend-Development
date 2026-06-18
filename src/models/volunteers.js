import db from './db.js';

// Add a volunteer to a project
const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteer (user_id, project_id)
        VALUES ($1, $2)
        RETURNING volunteer_id;
    `;
    const result = await db.query(query, [userId, projectId]);
    return result.rows[0].volunteer_id;
};

// Remove a volunteer from a project
const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;
    await db.query(query, [userId, projectId]);
};

// Check if a user is already volunteering for a project
const isVolunteer = async (userId, projectId) => {
    const query = `
        SELECT volunteer_id 
        FROM project_volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;
    const result = await db.query(query, [userId, projectId]);
    return result.rows.length > 0;
};

// Get all projects a user has volunteered for
const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            o.name AS organization_name
        FROM project_volunteer pv
        JOIN public.project p ON pv.project_id = p.project_id
        JOIN public.organizations o ON p.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY p.date ASC;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};

export { addVolunteer, removeVolunteer, isVolunteer, getVolunteerProjects };