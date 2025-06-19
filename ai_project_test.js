// ai_project_test.js

document.addEventListener('DOMContentLoaded', function() {
    const startTestBtn = document.getElementById('startTestBtn');
    const testModal = document.getElementById('testModal');
    const closeTestModal = document.getElementById('closeTestModal');
    const questionContainer = document.getElementById('questionContainer');
    const prevQuestionBtn = document.getElementById('prevQuestionBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const submitTestBtn = document.getElementById('submitTestBtn');
    const progressText = document.getElementById('progressText');

    // Example test questions
    const questions = [
        {
            question: 'What is the primary goal of the AI-Powered Search Engine project?',
            options: [
                'To improve Google Ads targeting',
                'To redefine search technology using AI/ML',
                'To build a new social network',
                'To optimize cloud storage costs'
            ],
            answer: 1
        },
        {
            question: 'Which skill is most important for this project?',
            options: [
                'UI/UX Design',
                'Natural Language Processing',
                'Mobile App Development',
                'Blockchain'
            ],
            answer: 1
        },
        {
            question: 'Which company is running this project?',
            options: [
                'Meta',
                'Amazon',
                'Google',
                'Netflix'
            ],
            answer: 2
        }
    ];

    let currentQuestion = 0;
    let userAnswers = new Array(questions.length).fill(null);

    function showQuestion(index) {
        const q = questions[index];
        let html = `<h3>${q.question}</h3><ul class="test-options">`;
        q.options.forEach((opt, i) => {
            html += `<li><label><input type="radio" name="option" value="${i}" ${userAnswers[index] === i ? 'checked' : ''}> ${opt}</label></li>`;
        });
        html += '</ul>';
        questionContainer.innerHTML = html;
        progressText.textContent = `Question ${index + 1} of ${questions.length}`;
        prevQuestionBtn.style.display = index === 0 ? 'none' : '';
        nextQuestionBtn.style.display = index === questions.length - 1 ? 'none' : '';
        submitTestBtn.style.display = index === questions.length - 1 ? '' : 'none';
    }

    function openModal() {
        testModal.style.display = 'block';
        showQuestion(0);
    }
    function closeModal() {
        testModal.style.display = 'none';
        currentQuestion = 0;
        userAnswers = new Array(questions.length).fill(null);
    }

    startTestBtn.addEventListener('click', openModal);
    closeTestModal.addEventListener('click', closeModal);

    prevQuestionBtn.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });
    nextQuestionBtn.addEventListener('click', function() {
        const selected = document.querySelector('input[name="option"]:checked');
        if (selected) {
            userAnswers[currentQuestion] = parseInt(selected.value);
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            alert('Please select an option.');
        }
    });
    submitTestBtn.addEventListener('click', function() {
        const selected = document.querySelector('input[name="option"]:checked');
        if (selected) {
            userAnswers[currentQuestion] = parseInt(selected.value);
            let score = 0;
            for (let i = 0; i < questions.length; i++) {
                if (userAnswers[i] === questions[i].answer) score++;
            }
            questionContainer.innerHTML = `<h3>Test Complete!</h3><p>Your score: ${score} / ${questions.length}</p>`;
            prevQuestionBtn.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
            submitTestBtn.style.display = 'none';
            progressText.textContent = '';
        } else {
            alert('Please select an option.');
        }
    });

    // Handle option selection
    questionContainer.addEventListener('change', function(e) {
        if (e.target.name === 'option') {
            userAnswers[currentQuestion] = parseInt(e.target.value);
        }
    });

    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target === testModal) {
            closeModal();
        }
    };
}); 