// Mock data for the hourly project
const mockProjectData = {
    projectName: 'Website Redesign',
    sinceDate: '02/26/19',
    hourlyRate: '2 USD/hour',
    weeklyLimit: '3 hour/s',
    totalTrackedHours: 120, // Example: 120 minutes (2 hours)
    totalEarnings: 240.00, // Example: 2 hours * 2 USD/hour = 4 USD
    invoiceDateStart: '02/25/19',
    invoiceDateEnd: '03/03/19',
    invoiceTrackedHours: 60, // Example: 60 minutes (1 hour) for current invoice
    invoicePayable: 120.00, // Example: 1 hour * 2 USD/hour = 2 USD
    paymentDate: 'March 06, 2019'
};

// DOM Elements
const projectNameDisplay = document.getElementById('projectNameDisplay');
const projectSinceDate = document.getElementById('projectSinceDate');
const hourlyRateDisplay = document.getElementById('hourlyRate');
const weeklyLimitDisplay = document.getElementById('weeklyLimit');
const totalTrackedHoursDisplay = document.getElementById('totalTrackedHours');
const totalEarningsDisplay = document.getElementById('totalEarnings');
const invoiceDateDisplay = document.getElementById('invoiceDate');
const invoiceTrackedHoursDisplay = document.getElementById('invoiceTrackedHours');
const invoicePayableDisplay = document.getElementById('invoicePayable');
const trackedHoursStartDate = document.getElementById('trackedHoursStartDate');
const trackedHoursEndDate = document.getElementById('trackedHoursEndDate');
const paymentDateDisplay = document.getElementById('paymentDate');

const playPauseBtn = document.querySelector('.play-pause-btn');
const timerDisplay = document.querySelector('.timer-display');

// Timer state
let isTimerRunning = false;
let startTime = 0;
let elapsedTime = 0; // in milliseconds
let timerInterval;

// Initialize the page
document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    renderProjectData();
    setupEventListeners();
    loadTimerState();
}

// Render project data to the HTML
function renderProjectData() {
    projectNameDisplay.textContent = mockProjectData.projectName;
    projectSinceDate.textContent = mockProjectData.sinceDate;
    hourlyRateDisplay.textContent = mockProjectData.hourlyRate;
    weeklyLimitDisplay.textContent = mockProjectData.weeklyLimit;

    updateTotalAndInvoiceData();

    trackedHoursStartDate.textContent = mockProjectData.invoiceDateStart;
    trackedHoursEndDate.textContent = mockProjectData.invoiceDateEnd;
    paymentDateDisplay.textContent = mockProjectData.paymentDate;
}

function updateTotalAndInvoiceData() {
    totalTrackedHoursDisplay.textContent = formatMinutesToHoursMinutes(mockProjectData.totalTrackedHours);
    totalEarningsDisplay.textContent = `$${mockProjectData.totalEarnings.toFixed(2)} USD`;
    invoiceDateDisplay.textContent = `${mockProjectData.invoiceDateStart} - ${mockProjectData.invoiceDateEnd}`;
    invoiceTrackedHoursDisplay.textContent = formatMinutesToHoursMinutes(mockProjectData.invoiceTrackedHours);
    invoicePayableDisplay.textContent = `$${mockProjectData.invoicePayable.toFixed(2)} USD`;
}

// Helper to format minutes into Hh Mm
function formatMinutesToHoursMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}

// Setup event listeners
function setupEventListeners() {
    playPauseBtn.addEventListener('click', toggleTimer);
}

// Timer functionality
function toggleTimer() {
    if (isTimerRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    isTimerRunning = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay();
        saveTimerState(); // Save state every second
    }, 1000);

    // Update mock data for active tracking (hourly rate: 2 USD/hour = 2/60 USD/minute)
    const ratePerMinute = 2 / 60;
    const intervalMinutes = 1; // Update earnings every minute for demonstration

    // Update earnings and tracked hours based on the timer for demonstration
    // This is simplified and would be handled by a backend in a real app
    setInterval(() => {
        if (isTimerRunning) {
            mockProjectData.totalTrackedHours += intervalMinutes;
            mockProjectData.totalEarnings += ratePerMinute * intervalMinutes;
            mockProjectData.invoiceTrackedHours += intervalMinutes;
            mockProjectData.invoicePayable += ratePerMinute * intervalMinutes;
            updateTotalAndInvoiceData();
        }
    }, intervalMinutes * 60 * 1000); // Update every minute
}

function pauseTimer() {
    isTimerRunning = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    clearInterval(timerInterval);
    saveTimerState();
}

function updateTimerDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent = `${hours.toString().padStart(3, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Save/Load timer state to/from localStorage
function saveTimerState() {
    localStorage.setItem('timerRunning', isTimerRunning);
    localStorage.setItem('elapsedTime', elapsedTime);
    localStorage.setItem('mockProjectData', JSON.stringify(mockProjectData));
}

function loadTimerState() {
    isTimerRunning = localStorage.getItem('timerRunning') === 'true';
    elapsedTime = parseInt(localStorage.getItem('elapsedTime') || '0', 10);
    const savedProjectData = localStorage.getItem('mockProjectData');
    if (savedProjectData) {
        Object.assign(mockProjectData, JSON.parse(savedProjectData));
    }

    updateTimerDisplay(); // Update display immediately on load
    if (isTimerRunning) {
        startTimer(); // Resume timer if it was running
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Ensure correct button icon
    }
} 