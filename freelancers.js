// freelancers.js

document.addEventListener('DOMContentLoaded', function() {
    const freelancerGrid = document.getElementById('freelancerGrid');
    const selectedSkillsDisplay = document.getElementById('selectedSkillsDisplay');
    const noResultsMessage = document.getElementById('noResultsMessage');

    // 1. Retrieve selected skills from localStorage
    const hiringProcessData = JSON.parse(localStorage.getItem('hiringProcessData') || '{}');
    const selectedSkills = hiringProcessData.step6 || [];

    console.log('Retrieved selected skills:', selectedSkills);

    // Display selected skills at the top of the page
    if (selectedSkills.length > 0 && selectedSkills[0] !== 'skipped') {
        selectedSkills.forEach(skill => {
            const skillPill = document.createElement('span');
            skillPill.classList.add('selected-skill-pill');
            skillPill.textContent = skill;
            selectedSkillsDisplay.appendChild(skillPill);
        });
    } else {
        const infoText = document.createElement('p');
        infoText.textContent = 'No specific skills were selected. Displaying all available profiles.';
        infoText.style.color = 'var(--text-secondary)';
        infoText.style.fontSize = '0.95rem';
        selectedSkillsDisplay.appendChild(infoText);
    }

    // 2. Mock Freelancer Data
    const freelancers = [
        {
            id: 1,
            name: 'Vivek Prasad',
            photo: 'vivek.jpg',
            headline: 'Senior Full-Stack Developer',
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'HTML', 'CSS', 'Express.js'],
            payRate: '$85/hr',
            projects: [
                'E-commerce Platform Development',
                'Real-time Chat Application',
                'RESTful API Design'
            ],
            linkedin: 'https://www.linkedin.com/in/alicejohnson/',
            github: 'https://github.com/alicejohnson'
        },
        {
            id: 2,
            name: 'Bob Williams',
            photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300&crop=faces',
            headline: 'Experienced UI/UX Designer',
            skills: ['UI/UX Design', 'Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research'],
            payRate: '$70/hr',
            projects: [
                'Mobile App Redesign',
                'Website Usability Audit',
                'Design System Creation'
            ],
            linkedin: 'https://www.linkedin.com/in/bobwilliams/',
            github: '' // No GitHub for this mock profile
        },
        {
            id: 3,
            name: 'Charlie Brown',
            photo: 'https://images.unsplash.com/photo-1507003211169-e69fe1c5a0b9?auto=format&fit=crop&q=80&w=300&h=300&crop=faces',
            headline: 'Data Scientist & Python Expert',
            skills: ['Python', 'Data Science', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'SQL'],
            payRate: '$95/hr',
            projects: [
                'Predictive Analytics Model',
                'Customer Churn Prediction',
                'Automated Data Pipeline'
            ],
            linkedin: 'https://www.linkedin.com/in/charliebrown/',
            github: 'https://github.com/charliebrown'
        },
        {
            id: 4,
            name: 'Diana Miller',
            photo: 'https://images.unsplash.com/photo-1544723795-d729345bcddc?auto=format&fit=crop&q=80&w=300&h=300&crop=faces',
            headline: 'Certified Project Manager (PMP)',
            skills: ['Project Management', 'Agile', 'Scrum', 'Jira', 'Risk Management', 'Stakeholder Management'],
            payRate: '$100/hr',
            projects: [
                'Enterprise Software Implementation',
                'Cross-functional Team Lead',
                'Product Launch Coordination'
            ],
            linkedin: 'https://www.linkedin.com/in/dianamiller/',
            github: ''
        },
        {
            id: 5,
            name: 'Eve Davis',
            photo: 'https://images.unsplash.com/photo-1589578132961-75e1140081d6?auto=format&fit=crop&q=80&w=300&h=300&crop=faces',
            headline: 'Growth Marketing Specialist',
            skills: ['Digital Marketing', 'SEO', 'SEM', 'Content Marketing', 'Google Analytics', 'Social Media Marketing'],
            payRate: '$75/hr',
            projects: [
                'SEO Strategy & Implementation',
                'Email Campaign Optimization',
                'Social Media Engagement Growth'
            ],
            linkedin: 'https://www.linkedin.com/in/evedavis/',
            github: ''
        },
        {
            id: 6,
            name: 'Frank White',
            photo: 'https://images.unsplash.com/photo-1547425260-76bc0bce662c?auto=format&fit=crop&q=80&w=300&h=300&crop=faces',
            headline: 'Senior iOS Developer',
            skills: ['iOS', 'Swift', 'Objective-C', 'Xcode', 'Mobile Development', 'UI Kit'],
            payRate: '$90/hr',
            projects: [
                'Native iOS E-commerce App',
                'Health Tracking Mobile Application',
                'API Integration for iOS'
            ],
            linkedin: 'https://www.linkedin.com/in/frankwhite/',
            github: 'https://github.com/frankwhite'
        },
        {
            id: 7,
            name: 'Grace Lee',
            photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=300&h=300&crop=faces',
            headline: 'Talented Frontend Developer',
            skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'Vue.js', 'TypeScript'],
            payRate: '$80/hr',
            projects: [
                'Interactive Dashboard UI',
                'E-commerce Frontend Build',
                'Responsive Web Application'
            ],
            linkedin: 'https://www.linkedin.com/in/gracelee/',
            github: 'https://github.com/gracelee'
        },
        {
            id: 8,
            name: 'Henry Wilson',
            photo: 'https://images.unsplash.com/photo-1542155097-f5597793540a?auto=format&fit=crop&q=80&w=300&h=300&crop=faces',
            headline: 'Experienced Backend Engineer',
            skills: ['Python', 'Django', 'SQL', 'PostgreSQL', 'AWS', 'REST API', 'Docker'],
            payRate: '$98/hr',
            projects: [
                'Scalable Backend API',
                'Database Optimization',
                'Cloud Migration Project'
            ],
            linkedin: 'https://www.linkedin.com/in/henrywilson/',
            github: 'https://github.com/henrywilson'
        }
    ];

    // 3. Filter freelancers based on selected skills
    let matchingFreelancers = [];
    if (selectedSkills.length > 0 && selectedSkills[0] !== 'skipped') {
        matchingFreelancers = freelancers.filter(freelancer => 
            selectedSkills.some(skill => 
                freelancer.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
            )
        );
    } else {
        // If no skills were selected (e.g., user skipped step 6), show all freelancers
        matchingFreelancers = freelancers;
    }

    console.log('Matching freelancers:', matchingFreelancers);

    // 4. Dynamically render freelancer profiles
    if (matchingFreelancers.length > 0) {
        matchingFreelancers.forEach(freelancer => {
            const card = document.createElement('div');
            card.classList.add('freelancer-card');

            card.innerHTML = `
                <div class="freelancer-header">
                    <img src="${freelancer.photo}" alt="${freelancer.name}" class="freelancer-photo">
                    <div class="freelancer-info">
                        <h3>${freelancer.id === 1 ? `<a href='profile_alice.html' target='_blank' style='color:inherit;text-decoration:underline;cursor:pointer;'>${freelancer.name}</a>` : freelancer.name}</h3>
                        <p>${freelancer.headline}</p>
                    </div>
                </div>
                <div class="freelancer-skills">
                    ${freelancer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="freelancer-details">
                    <p>Expected Pay: <strong>${freelancer.payRate}</strong></p>
                </div>
                <div class="freelancer-projects">
                    <h4>Recent Projects</h4>
                    <ul class="project-list">
                        ${freelancer.projects.map(project => `<li>${project}</li>`).join('')}
                    </ul>
                </div>
                <div class="social-links">
                    ${freelancer.linkedin ? `<a href="${freelancer.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i></a>` : ''}
                    ${freelancer.github ? `<a href="${freelancer.github}" target="_blank" class="social-link"><i class="fab fa-github"></i></a>` : ''}
                </div>
                <div class="freelancer-actions">
                    <button class="btn btn-primary btn-small schedule-interview-btn" data-freelancer-id="${freelancer.id}" data-freelancer-name="${freelancer.name}">Schedule Interview</button>
                </div>
            `;
            freelancerGrid.appendChild(card);
        });
        noResultsMessage.style.display = 'none';
    } else {
        noResultsMessage.style.display = 'block';
    }

    // Event listener for action buttons (mock functionality for now)
    freelancerGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('schedule-interview-btn')) {
            const freelancerId = event.target.dataset.freelancerId;
            const freelancerName = event.target.dataset.freelancerName;
            alert(`Scheduling interview with ${freelancerName} (ID: ${freelancerId}) - Mock Functionality`);
            // In a real application, this would redirect to a scheduling page or open a modal.
        }
    });
}); 