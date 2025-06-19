document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const content = document.getElementById('dashboard-content');
    const sectionMap = {
        'post-job': 'client_post_job.html',
        'job-listings': 'client_job_listings.html',
        'matched-talent': 'client_matched_talent.html',
        'interviews': 'client_interviews.html',
        'my-developers': 'client_my_developers.html',
        'project-tracker': 'client_project_tracker.html',
        'messages': 'client_messages.html',
        'payments': 'client_payments.html',
        'pair-recommendation': 'client_pair_recommendation.html',
        'pricing-demo': 'client_pricing_demo.html'
    };

    function loadSection(hash) {
        const section = hash.replace('#', '');
        const file = sectionMap[section] || sectionMap['post-job'];
        fetch(file)
            .then(res => res.text())
            .then(html => {
                content.innerHTML = html;
                // Dynamically load section CSS
                const existing = document.getElementById('section-css');
                if (existing) existing.remove();
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.id = 'section-css';
                link.href = file.replace('.html', '.css');
                document.head.appendChild(link);
            });
    }

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const hash = this.getAttribute('href');
            loadSection(hash);
        });
    });

    // Load default section
    loadSection('#post-job');
}); 