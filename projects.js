// Project Management System
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the projects system
    initializeProjects();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial projects
    loadProjects();
});

// Project data structure (in a real app, this would be stored in a database)
let projects = [
    {
        id: 1,
        name: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform built with React and Node.js',
        type: 'web',
        status: 'active',
        tags: ['React', 'Node.js', 'MongoDB', 'Redux'],
        files: ['package.json', 'README.md', 'src/'],
        createdAt: '2024-03-15',
        updatedAt: '2024-03-20'
    },
    {
        id: 2,
        name: 'Mobile Fitness App',
        description: 'Cross-platform fitness tracking application built with React Native',
        type: 'mobile',
        status: 'completed',
        tags: ['React Native', 'Firebase', 'Redux'],
        files: ['app.json', 'README.md', 'src/'],
        createdAt: '2024-02-01',
        updatedAt: '2024-03-10'
    },
    {
        id: 3,
        name: 'Data Analytics Dashboard',
        description: 'Interactive dashboard for visualizing sales and customer data.',
        type: 'web',
        status: 'active',
        tags: ['D3.js', 'Python', 'Flask', 'SQL'],
        files: ['dashboard.py', 'README.md', 'data/'],
        createdAt: '2024-04-01',
        updatedAt: '2024-04-10'
    },
    {
        id: 4,
        name: 'AI Chatbot Integration',
        description: 'Integrating a custom AI chatbot into a customer support system.',
        type: 'other',
        status: 'active',
        tags: ['Python', 'TensorFlow', 'NLP', 'API Integration'],
        files: ['main.py', 'README.md', 'models/'],
        createdAt: '2024-04-20',
        updatedAt: '2024-05-01'
    },
    {
        id: 5,
        name: 'UX Research & Prototyping',
        description: 'Comprehensive UX research and high-fidelity prototype for a new mobile app.',
        type: 'design',
        status: 'completed',
        tags: ['Figma', 'User Research', 'Prototyping', 'Usability Testing'],
        files: ['research_report.pdf', 'prototype.fig'],
        createdAt: '2024-01-05',
        updatedAt: '2024-02-15'
    }
];

// Initialize the projects system
function initializeProjects() {
    // Set up drag and drop for file upload
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.parentElement.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.parentElement.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.parentElement.classList.remove('dragover');
            handleFileDrop(e.dataTransfer.files);
        });
    }
}

// Set up event listeners
function setupEventListeners() {
    // Upload button
    const uploadBtn = document.getElementById('uploadLocalBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => showModal('uploadModal'));
    }

    // GitHub import button
    const githubBtn = document.getElementById('importGithubBtn');
    if (githubBtn) {
        githubBtn.addEventListener('click', () => showModal('githubModal'));
    }

    // Close buttons for modals
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            hideAllModals();
        });
    });

    // Cancel buttons
    document.getElementById('cancelUpload')?.addEventListener('click', () => hideAllModals());
    document.getElementById('cancelGithub')?.addEventListener('click', () => hideAllModals());

    // Form submissions
    document.getElementById('projectUploadForm')?.addEventListener('submit', handleProjectUpload);
    document.getElementById('githubImportForm')?.addEventListener('submit', handleGithubImport);

    // Search functionality
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    // Filter changes
    document.getElementById('statusFilter')?.addEventListener('change', applyFilters);
    document.getElementById('typeFilter')?.addEventListener('change', applyFilters);
    document.getElementById('sortFilter')?.addEventListener('change', applyFilters);
}

// Load and display projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    if (projects.length === 0) {
        showEmptyState();
        return;
    }

    projectsGrid.innerHTML = '';
    projects.forEach(project => {
        projectsGrid.appendChild(createProjectCard(project));
    });
}

// Create a project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-card-header">
            <h3 class="project-card-title">${project.name}</h3>
            <span class="project-card-type">${getProjectTypeLabel(project.type)}</span>
        </div>
        <div class="project-card-body">
            <p class="project-card-description">${project.description}</p>
            <div class="project-card-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>
        <div class="project-card-footer">
            <div class="project-card-status">
                <span class="status-indicator status-${project.status}"></span>
                <span>${getStatusLabel(project.status)}</span>
            </div>
            <div class="project-card-actions">
                <button class="view-btn" title="View Project">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="edit-btn" title="Edit Project">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" title="Delete Project">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="project-card-overlay">
            <div class="overlay-actions">
                <button class="view-details-btn">View Details</button>
                <button class="edit-project-btn">Edit Project</button>
            </div>
        </div>
    `;

    // Add event listeners for the action buttons
    card.querySelector('.view-btn').addEventListener('click', () => viewProject(project.id));
    card.querySelector('.edit-btn').addEventListener('click', () => editProject(project.id));
    card.querySelector('.delete-btn').addEventListener('click', () => deleteProject(project.id));
    card.querySelector('.view-details-btn').addEventListener('click', () => viewProject(project.id));
    card.querySelector('.edit-project-btn').addEventListener('click', () => editProject(project.id));

    return card;
}

// Show empty state when no projects exist
function showEmptyState() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-folder-open"></i>
            <h3>No Projects Yet</h3>
            <p>Start by uploading your first project or importing from GitHub</p>
            <div class="project-actions">
                <button class="btn btn-primary" id="uploadLocalBtn">
                    <i class="fas fa-upload"></i> Upload Project
                </button>
                <button class="btn btn-secondary" id="importGithubBtn">
                    <i class="fab fa-github"></i> Import from GitHub
                </button>
            </div>
        </div>
    `;

    // Reattach event listeners
    document.getElementById('uploadLocalBtn')?.addEventListener('click', () => showModal('uploadModal'));
    document.getElementById('importGithubBtn')?.addEventListener('click', () => showModal('githubModal'));
}

