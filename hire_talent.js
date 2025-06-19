// hire_talent.js

document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.hire-talent-step');
    const headerLogosContainer = document.querySelector('.trusted-companies');
    const progressBar = document.getElementById('progressBar');
    const backArrow = document.querySelector('.back-arrow');

    let currentStep = 1;
    let selectedData = {}; // To store selected values from each step
    const totalSteps = 8; // Total number of steps

    const companyLogos = {
        1: [
            "ABInBev", "Los Angeles Times", "ClassPass", "Duolingo", "DoorDash", "Kohler"
        ],
        2: [
            "Okta", "Deckers", "Hearst", "Zoetis", "ABInBev", "Los Angeles Times"
        ],
        3: [
            "Bridgestone", "Priceline", "Okta", "Deckers", "Hearst", "Zoetis"
        ],
        4: [
            "Kraft Heinz", "Shiseido", "Bridgestone", "Priceline", "Okta", "Deckers", "Hearst"
        ],
        5: [
            "Kraft Heinz", "Shiseido", "Bridgestone", "Priceline", "Okta", "Deckers"
        ],
        6: [
            "Hearst", "Zoetis", "ABInBev", "Los Angeles Times", "ClassPass", "Duolingo"
        ],
        7: [
            "Okta", "Deckers", "Hearst", "Zoetis", "ABInBev", "Los Angeles Times"
        ],
        8: [
            "Bridgestone", "Priceline", "Okta", "Deckers", "Hearst", "Zoetis"
        ]
    };

    function updateHeaderLogos(step) {
        headerLogosContainer.innerHTML = ''; // Clear existing logos
        const logos = companyLogos[step] || companyLogos[1]; // Default to step 1 logos if not found
        logos.forEach(name => {
            const span = document.createElement('span');
            span.textContent = name;
            span.classList.add('company-name');
            headerLogosContainer.appendChild(span);
        });
    }

    function updateProgressBar() {
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Function to show a specific step
    function showStep(stepNumber) {
        steps.forEach(step => {
            if (parseInt(step.id.replace('step-', '')) === stepNumber) {
                step.classList.add('active');
                currentStep = stepNumber;
            } else {
                step.classList.remove('active');
            }
        });
        updateHeaderLogos(currentStep); // Use currentStep instead of stepNumber for logos to avoid issues with back button
        updateProgressBar();

        // Show/hide back arrow based on step number
        if (currentStep > 1) {
            backArrow.style.display = 'inline-block';
        } else {
            backArrow.style.display = 'none';
        }

        // Specific logic for Step 6 (Skills Selection)
        if (currentStep === 6) {
            setupSkillSelection();
        } else if (currentStep === 8) {
            setupContactFormValidation();
        }
    }

    // Event listeners for option cards (common for steps 1-5, 7)
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove 'selected' class from all cards in the current step
            document.querySelectorAll(`#step-${currentStep} .option-card`).forEach(c => c.classList.remove('selected'));
            // Add 'selected' class to the clicked card
            this.classList.add('selected');

            const nextStep = this.dataset.nextStep;
            const selectedValue = this.dataset.value;

            if (nextStep) {
                selectedData[`step${currentStep}`] = selectedValue; // Store selected value
                showStep(parseInt(nextStep));
                console.log('Selected Data:', selectedData);
            }
        });
    });

    // Event listeners for skip links
    document.querySelectorAll('.skip-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const nextStep = this.dataset.nextStep;
            if (nextStep) {
                // Store null or empty for skipped steps if necessary
                selectedData[`step${currentStep}`] = 'skipped';
                showStep(parseInt(nextStep));
                console.log('Selected Data (Skipped):', selectedData);
            }
        });
    });

    // Back button functionality
    if (backArrow) {
        backArrow.addEventListener('click', function() {
            if (currentStep > 1) {
                // Ensure all relevant elements from the current step are reset/unselected if necessary
                // For example, if Step 6 was active and you go back, clear selected skills.
                if (currentStep === 6) {
                    selectedSkills = [];
                }
                showStep(currentStep - 1);
            }
        });
    }

    // --- Step 6: Skills Selection Logic ---
    let selectedSkills = []; // Stores skills selected in Step 6

    function updateSkillInput() {
        console.log('updateSkillInput called. Current selectedSkills:', selectedSkills);
        const skillInput = document.getElementById('skillInput');
        const selectedSkillsContainer = document.getElementById('selectedSkills');
        const continueBtnStep6 = document.getElementById('continueBtnStep6');

        console.log('Clearing selectedSkillsContainer. InnerHTML before:', selectedSkillsContainer.innerHTML);
        selectedSkillsContainer.innerHTML = ''; // Clear existing pills
        console.log('InnerHTML after clearing:', selectedSkillsContainer.innerHTML);

        if (selectedSkills.length > 0) {
            skillInput.placeholder = '';
            selectedSkills.forEach(skill => {
                const skillPill = document.createElement('span');
                skillPill.classList.add('selected-skill-pill');
                skillPill.innerHTML = `${skill} <button class="remove-skill" data-skill="${skill}">&times;</button>`;
                selectedSkillsContainer.appendChild(skillPill);
                console.log('Added skill pill:', skill);
            });
            continueBtnStep6.disabled = false;
        } else {
            skillInput.placeholder = "Pick as many or as few as you'd like.";
            continueBtnStep6.disabled = true;
        }

        // Add event listeners for new remove buttons
        document.querySelectorAll('.remove-skill').forEach(btn => {
            btn.addEventListener('click', function() {
                const skillToRemove = this.dataset.skill;
                console.log('Attempting to remove skill:', skillToRemove);
                selectedSkills = selectedSkills.filter(s => s !== skillToRemove);
                updateSkillInput();
            });
        });

        // Update selectedData for step 6
        selectedData['step6'] = selectedSkills;
        console.log('Selected Data (Step 6):', selectedData['step6']);
    }

    function setupSkillSelection() {
        const skillPills = document.querySelectorAll('.skill-pill');
        const skillInput = document.getElementById('skillInput');
        const continueBtnStep6 = document.getElementById('continueBtnStep6');

        // Ensure event listeners are only added once if setupSkillSelection is called multiple times
        // (e.g., if navigating back and forth)
        skillPills.forEach(pill => {
            // Remove existing listener to prevent duplicates
            const oldListener = pill.dataset.listener;
            if (oldListener) {
                pill.removeEventListener('click', window[oldListener]);
            }
            const newListener = function() {
                const skill = this.dataset.skill;
                console.log('Popular skill pill clicked:', skill);
                if (!selectedSkills.includes(skill)) {
                    selectedSkills.push(skill);
                    console.log('Skill added to selectedSkills:', skill, 'New selectedSkills:', selectedSkills);
                    updateSkillInput();
                } else {
                    console.log('Skill already selected:', skill);
                }
            };
            pill.addEventListener('click', newListener);
            pill.dataset.listener = newListener.name || 'anon'; // Store reference to remove later
        });

        skillInput.removeEventListener('keypress', window.skillInputKeypressListener); // Remove old listener
        const newKeypressListener = function(e) {
            if (e.key === 'Enter' && skillInput.value.trim() !== '') {
                const skill = skillInput.value.trim();
                console.log('Skill input Enter pressed. Skill:', skill);
                if (!selectedSkills.includes(skill)) {
                    selectedSkills.push(skill);
                    console.log('Skill added from input to selectedSkills:', skill, 'New selectedSkills:', selectedSkills);
                    updateSkillInput();
                    skillInput.value = ''; // Clear input after adding
                } else {
                    console.log('Skill from input already selected:', skill);
                }
            }
        };
        skillInput.addEventListener('keypress', newKeypressListener);
        window.skillInputKeypressListener = newKeypressListener;

        continueBtnStep6.removeEventListener('click', window.continueBtnStep6Listener); // Remove old listener
        const newContinueListener = function() {
            if (!this.disabled) {
                console.log('Continue button (Step 6) clicked.');
                showStep(7);
            }
        };
        continueBtnStep6.addEventListener('click', newContinueListener);
        window.continueBtnStep6Listener = newContinueListener;

        // Initial skill input on step load
        updateSkillInput();
    }

    // --- Step 8: Contact Form Validation Logic ---
    function setupContactFormValidation() {
        const contactForm = document.getElementById('contactForm');
        const emailInput = document.getElementById('email');
        const companyNameInput = document.getElementById('companyName');
        const contactNameInput = document.getElementById('contactName');
        const connectTalentBtn = document.getElementById('connectTalentBtn');

        function validateForm() {
            const isEmailValid = emailInput.value.trim() !== '' && emailInput.checkValidity();
            const isCompanyNameValid = companyNameInput.value.trim() !== '';
            const isContactNameValid = contactNameInput.value.trim() !== '';

            if (isEmailValid && isCompanyNameValid && isContactNameValid) {
                connectTalentBtn.disabled = false;
            } else {
                connectTalentBtn.disabled = true;
            }
        }

        // Add event listeners for input changes
        emailInput.removeEventListener('input', window.emailInputListener); // Remove old listener
        companyNameInput.removeEventListener('input', window.companyNameInputListener); // Remove old listener
        contactNameInput.removeEventListener('input', window.contactNameInputListener); // Remove old listener

        const newEmailListener = validateForm;
        emailInput.addEventListener('input', newEmailListener);
        window.emailInputListener = newEmailListener;

        const newCompanyNameListener = validateForm;
        companyNameInput.addEventListener('input', newCompanyNameListener);
        window.companyNameInputListener = newCompanyNameListener;

        const newContactNameListener = validateForm;
        contactNameInput.addEventListener('input', newContactNameListener);
        window.contactNameInputListener = newContactNameListener;

        // Handle form submission
        contactForm.removeEventListener('submit', window.contactFormSubmitListener); // Remove old listener
        const newContactFormSubmitListener = function(e) {
            e.preventDefault();
            if (!connectTalentBtn.disabled) {
                // Store selectedData in localStorage
                localStorage.setItem('hiringProcessData', JSON.stringify(selectedData));
                console.log('Final Submission Data stored in localStorage:', selectedData);

                // Redirect to the freelancers page
                window.location.href = 'freelancers.html';
            } else {
                alert('Please fill in all required contact information.');
            }
        };
        contactForm.addEventListener('submit', newContactFormSubmitListener);
        window.contactFormSubmitListener = newContactFormSubmitListener;

        // Initial validation check
        validateForm();
    }

    // Initially show Step 1 and load its logos and update progress
    showStep(1);
});