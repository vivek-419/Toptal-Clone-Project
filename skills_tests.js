// skills_tests.js

document.addEventListener('DOMContentLoaded', function() {
    const companyTestsGrid = document.getElementById('companyTestsGrid');
    const noCompanyTestsMessage = document.getElementById('noCompanyTestsMessage');

    // Test Modal Elements
    const testModal = document.getElementById('testModal');
    const closeTestModalBtn = document.getElementById('closeTestModal');
    const testTitle = document.getElementById('testTitle');
    const questionContainer = document.getElementById('questionContainer');
    const prevQuestionBtn = document.getElementById('prevQuestionBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const submitTestBtn = document.getElementById('submitTestBtn');
    const progressText = document.getElementById('progressText');

    let currentQuestions = [];
    let currentQuestionIndex = 0;

    // Mapping company skills to available question categories
    const skillToQuestionCategoryMap = {
        'Algorithms': ['Algorithms', 'Data Structures', 'C++', 'Java', 'Python'],
        'Data Structures': ['Data Structures', 'Algorithms', 'C++', 'Java', 'Python'],
        'Python': ['Python'],
        'Java': ['Java'],
        'C++': ['C++'],
        'System Design': ['System Design', 'Architecture'],
        'C#': ['C#'],
        '.NET': ['C#'],
        'Azure': ['Cloud Computing'],
        'SQL Server': ['SQL'],
        'REST APIs': ['Architecture'],
        'Cloud Computing': ['Architecture'],
        'React': ['JavaScript', 'TypeScript'],
        'Node.js': ['JavaScript'],
        'GraphQL': ['Architecture'],
        'Distributed Systems': ['System Design', 'Architecture'],
        'Web Performance': ['JavaScript', 'CSS'],
        'Databases': ['SQL'],
        'AWS': ['Cloud Computing', 'Architecture'],
        'Spring Boot': ['Java'],
        'Microservices': ['Architecture', 'System Design'],
        'System Architecture': ['System Design', 'Architecture'],
        'DevOps': ['Bash'],
        'Video Streaming': ['System Design', 'Architecture'],
        'Data Analytics': ['Python', 'SQL'],
        'Golang': ['Golang']
    };

    // All Technical Questions (Categorized by Technology)
    const allQuestions = {
        'HTML': [
            {
                question: "Which of the following best describes the effect of setting the contenteditable attribute to true on a nested HTML element within a shadow DOM context?",
                options: [
                    "A. It allows direct editing but only if the element is not encapsulated.",
                    "B. It disables editing due to shadow DOM encapsulation.",
                    "C. It throws an error in all browsers.",
                    "D. It allows editing and propagates to the host DOM."
                ],
                correctAnswer: "D. It allows editing and propagates to the host DOM."
            },
            {
                question: "What happens if a <form> contains multiple <input> elements with the same name attribute and the form is submitted?",
                options: [
                    "A. Only the last value is sent.",
                    "B. An array of values is sent for that name.",
                    "C. The form throws a syntax error.",
                    "D. The server receives a concatenated string of values."
                ],
                correctAnswer: "B. An array of values is sent for that name."
            },
            {
                question: "In the HTML parsing algorithm, how is the \"in head noscript\" insertion mode handled in modern browsers?",
                options: [
                    "A. Treated as raw text.",
                    "B. Switched immediately to \"in body\".",
                    "C. Parsed using \"text\" mode rules.",
                    "D. Ignored if scripting is enabled."
                ],
                correctAnswer: "D. Ignored if scripting is enabled."
            }
        ],
        'CSS': [
            {
                question: "How does the contain property in CSS affect rendering and layout computation in deeply nested component-based systems?",
                options: [
                    "A. It forces a new stacking context for animations.",
                    "B. It isolates layout and style calculations.",
                    "C. It disables cascading styles from outside containers.",
                    "D. It makes the element completely unselectable."
                ],
                correctAnswer: "B. It isolates layout and style calculations."
            },
            {
                question: "What is the effect of all: unset on a pseudo-element like ::before in terms of inheritance and initial values?",
                options: [
                    "A. Inherits from parent element.",
                    "B. Reverts to initial computed values.",
                    "C. Only resets non-inherited properties.",
                    "D. Has no effect on pseudo-elements."
                ],
                correctAnswer: "B. Reverts to initial computed values."
            },
            {
                question: "Which combination of display and contain would result in minimal layout thrashing in a virtualized rendering list?",
                options: [
                    "A. display: contents; contain: layout style;",
                    "B. display: block; contain: content;",
                    "C. display: inline-flex; contain: size paint;",
                    "D. display: grid; contain: layout;"
                ],
                correctAnswer: "C. display: inline-flex; contain: size paint;"
            }
        ],
        'JavaScript': [
            {
                question: "What will the arguments object reference inside an arrow function defined in a closure?",
                options: [
                    "A. Its own scope.",
                    "B. The global arguments.",
                    "C. The closest regular function scope.",
                    "D. It throws a ReferenceError."
                ],
                correctAnswer: "C. The closest regular function scope."
            },
            {
                question: "When using Object.defineProperty() to make a property non-enumerable but still observable via Object.keys, which behavior is expected?",
                options: [
                    "A. Property will show in Object.keys.",
                    "B. Property will not appear in for...in but will in keys().",
                    "C. It will be hidden from all iterations.",
                    "D. It will only appear in JSON.stringify() output."
                ],
                correctAnswer: "B. Property will not appear in for...in but will in keys()."
            },
            {
                question: "What is the output of this sequence:\n\n```js\nconst a = { b: 1 };  \nconst c = Object.create(a);  \nconsole.log(c.hasOwnProperty('b'));\n```",
                options: [
                    "A. true",
                    "B. false",
                    "C. undefined",
                    "D. Throws an error"
                ],
                correctAnswer: "B. false"
            }
        ],
        'Python': [
            {
                question: "In Python, what is the significance of __slots__ when defined in a class?",
                options: [
                    "A. It prevents dynamic attribute addition.",
                    "B. It makes the class iterable.",
                    "C. It disables garbage collection.",
                    "D. It automatically generates a __dict__."
                ],
                correctAnswer: "A. It prevents dynamic attribute addition."
            },
            {
                question: "What does the nonlocal keyword affect in a nested function?",
                options: [
                    "A. Accesses variables in global scope.",
                    "B. Freezes the outer variable's value.",
                    "C. Allows modifying the variable in the nearest enclosing scope.",
                    "D. Rebinds the local variable to a global one."
                ],
                correctAnswer: "C. Allows modifying the variable in the nearest enclosing scope."
            },
            {
                question: "Which method is invoked when a custom object is used in a with statement?",
                options: [
                    "A. __start__",
                    "B. __use__",
                    "C. __context__",
                    "D. __enter__"
                ],
                correctAnswer: "D. __enter__"
            }
        ],
        'Java': [
            {
                question: "What is the outcome if a method in Java throws a checked exception but is not declared in the method signature?",
                options: [
                    "A. It is silently ignored.",
                    "B. Code fails to compile.",
                    "C. JVM throws a runtime exception.",
                    "D. It becomes an unchecked exception."
                ],
                correctAnswer: "B. Code fails to compile."
            },
            {
                question: "How does Java's volatile keyword affect memory consistency in multithreaded environments?",
                options: [
                    "A. It locks the variable on every access.",
                    "B. It ensures atomic updates.",
                    "C. It prevents reordering of reads/writes.",
                    "D. It makes the variable immutable."
                ],
                correctAnswer: "C. It prevents reordering of reads/writes."
            },
            {
                question: "What will be the result of using super() after a variable initialization in a subclass constructor?",
                options: [
                    "A. The subclass compiles with a warning.",
                    "B. The program throws a runtime exception.",
                    "C. The code fails to compile.",
                    "D. It works only with abstract classes."
                ],
                correctAnswer: "C. The code fails to compile."
            }
        ],
        'C#': [
            {
                question: "What is the purpose of the 'using' statement in C#?",
                options: [
                    "A. To import namespaces.",
                    "B. To ensure proper disposal of resources.",
                    "C. To declare a global variable.",
                    "D. To define a constant."
                ],
                correctAnswer: "B. To ensure proper disposal of resources."
            },
            {
                question: "In C#, what is the difference between 'ref' and 'out' parameters?",
                options: [
                    "A. 'ref' passes by value, 'out' passes by reference.",
                    "B. 'ref' requires initialization before passing, 'out' does not.",
                    "C. 'out' requires initialization before passing, 'ref' does not.",
                    "D. They are functionally identical."
                ],
                correctAnswer: "B. 'ref' requires initialization before passing, 'out' does not."
            },
            {
                question: "Explain the concept of LINQ in C#.",
                options: [],
                type: 'subjective',
                expectedKeywords: ['Language Integrated Query', 'query data', 'various sources', 'collections', 'databases', 'XML']
            }
        ],
        'C++': [
            {
                question: "What is the effect of marking a C++ member function as virtual and final simultaneously?",
                options: [
                    "A. It prevents the function from being inherited.",
                    "B. It allows the function to be overridden only once.",
                    "C. It disables both virtual dispatch and inheritance.",
                    "D. It allows calling it from derived classes only."
                ],
                correctAnswer: "B. It allows the function to be overridden only once."
            },
            {
                question: "In C++, what is the most efficient method to pass a large struct to a function if it needs to be modified?",
                options: [
                    "A. Pass by value.",
                    "B. Pass by pointer.",
                    "C. Pass by reference.",
                    "D. Use a copy constructor."
                ],
                correctAnswer: "C. Pass by reference."
            },
            {
                question: "What does the explicit keyword prevent when used with a single-argument constructor?",
                options: [
                    "A. Overriding that constructor.",
                    "B. Automatic type conversion.",
                    "C. Using the constructor in member initializer lists.",
                    "D. Instantiating the class."
                ],
                correctAnswer: "B. Automatic type conversion."
            }
        ],
        'Rust': [
            {
                question: "What does the Rust compiler guarantee when using unsafe blocks?",
                options: [
                    "A. Memory safety is strictly enforced.",
                    "B. Compiler skips borrow checking.",
                    "C. Performance is automatically optimized.",
                    "D. Lifetimes are inferred without conflict."
                ],
                correctAnswer: "B. Compiler skips borrow checking."
            },
            {
                question: "In Rust, what is the result of using Box::leak on a value?",
                options: [
                    "A. The value is dropped at end of scope.",
                    "B. The memory becomes static for the program's life.",
                    "C. It creates a reference that cannot be dereferenced.",
                    "D. It converts the value to a mutable slice."
                ],
                correctAnswer: "B. The memory becomes static for the program's life."
            }
        ],
        'TypeScript': [
            {
                question: "What does keyof typeof return when used on an enum in TypeScript?",
                options: [
                    "A. An array of values.",
                    "B. The string literal union of keys.",
                    "C. The numeric indices.",
                    "D. A type of values only."
                ],
                correctAnswer: "B. The string literal union of keys."
            },
            {
                question: "In a TypeScript project with strictNullChecks enabled, what will be the type of typeof null?",
                options: [
                    "A. null",
                    "B. any",
                    "C. object",
                    "D. undefined"
                ],
                correctAnswer: "C. object"
            }
        ],
        'SQL': [
            {
                question: "Which SQL clause is evaluated last in the SELECT query execution order?",
                options: [
                    "A. WHERE",
                    "B. GROUP BY",
                    "C. HAVING",
                    "D. ORDER BY"
                ],
                correctAnswer: "D. ORDER BY"
            },
            {
                question: "What happens if you use GROUP BY on a column that is nullable in PostgreSQL?",
                options: [
                    "A. NULLs are grouped together.",
                    "B. NULLs are excluded from results.",
                    "C. Each NULL is treated as unique.",
                    "D. It throws an exception."
                ],
                correctAnswer: "A. NULLs are grouped together."
            }
        ],
        'C': [
            {
                question: "What happens when you dereference a pointer pointing to a deallocated memory region in C?",
                options: [
                    "A. Program compiles but crashes at runtime.",
                    "B. Undefined behavior.",
                    "C. The compiler throws an error.",
                    "D. Value becomes zero by default."
                ],
                correctAnswer: "B. Undefined behavior."
            },
            {
                question: "What is the use of the restrict keyword in C?",
                options: [
                    "A. Ensures memory is zeroed on scope exit.",
                    "B. Prevents the use of dangling pointers.",
                    "C. Optimizes pointer aliasing assumptions.",
                    "D. Disables pointer arithmetic."
                ],
                correctAnswer: "C. Optimizes pointer aliasing assumptions."
            }
        ],
        'Bash': [
            {
                question: "What is the effect of using set -euo pipefail in a bash script?",
                options: [
                    "A. The script will ignore unset variables.",
                    "B. The script stops only on segmentation faults.",
                    "C. The script fails on any error or unset variable.",
                    "D. Enables background process handling."
                ],
                correctAnswer: "C. The script fails on any error or unset variable."
            },
            {
                question: "How does a subshell differ from a sourced script in Bash?",
                options: [
                    "A. A subshell can access parent script variables.",
                    "B. A sourced script runs in a child process.",
                    "C. A subshell has no access to functions.",
                    "D. A sourced script affects the parent shell's state."
                ],
                correctAnswer: "D. A sourced script affects the parent shell's state."
            }
        ],
        'PHP': [
            {
                question: "What happens if you use a reference variable as a function parameter and change its value inside the function in PHP?",
                options: [
                    "A. Only the local variable changes.",
                    "B. The original variable is updated.",
                    "C. It throws a fatal error.",
                    "D. It creates a copy of the reference."
                ],
                correctAnswer: "B. The original variable is updated."
            },
            {
                question: "In PHP, what's the difference between == and === when comparing two strings?",
                options: [
                    "A. They are identical.",
                    "B. === checks types, == does not.",
                    "C. == is slower than ===.",
                    "D. === converts strings before comparing."
                ],
                correctAnswer: "B. === checks types, == does not."
            }
        ],
        'Golang': [
            {
                question: "What is a goroutine in Go?",
                options: [
                    "A. A heavyweight thread.",
                    "B. A lightweight concurrent execution unit.",
                    "C. A type of function in Go.",
                    "D. A Go package manager."
                ],
                correctAnswer: "B. A lightweight concurrent execution unit."
            },
            {
                question: "Explain the concept of interfaces in Go.",
                options: [],
                type: 'subjective',
                expectedKeywords: ['collection of method signatures', 'implicitly satisfied', 'duck typing', 'polymorphism']
            }
        ]
    };

    // Add subjective questions to the allQuestions object
    allQuestions['System Design'] = [
        {
            type: 'subjective',
            question: "Design a scalable real-time chat application that can handle millions of concurrent users. Consider aspects like message delivery, presence, and offline support.",
            expectedKeywords: ['WebSocket', 'Redis', 'Message Queue', 'Load Balancer', 'Database Sharding']
        },
        {
            type: 'subjective',
            question: "Explain how you would design a distributed caching system that ensures high availability and consistency across multiple data centers.",
            expectedKeywords: ['Consistent Hashing', 'Cache Invalidation', 'Replication', 'CAP Theorem', 'Eventual Consistency']
        }
    ];

    allQuestions['Architecture'] = [
        {
            type: 'subjective',
            question: "Describe your approach to designing a microservices architecture for an e-commerce platform. Include considerations for service boundaries, data consistency, and deployment strategies.",
            expectedKeywords: ['Domain-Driven Design', 'Event Sourcing', 'Circuit Breaker', 'API Gateway', 'Service Mesh']
        },
        {
            type: 'subjective',
            question: "How would you design a system to handle real-time analytics for a social media platform? Consider data ingestion, processing, and storage requirements.",
            expectedKeywords: ['Stream Processing', 'Time Series Database', 'Lambda Architecture', 'Data Pipeline', 'Real-time Aggregation']
        }
    ];

    // Helper function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function loadQuestion() {
        if (currentQuestions.length === 0) {
            questionContainer.innerHTML = '<p>No questions available for this test type.</p>';
            prevQuestionBtn.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
            submitTestBtn.style.display = 'none';
            progressText.textContent = '';
            return;
        }

        const questionData = currentQuestions[currentQuestionIndex];
        
        if (questionData.type === 'subjective') {
            questionContainer.innerHTML = `
                <div class="question-number">Question ${currentQuestionIndex + 1} of ${currentQuestions.length}</div>
                <div class="subjective-question">
                    <p class="question-text">${questionData.question}</p>
                    <textarea placeholder="Type your answer here..." class="subjective-answer"></textarea>
                </div>
            `;
        } else {
            questionContainer.innerHTML = `
                <div class="question-number">Question ${currentQuestionIndex + 1} of ${currentQuestions.length}</div>
                <p class="question-text">${questionData.question.replace(/\n/g, '<br>')}</p>
                <div class="options-container">
                    ${questionData.options.map((option, index) => `
                        <label class="option-label">
                            <input type="radio" name="currentQuestion" value="${option}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            `;
        }
        updateNavigationButtons();
        updateProgressText();
    }

    function updateNavigationButtons() {
        prevQuestionBtn.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
        nextQuestionBtn.style.display = currentQuestionIndex < currentQuestions.length - 1 ? 'inline-block' : 'none';
        submitTestBtn.style.display = 'inline-block';
    }

    function updateProgressText() {
        progressText.textContent = `Question ${currentQuestionIndex + 1} / ${currentQuestions.length}`;
    }

    // Event listener for test buttons (mock functionality for now)
    companyTestsGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('test-link-btn')) {
            event.preventDefault();
            const testType = event.target.dataset.testType;
            const testName = event.target.dataset.testName;
            const companyName = event.target.closest('.company-test-card').querySelector('h3').textContent;

            console.log('Clicked Test:', testName, '(', testType, ') for Company:', companyName);

            let questionsToLoad = [];

            const company = companyTests.find(c => c.name === companyName);
            if (company) {
                console.log('Company found:', company.name, 'Skills:', company.skills);
                // Collect all skills from the company that have corresponding questions
                company.skills.forEach(skill => {
                    if (skillToQuestionCategoryMap[skill]) {
                        console.log('Mapping skill ', skill, ' to categories:', skillToQuestionCategoryMap[skill]);
                        skillToQuestionCategoryMap[skill].forEach(category => {
                            if (allQuestions[category]) {
                                const filteredQuestions = allQuestions[category].filter(q => 
                                    (testType === 'MCQ' && q.type !== 'subjective') || 
                                    (testType === 'Subjective' && q.type === 'subjective')
                                );
                                questionsToLoad = questionsToLoad.concat(filteredQuestions);
                                console.log(`Loaded ${filteredQuestions.length} questions from category ${category} for ${testType}.`);
                            }
                        });
                    } else {
                        console.log('No direct category mapping found for skill:', skill);
                    }
                });

                // Fallback for general tests if specific skill questions are few or absent
                if (questionsToLoad.length < 5 && testType === 'MCQ') { // If less than 5 MCQ questions, add some general ones
                    console.log('Adding general MCQ fallback questions.');
                    questionsToLoad = questionsToLoad.concat(shuffleArray([
                        ...allQuestions['HTML'],
                        ...allQuestions['CSS'],
                        ...allQuestions['JavaScript'],
                        ...allQuestions['Python'],
                        ...allQuestions['Java'],
                        ...allQuestions['C++']
                    ]).slice(0, 5 - questionsToLoad.length));
                } else if (questionsToLoad.length < 1 && testType === 'Subjective') { // If no subjective questions, add general ones
                    console.log('Adding general Subjective fallback questions.');
                    questionsToLoad = questionsToLoad.concat(shuffleArray([
                        ...(allQuestions['System Design'] || []).filter(q => q.type === 'subjective'),
                        ...(allQuestions['Architecture'] || []).filter(q => q.type === 'subjective')
                    ]).slice(0, 1));
                }
                currentQuestions = shuffleArray(questionsToLoad);
                console.log('Final currentQuestions array length:', currentQuestions.length);

            } else {
                console.log('Company not found for test click:', companyName);
                // If company not found or no skills, provide a general set based on test type
                if (testType === 'MCQ') {
                    currentQuestions = shuffleArray([
                        ...allQuestions['HTML'],
                        ...allQuestions['CSS'],
                        ...allQuestions['JavaScript'],
                        ...allQuestions['Python'],
                        ...allQuestions['Java'],
                        ...allQuestions['C++']
                    ]).slice(0, 10); // Limit to 10 general questions
                } else if (testType === 'Subjective') {
                    currentQuestions = shuffleArray([
                        ...(allQuestions['System Design'] || []).filter(q => q.type === 'subjective'),
                        ...(allQuestions['Architecture'] || []).filter(q => q.type === 'subjective')
                    ]).slice(0, 2); // Limit to 2 general subjective questions
                } else {
                    currentQuestions = [];
                }
                console.log('Fallback currentQuestions array length (company not found):', currentQuestions.length);
            }
            
            // Set test title and show modal
            testTitle.textContent = `${companyName} - ${testName}`;
            testModal.style.display = 'flex'; // Use flex to center the modal
            document.body.classList.add('modal-open'); // Add class to body to prevent scrolling

            currentQuestionIndex = 0;
            loadQuestion();
        }
    });

    // Add scoring functionality
    let userAnswers = [];

    function collectAnswer() {
        const questionData = currentQuestions[currentQuestionIndex];
        const answerElement = questionData.type === 'subjective' 
            ? document.querySelector('.subjective-answer')
            : document.querySelector('input[name="currentQuestion"]:checked');
        
        if (answerElement) {
            userAnswers[currentQuestionIndex] = {
                question: questionData.question,
                answer: answerElement.value || answerElement.textContent,
                type: questionData.type,
                correctAnswer: questionData.correctAnswer,
                expectedKeywords: questionData.expectedKeywords
            };
        }
    }

    function calculateScore() {
        let score = 0;
        let totalQuestions = currentQuestions.length;
        let correctAnswers = 0;
        let subjectiveAnswers = 0;
        let subjectiveScore = 0;

        userAnswers.forEach((answer, index) => {
            if (answer.type === 'subjective') {
                subjectiveAnswers++;
                // Simple keyword matching for subjective questions
                const keywords = answer.expectedKeywords || [];
                const userAnswer = answer.answer.toLowerCase();
                const matchedKeywords = keywords.filter(keyword => 
                    userAnswer.includes(keyword.toLowerCase())
                );
                subjectiveScore += (matchedKeywords.length / keywords.length) * 100;
            } else if (answer.answer === answer.correctAnswer) {
                correctAnswers++;
                score += 100;
            }
        });

        const objectiveScore = (correctAnswers / (totalQuestions - subjectiveAnswers)) * 100;
        const finalScore = subjectiveAnswers > 0 
            ? (objectiveScore * 0.7 + (subjectiveScore / subjectiveAnswers) * 0.3)
            : objectiveScore;

        return {
            score: Math.round(finalScore),
            correctAnswers,
            totalQuestions,
            subjectiveAnswers,
            objectiveScore: Math.round(objectiveScore),
            subjectiveScore: Math.round(subjectiveScore / subjectiveAnswers) || 0
        };
    }

    function showTestResults() {
        const results = calculateScore();
        questionContainer.innerHTML = `
            <div class="test-results">
                <h3>Test Results</h3>
                <div class="score-display">${results.score}%</div>
                <div class="score-breakdown">
                    <div class="score-item">
                        <h4>Objective Questions</h4>
                        <p>${results.correctAnswers} / ${results.totalQuestions - results.subjectiveAnswers} correct</p>
                        <p>Score: ${results.objectiveScore}%</p>
                    </div>
                    ${results.subjectiveAnswers > 0 ? `
                        <div class="score-item">
                            <h4>Subjective Questions</h4>
                            <p>${results.subjectiveAnswers} questions</p>
                            <p>Score: ${results.subjectiveScore}%</p>
                        </div>
                    ` : ''}
                </div>
                <div class="correct-answers">
                    <h4>Question Review</h4>
                    ${userAnswers.map((answer, index) => `
                        <div class="answer-item ${answer.type === 'subjective' ? '' : (answer.answer === answer.correctAnswer ? 'correct' : 'incorrect')}">
                            <div class="question">${index + 1}. ${answer.question}</div>
                            ${answer.type === 'subjective' ? `
                                <div class="your-answer">Your Answer: ${answer.answer}</div>
                                <div class="correct-answer">Expected Keywords: ${answer.expectedKeywords.join(', ')}</div>
                            ` : `
                                <div class="your-answer ${answer.answer === answer.correctAnswer ? '' : 'incorrect'}">
                                    Your Answer: ${answer.answer}
                                </div>
                                ${answer.answer !== answer.correctAnswer ? `
                                    <div class="correct-answer">Correct Answer: ${answer.correctAnswer}</div>
                                ` : ''}
                            `}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        prevQuestionBtn.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
        submitTestBtn.style.display = 'none';
    }

    // Update the submit button click handler
    submitTestBtn.addEventListener('click', () => {
        collectAnswer(); // Collect the last answer
        showTestResults();
    });

    // Update navigation to collect answers
    nextQuestionBtn.addEventListener('click', () => {
        collectAnswer();
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });

    prevQuestionBtn.addEventListener('click', () => {
        collectAnswer();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    closeTestModalBtn.addEventListener('click', () => {
        testModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        currentQuestions = [];
        currentQuestionIndex = 0;
    });

    // Close modal if clicked outside (only for the modal content, not the whole modal backdrop)
    // This needs to be on the modal element itself, not a global listener, to distinguish from other clicks
    testModal.addEventListener('click', function(event) {
        if (event.target === testModal) {
            testModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            currentQuestions = [];
            currentQuestionIndex = 0;
        }
    });

    const companyTests = [
        {
            id: 1,
            name: 'Google',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png',
            criteria: 'Strong problem-solving skills, expertise in data structures and algorithms, collaborative mindset.',
            skills: ['Algorithms', 'Data Structures', 'Python', 'Java', 'C++', 'System Design'],
            tests: [
                { type: 'MCQ', name: 'Software Engineering Fundamentals', duration: '60 min' },
                { type: 'Subjective', name: 'Advanced System Design Challenge', duration: '90 min' }
            ]
        },
        {
            id: 2,
            name: 'Microsoft',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png',
            criteria: 'Proficiency in cloud technologies, strong software development lifecycle understanding, innovation.',
            skills: ['C#', '.NET', 'Azure', 'SQL Server', 'REST APIs', 'Cloud Computing', 'System Design', 'Architecture'],
            tests: [
                { type: 'MCQ', name: 'Azure Developer Assessment', duration: '45 min' },
                { type: 'Subjective', name: 'Backend Services Architecture', duration: '75 min' },
                { type: 'Subjective', name: 'System Design Challenge', duration: '90 min' }
            ]
        },
        {
            id: 3,
            name: 'Meta',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png',
            criteria: 'Experience with large-scale distributed systems, passion for building engaging user experiences, open-source contributions.',
            skills: ['React', 'Node.js', 'GraphQL', 'Distributed Systems', 'Web Performance', 'Databases', 'System Design', 'Architecture'],
            tests: [
                { type: 'MCQ', name: 'Frontend Development Quiz', duration: '50 min' },
                { type: 'Subjective', name: 'Scalable API Design', duration: '80 min' },
                { type: 'Subjective', name: 'System Design Challenge', duration: '90 min' }
            ]
        },
        {
            id: 4,
            name: 'Amazon',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
            criteria: 'Customer-obsessed, strong analytical skills, experience with highly available and scalable services.',
            skills: ['AWS', 'Java', 'Spring Boot', 'Microservices', 'System Architecture', 'DevOps', 'System Design', 'Architecture'],
            tests: [
                { type: 'MCQ', name: 'AWS Cloud Practitioner Exam', duration: '60 min' },
                { type: 'Subjective', name: 'E-commerce System Scalability', duration: '90 min' },
                { type: 'Subjective', name: 'System Design Challenge', duration: '90 min' }
            ]
        },
        {
            id: 5,
            name: 'Netflix',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png',
            criteria: 'High ownership, deep understanding of streaming technologies, proactive problem-solving.',
            skills: ['Node.js', 'React', 'Video Streaming', 'Distributed Systems', 'Data Analytics', 'Golang', 'System Design', 'Architecture'],
            tests: [
                { type: 'MCQ', name: 'Streaming Tech Quiz', duration: '40 min' },
                { type: 'Subjective', name: 'Content Delivery Network Design', duration: '70 min' },
                { type: 'Subjective', name: 'System Design Challenge', duration: '90 min' }
            ]
        }
    ];

    if (companyTests.length > 0) {
        companyTests.forEach(company => {
            const card = document.createElement('div');
            card.classList.add('company-test-card');

            const skillsHtml = company.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
            const testsHtml = company.tests.map(test => 
                `<a href="#" class="test-link-btn" data-test-type="${test.type}" data-test-name="${test.name}" data-company-name="${company.name}">
                    ${test.name} (${test.duration}) - ${test.type}
                </a>`
            ).join('');

            card.innerHTML = `
                <div class="company-header">
                    <img src="${company.logo}" alt="${company.name} Logo" class="company-logo">
                    <div class="company-info">
                        <h3>${company.name}</h3>
                        <p>Hiring Criteria: ${company.criteria}</p>
                    </div>
                </div>
                <div class="required-skills">
                    <strong>Required Skills:</strong>
                    <div class="skills-list">${skillsHtml}</div>
                </div>
                <div class="tests-section">
                    <h4>Available Tests:</h4>
                    ${testsHtml}
                </div>
            `;
            companyTestsGrid.appendChild(card);
        });
        noCompanyTestsMessage.style.display = 'none';
    } else {
        noCompanyTestsMessage.style.display = 'block';
    }
}); 