// Handle project upload
async function handleProjectUpload(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get file input
    const fileInput = document.getElementById('projectFiles');
    const files = fileInput.files;
    
    if (files.length === 0) {
        showNotification('Please select at least one file to upload', 'error');
        return;
    }

    // Show loading state
    form.classList.add('loading');

    try {
        // In a real app, you would upload the files to a server here
        // For now, we'll simulate a successful upload
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create new project object
        const newProject = {
            id: projects.length + 1,
            name: formData.get('projectName'),
            description: formData.get('projectDescription'),
            type: formData.get('projectType'),
            status: 'active',
            tags: formData.get('projectTags').split(',').map(tag => tag.trim()),
            files: Array.from(files).map(file => file.name),
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        };

        // Add to projects array
        projects.unshift(newProject);

        // Reload projects
        loadProjects();

        // Hide modal and show success message
        hideAllModals();
        showNotification('Project uploaded successfully!', 'success');

        // Reset form
        form.reset();
    } catch (error) {
        showNotification('Error uploading project. Please try again.', 'error');
    } finally {
        form.classList.remove('loading');
    }
}

// Handle GitHub import
async function handleGithubImport(e) {
    e.preventDefault();
    
    const form = e.target;
    const repoUrl = form.querySelector('#githubRepo').value;
    const branch = form.querySelector('#githubBranch').value;
    const importReadme = form.querySelector('#importReadme').checked;

    // Show loading state
    form.classList.add('loading');

    try {
        // In a real app, you would fetch the repository data from GitHub API
        // For now, we'll simulate a successful import
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create new project from GitHub
        const newProject = {
            id: projects.length + 1,
            name: repoUrl.split('/').pop(),
            description: importReadme ? 'Imported from GitHub README' : 'Project imported from GitHub',
            type: 'web', // This would be determined by the repository content
            status: 'active',
            tags: ['GitHub', 'Imported'],
            files: ['package.json', 'README.md', 'src/'],
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        };

        // Add to projects array
        projects.unshift(newProject);

        // Reload projects
        loadProjects();

        // Hide modal and show success message
        hideAllModals();
        showNotification('Project imported successfully from GitHub!', 'success');

        // Reset form
        form.reset();
    } catch (error) {
        showNotification('Error importing from GitHub. Please try again.', 'error');
    } finally {
        form.classList.remove('loading');
    }
}

// Handle file drop
function handleFileDrop(files) {
    const fileInput = document.getElementById('projectFiles');
    if (fileInput) {
        fileInput.files = files;
        // Trigger change event to update UI
        fileInput.dispatchEvent(new Event('change'));
    }
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProjects = projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    updateProjectsDisplay(filteredProjects);
}

// Apply filters
function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;

    let filteredProjects = [...projects];

    // Apply status filter
    if (statusFilter !== 'all') {
        filteredProjects = filteredProjects.filter(project => project.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
        filteredProjects = filteredProjects.filter(project => project.type === typeFilter);
    }

    // Apply sorting
    switch (sortFilter) {
        case 'name':
            filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'status':
            filteredProjects.sort((a, b) => a.status.localeCompare(b.status));
            break;
        case 'recent':
        default:
            filteredProjects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            break;
    }

    updateProjectsDisplay(filteredProjects);
}

// Update projects display
function updateProjectsDisplay(filteredProjects) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No Projects Found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = '';
    filteredProjects.forEach(project => {
        projectsGrid.appendChild(createProjectCard(project));
    });
}

// View project details
function viewProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // In a real app, this would navigate to a project details page
    console.log('Viewing project:', project);
    showNotification(`Viewing project: ${project.name}`, 'info');
}

// Edit project
function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // In a real app, this would open an edit modal or navigate to an edit page
    console.log('Editing project:', project);
    showNotification(`Editing project: ${project.name}`, 'info');
}

// Delete project
function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return;

    const project = projects[projectIndex];
    projects.splice(projectIndex, 1);
    loadProjects();
    showNotification(`Project "${project.name}" has been deleted`, 'success');
}

// Utility functions
function showModal(modalId) {
    hideAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function showNotification(message, type = 'info') {
    // In a real app, this would show a proper notification
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(message);
}

function getProjectTypeLabel(type) {
    const types = {
        web: 'Web Development',
        mobile: 'Mobile App',
        design: 'Design',
        other: 'Other'
    };
    return types[type] || type;
}

function getStatusLabel(status) {
    const statuses = {
        active: 'Active',
        completed: 'Completed',
        archived: 'Archived'
    };
    return statuses[status] || status;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 