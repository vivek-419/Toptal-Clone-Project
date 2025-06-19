// messages.js

document.addEventListener('DOMContentLoaded', function() {
    const messagesGrid = document.getElementById('messagesGrid');
    const noMessagesMessage = document.getElementById('noMessagesMessage');

    const messages = [
        {
            id: 1,
            type: 'posting',
            company: 'Google',
            title: 'New Project: AI-Powered Search Engine',
            content: 'Google is looking for experienced AI/ML engineers to join a groundbreaking project to redefine search technology. Strong background in natural language processing and large-scale data systems required.',
            date: '2023-10-26',
            tags: ['AI', 'Machine Learning', 'Natural Language Processing', 'Big Data'],
            icon: 'fas fa-brain'
        },
        {
            id: 2,
            type: 'vacancy',
            company: 'Microsoft',
            title: 'Senior Cloud Architect Vacancy',
            content: 'Microsoft Azure team has an immediate opening for a Senior Cloud Architect. Ideal candidates will have extensive experience with Azure services, hybrid cloud solutions, and enterprise architecture.',
            date: '2023-10-25',
            tags: ['Cloud', 'Azure', 'Architecture', 'DevOps'],
            icon: 'fas fa-cloud'
        },
        {
            id: 3,
            type: 'opportunity',
            company: 'Meta',
            title: 'Invitation: Metaverse Development Workshop',
            content: 'You\'re invited to an exclusive workshop on advanced Metaverse development techniques. Learn about cutting-edge VR/AR technologies and connect with Meta\'s lead engineers.',
            date: '2023-10-24',
            tags: ['Metaverse', 'VR', 'AR', 'Frontend'],
            icon: 'fas fa-vr-cardboard'
        },
        {
            id: 4,
            type: 'posting',
            company: 'Amazon',
            title: 'New Hiring Round: Backend Engineers',
            content: 'Amazon Web Services (AWS) is expanding its teams and is actively hiring Backend Engineers. Focus areas include highly scalable distributed systems and microservices.',
            date: '2023-10-23',
            tags: ['Backend', 'AWS', 'Microservices', 'Distributed Systems'],
            icon: 'fas fa-server'
        },
        {
            id: 5,
            type: 'vacancy',
            company: 'Netflix',
            title: 'Lead UI/UX Designer Opening',
            content: 'Netflix is seeking a creative and experienced Lead UI/UX Designer to innovate on our streaming platform\'s user experience. Strong portfolio demonstrating user-centered design principles required.',
            date: '2023-10-22',
            tags: ['UI/UX', 'Design', 'Frontend', 'Streaming'],
            icon: 'fas fa-paint-brush'
        },
        {
            id: 6,
            type: 'opportunity',
            company: 'Toptal',
            title: 'Webinar: Mastering Remote Work Productivity',
            content: 'Join our expert-led webinar on strategies for maximizing productivity and collaboration in a remote work environment. Tips and tricks for freelancers and remote teams.',
            date: '2023-10-21',
            tags: ['Webinar', 'Remote Work', 'Productivity', 'Freelancing'],
            icon: 'fas fa-laptop-house'
        },
        // Additional dummy messages as requested in a previous prompt
        {
            id: 7,
            type: 'posting',
            company: 'Salesforce',
            title: 'Salesforce CRM Developer Needed',
            content: 'Salesforce is seeking a skilled CRM Developer with expertise in Apex, Visualforce, and Lightning Web Components. Join our team to build scalable solutions for enterprise clients.',
            date: '2023-10-20',
            tags: ['Salesforce', 'CRM', 'Apex', 'LWC', 'Development'],
            icon: 'fas fa-cloud-upload-alt'
        },
        {
            id: 8,
            type: 'vacancy',
            company: 'IBM',
            title: 'Data Scientist Vacancy - AI Research',
            content: 'IBM Research has an open position for a Data Scientist specializing in AI. Candidates should have a strong background in machine learning, statistical modeling, and data analysis.',
            date: '2023-10-19',
            tags: ['Data Science', 'AI', 'Machine Learning', 'Research'],
            icon: 'fas fa-database'
        },
        {
            id: 9,
            type: 'opportunity',
            company: 'Adobe',
            title: 'Workshop: Creative Cloud Integration',
            content: 'Discover how to seamlessly integrate your custom applications with Adobe Creative Cloud APIs. An exclusive workshop for developers and creative technologists.',
            date: '2023-10-18',
            tags: ['Adobe', 'API', 'Creative Cloud', 'Integration'],
            icon: 'fas fa-lightbulb'
        },
        {
            id: 10,
            type: 'posting',
            company: 'Apple',
            title: 'iOS Developer for Health Innovations',
            content: 'Apple is hiring iOS Developers to work on the next generation of health and wellness applications. Strong Swift and Objective-C skills required, experience with HealthKit a plus.',
            date: '2023-10-17',
            tags: ['iOS', 'Mobile Development', 'Swift', 'HealthKit'],
            icon: 'fab fa-apple'
        }
    ];

    if (messages.length > 0) {
        messages.forEach(message => {
            const card = document.createElement('div');
            card.classList.add('message-card', message.type); // Add type class for specific styling

            const tagsHtml = message.tags.map(tag => `<span class="message-tag">${tag}</span>`).join('');
            const actionsHtml = `
                <button class="btn btn-primary btn-small view-details-btn" data-message-id="${message.id}">View Details</button>
                <button class="btn btn-secondary btn-small dismiss-btn" data-message-id="${message.id}">Dismiss</button>
            `;

            card.innerHTML = `
                <div class="message-header">
                    <span class="message-icon"><i class="${message.icon}"></i></span>
                    <h3>${message.title}</h3>
                    <span class="message-meta">${message.company} - ${message.date}</span>
                </div>
                <div class="message-content">
                    <p>${message.content}</p>
                </div>
                <div class="message-tags">
                    ${tagsHtml}
                </div>
                <div class="message-actions">
                    ${actionsHtml}
                </div>
            `;
            messagesGrid.appendChild(card);
        });
        noMessagesMessage.style.display = 'none';
    } else {
        noMessagesMessage.style.display = 'block';
    }

    // Event listeners for action buttons (mock functionality for now)
    messagesGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('view-details-btn')) {
            const messageId = event.target.dataset.messageId;
            if (messageId === '1') {
                // Open the AI project details page
                window.location.href = 'ai_project_details.html';
            } else {
            alert(`Viewing details for message ID: ${messageId} (Mock Functionality)`);
            }
        } else if (event.target.classList.contains('dismiss-btn')) {
            const messageId = event.target.dataset.messageId;
            if (confirm(`Are you sure you want to dismiss message ID: ${messageId}?`)) {
                event.target.closest('.message-card').remove();
                // In a real application, you would remove from data source as well
                alert(`Message ID: ${messageId} dismissed. (Mock Functionality)`);
            }
        }
    });
}); 