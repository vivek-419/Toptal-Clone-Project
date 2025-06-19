// interviews.js

document.addEventListener('DOMContentLoaded', function() {
    const interviewsGrid = document.getElementById('interviewsGrid');
    const noInterviewsMessage = document.getElementById('noInterviewsMessage');

    const interviews = [
        {
            id: 1,
            company: 'Google',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png',
            role: 'Senior Software Engineer',
            date: '2023-11-01',
            time: '10:00 AM PST',
            status: 'scheduled',
            platform: 'Google Meet',
            link: 'https://meet.google.com/abc-defg-hij'
        },
        {
            id: 2,
            company: 'Microsoft',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png',
            role: 'Cloud Solutions Architect',
            date: '2023-10-28',
            time: '02:00 PM EST',
            status: 'completed',
            platform: 'Microsoft Teams',
            link: '#'
        },
        {
            id: 3,
            company: 'Meta',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png',
            role: 'Frontend Developer (React)',
            date: '2023-11-05',
            time: '11:00 AM PST',
            status: 'scheduled',
            platform: 'Zoom',
            link: 'https://zoom.us/j/1234567890'
        },
        {
            id: 4,
            company: 'Amazon',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
            role: 'Backend Engineer (AWS)',
            date: '2023-10-20',
            time: '03:00 PM GMT',
            status: 'cancelled',
            platform: 'Chime',
            link: '#'
        },
        {
            id: 5,
            company: 'Netflix',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png',
            role: 'UI/UX Designer',
            date: '2023-11-10',
            time: '09:30 AM PST',
            status: 'scheduled',
            platform: 'Google Meet',
            link: 'https://meet.google.com/xyz-abcd-efg'
        }
    ];

    if (interviews.length > 0) {
        interviews.forEach(interview => {
            const card = document.createElement('div');
            card.classList.add('interview-card');

            const statusClass = interview.status;
            const actionsHtml = 
                interview.status === 'scheduled' ? 
                `
                    <a href="${interview.link}" target="_blank" class="btn btn-primary btn-small">Join Interview</a>
                    <button class="btn btn-secondary btn-small reschedule-btn" data-interview-id="${interview.id}">Reschedule</button>
                ` : 
                `
                    <button class="btn btn-secondary btn-small view-details-btn" data-interview-id="${interview.id}">View Details</button>
                `;

            card.innerHTML = `
                <div class="interview-header">
                    <img src="${interview.logo}" alt="${interview.company} Logo" class="interview-logo">
                    <div class="interview-info">
                        <h3>${interview.company}</h3>
                        <p>${interview.role}</p>
                    </div>
                    <span class="interview-status ${statusClass}">${interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}</span>
                </div>
                <div class="interview-details">
                    <p><strong>Date:</strong> ${interview.date}</p>
                    <p><strong>Time:</strong> ${interview.time}</p>
                    <p><strong>Platform:</strong> ${interview.platform}</p>
                </div>
                <div class="interview-actions">
                    ${actionsHtml}
                </div>
            `;
            interviewsGrid.appendChild(card);
        });
        noInterviewsMessage.style.display = 'none';
    } else {
        noInterviewsMessage.style.display = 'block';
    }

    // Event listeners for action buttons (mock functionality for now)
    interviewsGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('reschedule-btn')) {
            const interviewId = event.target.dataset.interviewId;
            alert(`Rescheduling interview ID: ${interviewId} (Mock Functionality)`);
        } else if (event.target.classList.contains('view-details-btn')) {
            const interviewId = event.target.dataset.interviewId;
            alert(`Viewing details for interview ID: ${interviewId} (Mock Functionality)`);
        }
    });
});

