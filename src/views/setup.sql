-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    description     TEXT NOT NULL,
    contact_email   VARCHAR(255) NOT NULL,
    logo_filename   VARCHAR(255) NOT NULL
);

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    description     TEXT NOT NULL,
    contact_email   VARCHAR(255) NOT NULL,
    logo_filename   VARCHAR(255) NOT NULL
);

-- ========================================
-- Service Projects
-- ========================================
 
CREATE TABLE project (
    project_id      SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT NOT NULL,
    location        VARCHAR(255),
    date            DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);
INSERT INTO project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES
    (1, 'Community Center Renovation',   'Renovating an aging community center using sustainable construction materials.', 'Calgary, Alberta',    '2026-06-15'),
    (1, 'Affordable Housing Initiative', 'Building affordable housing units for low-income families.',                    'Edmonton, Alberta',   '2026-07-20'),
    (1, 'Playground Restoration',        'Restoring public playgrounds with safer and eco-friendly equipment.',           'Red Deer, Alberta',   '2026-08-10'),
    (1, 'Bridge Safety Upgrade',         'Upgrading pedestrian bridges to improve accessibility and safety.',             'Lethbridge, Alberta', '2026-09-05'),
    (1, 'Solar School Retrofit',         'Installing solar panels and energy-efficient systems in schools.',              'Medicine Hat, Alberta','2026-10-01'),

    (2, 'Downtown Rooftop Garden',        'Creating rooftop gardens to promote urban agriculture.',           'Calgary, Alberta',  '2026-05-25'),
    (2, 'Community Greenhouse Program',   'Building greenhouses for year-round food production.',             'Edmonton, Alberta', '2026-06-18'),
    (2, 'School Garden Expansion',        'Expanding educational gardens in elementary schools.',             'Airdrie, Alberta',  '2026-07-12'),
    (2, 'Neighborhood Compost Initiative','Launching a compost collection and education program.',            'Okotoks, Alberta',  '2026-08-08'),
    (2, 'Urban Orchard Project',          'Planting fruit trees in public spaces for community access.',      'Banff, Alberta',    '2026-09-14'),

    (3, 'Winter Clothing Drive',         'Organizing volunteers to distribute winter clothing to shelters.', 'Calgary, Alberta',    '2026-11-01'),
    (3, 'Senior Support Visits',         'Coordinating volunteers to assist isolated seniors.',              'Edmonton, Alberta',   '2026-06-30'),
    (3, 'Food Bank Volunteer Campaign',  'Recruiting volunteers for local food bank operations.',            'Red Deer, Alberta',   '2026-07-22'),
    (3, 'Community Cleanup Day',         'Hosting neighborhood cleanup and beautification events.',          'Canmore, Alberta',    '2026-08-16'),
    (3, 'Back-to-School Supply Drive',   'Collecting and distributing school supplies for children in need.','Lethbridge, Alberta', '2026-09-03');


-- ========================================
-- Categories
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Junction table: project <-> category
-- ========================================
CREATE TABLE project_category (
    project_id  INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id)  REFERENCES project(project_id)   ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

INSERT INTO category (name)
VALUES
    ('Community Development'),
    ('Environmental Sustainability'),
    ('Food Security'),
    ('Education & Youth'),
    ('Volunteer Coordination');

INSERT INTO project_category (project_id, category_id)
VALUES
    -- BrightFuture Builders projects → Community Development + Environmental Sustainability
    (1, 1), (1, 2),
    (2, 1),
    (3, 1), (3, 2),
    (4, 1),
    (5, 2),

    -- GreenHarvest Growers projects → Food Security + Environmental Sustainability
    (6, 3), (6, 2),
    (7, 3),
    (8, 3), (8, 4),
    (9, 2), (9, 3),
    (10, 3),

    -- UnityServe Volunteers projects → Volunteer Coordination + Food Security + Education
    (11, 5),
    (12, 5),
    (13, 3), (13, 5),
    (14, 1), (14, 5),
    (15, 4), (15, 5);
