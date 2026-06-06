import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm } from './controllers/organizations.js';
import { organizationValidation } from './controllers/organizations.js';
import { showEditOrganizationForm } from './controllers/organizations.js';
import { processEditOrganizationForm } from './controllers/organizations.js';
import { showNewProjectForm, processNewProjectForm } from './controllers/projects.js';
import { projectValidation } from './controllers/projects.js';
import { showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { 
    showNewCategoryForm, 
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organizations/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/projects', showProjectsPage);
router.get('/projects/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/categories/:id', showCategoryDetailsPage);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Route to display the edit project form
router.get('/edit-project/:id', showEditProjectForm);

// Route to handle the edit project form submission
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Route for new category page
router.get('/new-category', showNewCategoryForm);

// Route to handle new category form submission
router.post('/new-category', categoryValidation, processNewCategoryForm);

// Route to display the edit category form
router.get('/edit-category/:id', showEditCategoryForm);

// Route to handle the edit category form submission
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;