console.log('dashboard.js loaded!');

document.addEventListener('DOMContentLoaded', function() {
    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // If the link is to projects.html, skills_tests.html, messages.html, interviews.html, profile_alice.html, or payments.html, allow default navigation
            if (
                href === 'projects.html' ||
                href === 'skills_tests.html' ||
                href === 'messages.html' ||
                href === 'interviews.html' ||
                href === 'profile_alice.html' ||
                href === 'payments.html'
            ) {
                return; // Let the browser handle the navigation
            }
            
            e.preventDefault(); // Prevent default for internal links

            // Remove active class from all items
            navItems.forEach(nav => nav.parentElement.classList.remove('active'));
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Show corresponding section for internal links
            const targetId = href.substring(1);
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Direct navigation for Projects button (fallback/explicit)
    const projectsNavItem = document.querySelector('a[href="projects.html"]');
    if (projectsNavItem) {
        projectsNavItem.addEventListener('click', function(e) {
            // Allow default navigation, as we handled it above by returning
            // If the return was not hit for some reason, this will force it
        });
    }

    // Mobile sidebar toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.querySelector('.dashboard-header').prepend(menuToggle);

    menuToggle.addEventListener('click', () => {
        document.querySelector('.dashboard-sidebar').classList.toggle('active');
    });

    // Notification handling
    const notificationBtn = document.querySelector('.notification-btn');
    let notifications = [
        { type: 'message', content: 'New message from Project Manager', time: '2 hours ago' },
        { type: 'project', content: 'Project "E-commerce Platform" status updated', time: '1 day ago' }
    ];

    notificationBtn.addEventListener('click', () => {
        // Create notification dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        
        notifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = 'notification-item';
            item.innerHTML = `
                <div class="notification-icon">${notification.type === 'message' ? '💬' : '📋'}</div>
                <div class="notification-content">
                    <p>${notification.content}</p>
                    <span>${notification.time}</span>
                </div>
            `;
            dropdown.appendChild(item);
        });

        // Toggle dropdown
        const existingDropdown = document.querySelector('.notification-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        } else {
            document.querySelector('.header-actions').appendChild(dropdown);
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-btn')) {
            const dropdown = document.querySelector('.notification-dropdown');
            if (dropdown) dropdown.remove();
        }
    });

    // User name handling
    const userNameSpan = document.querySelector('.user-menu .user-name');
    const welcomeHeading = document.querySelector('#overview .section-header h1');
    const storedUserName = 'Vivek Prasad'; // Set default name

        if (userNameSpan) {
            userNameSpan.textContent = storedUserName;
        }
        if (welcomeHeading) {
            welcomeHeading.textContent = `Welcome back, ${storedUserName}!`;
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Implement search logic here
    }, 300));

    // Skills progress animation
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));

    // Utility function for debouncing
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

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize any charts or data visualizations
    // Using a setTimeout to ensure the DOM is fully rendered before trying to find the chart container
    setTimeout(() => {
        initializeCharts();
    }, 100); // Small delay of 100ms
});

// Function to initialize charts (using Chart.js)
function initializeCharts() {
    // Example chart for skills progress
    const chartContainer = document.getElementById('skillsChartContainer');
    if (chartContainer) {
        const ctx = document.createElement('canvas');
        chartContainer.appendChild(ctx);
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'],
                datasets: [{
                    label: 'Skill Level',
                    data: [95, 85, 90, 75, 80, 85],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: '#3b82f6',
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#3b82f6'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: '#3f3f46'
                        },
                        grid: {
                            color: '#3f3f46'
                        },
                        pointLabels: {
                            color: '#a1a1aa'
                        },
                        ticks: {
                            color: '#a1a1aa',
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#f4f4f5'
                        }
                    }
                }
            }
        });
    } else {
        console.error('Chart container not found: #skillsChartContainer');
    }
}

// Add styles for notification dropdown
const style = document.createElement('style');
style.textContent = `
    .notification-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: #242529;
        border: 1px solid #3f3f46;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 300px;
        z-index: 100;
        margin-top: 8px;
    }

    .notification-item {
        display: flex;
        gap: 12px;
        padding: 12px;
        border-bottom: 1px solid #3f3f46;
    }

    .notification-item:last-child {
        border-bottom: none;
    }

    .notification-icon {
        background: #3b82f6;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        color: white;
    }

    .notification-content p {
        margin: 0;
        color: #f4f4f5;
        font-size: 0.9rem;
    }

    .notification-content span {
        color: #a1a1aa;
        font-size: 0.8rem;
    }

    .menu-toggle {
        display: none;
        background: none;
        border: none;
        color: #f4f4f5;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 8px;
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
    }
`;
document.head.appendChild(style); 