// Add meeting modal HTML to the document
const meetingModalHTML = `
    <div class="meeting-modal" id="meetingModal">
        <div class="meeting-container">
            <div class="meeting-header">
                <div class="meeting-info">
                    <h2 class="meeting-title">Interview with <span id="meetingCompany"></span></h2>
                    <div class="meeting-time" id="meetingTimer">00:00</div>
                </div>
                <div class="meeting-controls">
                    <button class="meeting-btn" id="toggleMic" title="Toggle Microphone">
                        <i class="fas fa-microphone"></i>
                    </button>
                    <button class="meeting-btn" id="toggleVideo" title="Toggle Video">
                        <i class="fas fa-video"></i>
                    </button>
                    <button class="meeting-btn" id="toggleChat" title="Toggle Chat">
                        <i class="fas fa-comments"></i>
                    </button>
                    <button class="meeting-btn end-call" id="endCall" title="End Call">
                        <i class="fas fa-phone-slash"></i>
                    </button>
                </div>
            </div>
            <div class="meeting-content">
                <div class="video-grid">
                    <div class="video-container">
                        <video id="localVideo" autoplay muted playsinline></video>
                        <div class="video-label">You</div>
                    </div>
                    <div class="video-container">
                        <div class="waiting-message">
                            <i class="fas fa-user-clock"></i>
                            <p>Waiting for interviewer to join...</p>
                        </div>
                    </div>
                </div>
                <div class="chat-sidebar" id="chatSidebar">
                    <div class="chat-messages" id="chatMessages"></div>
                    <div class="chat-input">
                        <input type="text" id="chatInput" placeholder="Type a message...">
                        <button id="sendMessage">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

document.body.insertAdjacentHTML('beforeend', meetingModalHTML);

// Meeting interface elements
const meetingModal = document.getElementById('meetingModal');
const meetingCompany = document.getElementById('meetingCompany');
const meetingTimer = document.getElementById('meetingTimer');
const toggleMicBtn = document.getElementById('toggleMic');
const toggleVideoBtn = document.getElementById('toggleVideo');
const toggleChatBtn = document.getElementById('toggleChat');
const endCallBtn = document.getElementById('endCall');
const localVideo = document.getElementById('localVideo');
const chatSidebar = document.getElementById('chatSidebar');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessage');

// Meeting state
let meetingState = {
    isMicOn: true,
    isVideoOn: true,
    isChatOpen: false,
    startTime: null,
    timerInterval: null,
    localStream: null
};

// Update join interview button click handler
function updateJoinInterviewButton(button, interview) {
    button.addEventListener('click', async () => {
        meetingCompany.textContent = interview.company;
        meetingModal.style.display = 'flex';
        meetingState.startTime = new Date();
        startMeetingTimer();
        
        try {
            meetingState.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            localVideo.srcObject = meetingState.localStream;
        } catch (err) {
            console.error('Error accessing media devices:', err);
            alert('Unable to access camera and microphone. Please check your permissions.');
            endMeeting();
        }
    });
}

// Meeting timer
function startMeetingTimer() {
    meetingState.timerInterval = setInterval(() => {
        const now = new Date();
        const diff = now - meetingState.startTime;
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        meetingTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// End meeting
function endMeeting() {
    if (meetingState.localStream) {
        meetingState.localStream.getTracks().forEach(track => track.stop());
        meetingState.localStream = null;
    }
    if (meetingState.timerInterval) {
        clearInterval(meetingState.timerInterval);
        meetingState.timerInterval = null;
    }
    meetingModal.style.display = 'none';
    meetingState.startTime = null;
    meetingTimer.textContent = '00:00';
    chatMessages.innerHTML = '';
    chatInput.value = '';
    meetingState.isChatOpen = false;
    chatSidebar.classList.remove('active');
}

// Toggle microphone
toggleMicBtn.addEventListener('click', () => {
    if (meetingState.localStream) {
        const audioTrack = meetingState.localStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            meetingState.isMicOn = audioTrack.enabled;
            toggleMicBtn.innerHTML = `<i class="fas fa-microphone${meetingState.isMicOn ? '' : '-slash'}"></i>`;
        }
    }
});

// Toggle video
toggleVideoBtn.addEventListener('click', () => {
    if (meetingState.localStream) {
        const videoTrack = meetingState.localStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            meetingState.isVideoOn = videoTrack.enabled;
            toggleVideoBtn.innerHTML = `<i class="fas fa-video${meetingState.isVideoOn ? '' : '-slash'}"></i>`;
        }
    }
});

// Toggle chat
toggleChatBtn.addEventListener('click', () => {
    meetingState.isChatOpen = !meetingState.isChatOpen;
    chatSidebar.classList.toggle('active');
    toggleChatBtn.innerHTML = `<i class="fas fa-comments${meetingState.isChatOpen ? '' : ''}"></i>`;
});

// End call
endCallBtn.addEventListener('click', endMeeting);

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <div class="message-sender">You</div>
            <div class="message-content">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = '';
    }
}

sendMessageBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Update the existing interview card creation to use the new join interview handler
function createInterviewCard(interview) {
    // ... existing card creation code ...
    
    // Update the join interview button
    const joinButton = card.querySelector('.join-interview-btn');
    if (joinButton) {
        updateJoinInterviewButton(joinButton, interview);
    }
    
    return card;
} 