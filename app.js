// Quiz State
let quizActive = false;
let currentIndex = 0;
let timerInterval;
let players = {};
let scores = {};

// DOM Elements
const playerCountEl = document.getElementById('playerCount');
const topScoreEl = document.getElementById('topScore');
const qNumEl = document.getElementById('qNum');
const statusEl = document.getElementById('status');
const timerEl = document.getElementById('timer');
const subjectBadge = document.getElementById('subjectBadge');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const playersListEl = document.getElementById('playersList');
const leaderboardEl = document.getElementById('leaderboard');
const onlineCountEl = document.getElementById('onlineCount');
const joinLinkEl = document.getElementById('joinLink');

// Current URL
const currentUrl = window.location.href;
joinLinkEl.innerHTML = currentUrl;

// Generate QR Code
new QRCode(document.getElementById("qrcode"), {
    text: currentUrl,
    width: 128,
    height: 128
});

// Copy Link Function
function copyLink() {
    navigator.clipboard.writeText(currentUrl);
    alert("✅ Link copied! Share with students");
}

// Listen for Players
firebase.database().ref('players/').on('value', (snapshot) => {
    players = snapshot.val() || {};
    const count = Object.keys(players).length;
    playerCountEl.textContent = count;
    onlineCountEl.textContent = count;
    
    if(count === 0) {
        playersListEl.innerHTML = '<div style="text-align:center; opacity:0.7;">No players joined yet...</div>';
    } else {
        playersListEl.innerHTML = Object.values(players).map(p => 
            `<span class="player-badge">🟢 ${p.name}</span>`
        ).join('');
    }
});

// Listen for Scores
firebase.database().ref('scores/').on('value', (snapshot) => {
    scores = snapshot.val() || {};
    updateLeaderboard();
});

function updateLeaderboard() {
    const sorted = Object.entries(scores).map(([id, data]) => ({
        name: players[id]?.name || id,
        score: data.score || 0
    })).sort((a,b) => b.score - a.score);
    
    const top10 = sorted.slice(0, 10);
    
    if(top10.length === 0) {
        leaderboardEl.innerHTML = '<div style="text-align:center; opacity:0.7;">No scores yet</div>';
    } else {
        leaderboardEl.innerHTML = top10.map((p, idx) => `
            <div class="leaderboard-item ${idx === 0 ? 'top-1' : ''}">
                <span>#${idx+1} ${p.name}</span>
                <span style="color:#a855f7; font-weight:bold;">${p.score}</span>
            </div>
        `).join('');
    }
    
    if(sorted.length > 0) {
        topScoreEl.textContent = sorted[0].score;
    }
}

// Start Quiz
function startQuiz() {
    const playerCount = Object.keys(players).length;
    if(playerCount === 0) {
        alert("❌ No students joined! Share the QR code first.");
        return;
    }
    
    quizActive = true;
    currentIndex = 0;
    statusEl.textContent = "LIVE";
    document.getElementById('startBtn').disabled = true;
    document.getElementById('startBtn').style.opacity = '0.5';
    
    // Reset scores
    firebase.database().ref('scores/').remove();
    
    // Load first question
    loadQuestion();
}

function loadQuestion() {
    if(!quizActive || currentIndex >= finalQuestions.length) {
        endQuiz();
        return;
    }
    
    const q = finalQuestions[currentIndex];
    qNumEl.textContent = `${currentIndex+1}/${finalQuestions.length}`;
    subjectBadge.textContent = q.subject;
    questionEl.textContent = q.text;
    
    // Display options
    optionsEl.innerHTML = q.options.map((opt, idx) => `
        <div class="option" onclick="previewAnswer(${idx})">${opt}</div>
    `).join('');
    
    // Send to Firebase for students
    const endTime = Date.now() + 10000;
    firebase.database().ref('currentQuestion/').set({
        index: currentIndex,
        question: q,
        startTime: Date.now(),
        endTime: endTime,
        active: true
    });
    
    // Start timer
    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    timerEl.textContent = timeLeft;
    
    if(timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    currentIndex++;
    
    if(currentIndex < finalQuestions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizActive = false;
    clearInterval(timerInterval);
    statusEl.textContent = "Completed";
    firebase.database().ref('currentQuestion/').set({ active: false });
    
    // Show results after 5 seconds
    setTimeout(() => {
        showResults();
    }, 3000);
}

function showResults() {
    const sorted = Object.entries(scores).map(([id, data]) => ({
        name: players[id]?.name || id,
        score: data.score || 0,
        Biology: data.Biology || 0,
        Chemistry: data.Chemistry || 0,
        Physics: data.Physics || 0,
        English: data.English || 0
    })).sort((a,b) => b.score - a.score);
    
    const top3 = sorted.slice(0, 3);
    const top5 = sorted.slice(0, 5);
    
    // Display Top 3
    const top3Div = document.getElementById('top3');
    top3Div.innerHTML = top3.map((p, idx) => `
        <div class="champion ${idx === 0 ? 'first' : ''}">
            <div style="font-size:40px;">${idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉'}</div>
            <div style="font-weight:bold;">${p.name}</div>
            <div style="font-size:24px; color:#a855f7;">${p.score}</div>
        </div>
    `).join('');
    
    // Display Top 5
    const top5Div = document.getElementById('top5');
    top5Div.innerHTML = top5.map((p, idx) => 
        `<div style="padding:8px; background:rgba(255,255,255,0.05); margin:5px; border-radius:10px;">
            ${idx+1}. ${p.name} - ${p.score} points
        </div>`
    ).join('');
    
    // Subject Analysis
    let avgBio = 0, avgChem = 0, avgPhy = 0, avgEng = 0;
    sorted.forEach(p => {
        avgBio += p.Biology;
        avgChem += p.Chemistry;
        avgPhy += p.Physics;
        avgEng += p.English;
    });
    const count = sorted.length;
    if(count > 0) {
        avgBio = (avgBio / count).toFixed(1);
        avgChem = (avgChem / count).toFixed(1);
        avgPhy = (avgPhy / count).toFixed(1);
        avgEng = (avgEng / count).toFixed(1);
    }
    
    document.getElementById('subjectAnalysis').innerHTML = `
        <div style="margin:10px 0;"><strong>Biology:</strong> ${avgBio}/10</div>
        <div style="margin:10px 0;"><strong>Chemistry:</strong> ${avgChem}/10</div>
        <div style="margin:10px 0;"><strong>Physics:</strong> ${avgPhy}/10</div>
        <div style="margin:10px 0;"><strong>English:</strong> ${avgEng}/10</div>
    `;
    
    document.getElementById('resultsModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('resultsModal').style.display = 'none';
}

function resetQuiz() {
    if(confirm("⚠️ Reset entire quiz? All player data will be lost!")) {
        firebase.database().ref('players/').remove();
        firebase.database().ref('scores/').remove();
        firebase.database().ref('currentQuestion/').remove();
        location.reload();
    }
}

function previewAnswer(idx) {
    // Just for projector preview
    console.log("Preview answer:", idx);
}