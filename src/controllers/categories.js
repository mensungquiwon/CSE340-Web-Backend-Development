// Import any needed model functions
import { getAllCategories, getCategoryDetails, getCategoriesByProject, getProjectsByCategory } from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  
//Show individual category details page
const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryDetails(categoryId);
  const projects = await getProjectsByCategory(categoryId); // Get projects associated with the category

  const title = category.name;

  res.render('category', { title, category, projects });
};


// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };