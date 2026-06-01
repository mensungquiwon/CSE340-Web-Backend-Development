import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name ASC
    `;

    const result = await db.query(query);
    return result.rows;
};
const getCategoryDetails = async (categoryId) => {
      const query = `
      SELECT
        category_id,
        name
      FROM category
      WHERE category_id = $1;
    `

      const queryParams = [categoryId];
      const result = await db.query(query, queryParams);

      // Return the first row of the result set, or null if no rows are found
      return result.rows.length > 0 ? result.rows[0] : null;
};
const getCategoriesByProject = async (projectId) => {
  const query = `
    SELECT
      c.category_id,
      c.name
    FROM category c
    JOIN project_category pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1;
  `;

  const result = await db.query(query, [projectId]);
  return result.rows;
};
const getProjectsByCategory = async (categoryId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location
    FROM project p
    JOIN project_category pc
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1;
  `;

  const result = await db.query(query, [categoryId]);
  return result.rows;
};

export { getAllCategories, getCategoryDetails, getCategoriesByProject, getProjectsByCategory };