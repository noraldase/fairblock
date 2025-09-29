// ===========================================
// BAGIAN I: KONTROL GAME (WASD / TOUCH)
// ===========================================

let keys = { left: false, right: false, jump: false };
let gameRunning = false;
let playerX = 50; // Posisi X awal pemain (simulasi)
let playerY = 300; // Posisi Y awal pemain (simulasi)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function gameLoop() {
    if (!gameRunning) return;

    // 1. CLEAR SCREEN
    ctx.fillStyle = '#0d0a1b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. INPUT & LOGIKA GERAK
    if (keys.left) playerX -= 5;
    if (keys.right) playerX += 5;
    // Jika keys.jump, terapkan logika lompat di sini (kompleks)

    // Batasi pergerakan di dalam canvas
    if (playerX < 0) playerX = 0;
    if (playerX > canvas.width - 20) playerX = canvas.width - 20;

    // 3. GAMBAR KARAKTER (SIMULASI JAMUR KOTAK)
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(playerX, playerY, 20, 20); // Kotak 20x20 mewakili Fungus

    // 4. LOOP
    requestAnimationFrame(gameLoop);
}

// Fungsi Pemicu Kontrol Mobile
window.move = function(direction, isDown) {
    keys[direction] = isDown;
    // console.log(`Mobile: ${direction}: ${isDown ? 'Down' : 'Up'}`);
}

// Fungsi Pemicu Kontrol Keyboard (WASD/Panah)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = true;
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = true;
    if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w' || e.key === ' ') keys.jump = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = false;
    if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w' || e.key === ' ') keys.jump = false;
});

document.getElementById('startButton').addEventListener('click', () => {
    const name = document.getElementById('playerName').value.trim();
    if (name === '') {
        alert('Mohon masukkan nama Anda terlebih dahulu!');
        return;
    }
    
    // Reset dan Mulai Game Loop
    playerX = 50;
    gameRunning = true;
    gameLoop();
    alert(`Game dimulai! Coba gerakkan kotak jamur dengan WASD/Panah atau tombol di bawah!`);
    
    // SIMULASI GAME END SETELAH 5 DETIK
    setTimeout(() => {
        gameRunning = false;
        const finalScore = Math.floor(Math.random() * 20000) + 5000;
        alert(`Game Selesai! Skor Anda: ${finalScore}`);
        submitScoreToServer(name, finalScore); // Kirim skor ke simulasi server
    }, 5000); // 5 detik simulasi game

});


// ===========================================
// BAGIAN II: LEADERBOARD GLOBAL (SIMULASI)
// ===========================================

// VARIABEL SIMULASI DATA GLOBAL SERVER (GANTIKAN DENGAN DATABASE ASLI)
let globalScores = [
    { name: "Fungus-Master", score: 25000, date: '1 jam lalu' },
    { name: "Keybearer", score: 22100, date: '3 jam lalu' },
    { name: "Anonim", score: 19800, date: 'Hari ini' },
];

// SIMULASI PENGIRIMAN SKOR KE SERVER
function submitScoreToServer(playerName, finalScore) {
    // 1. Simulasikan pengiriman data
    console.log(`Mengirim skor ${finalScore} untuk ${playerName} ke API...`);

    // 2. Simulasikan respon dari server (menambahkannya ke array global)
    globalScores.push({ name: playerName, score: finalScore, date: 'Baru saja' });
    
    // 3. Urutkan dan batasi
    globalScores.sort((a, b) => b.score - a.score);
    globalScores = globalScores.slice(0, 10); // Batasi 10 besar

    // 4. Muat ulang leaderboard
    loadGeneralLeaderboard();
}


// SIMULASI PENGAMBILAN DATA DARI SERVER
function loadGeneralLeaderboard() {
    const leaderboardList = document.getElementById('globalScoreList');

    // Di SINI, Anda akan menggunakan fetch() untuk mengambil data dari API SERVER ASLI Anda.
    // Contoh: fetch('https://api.yourgame.com/leaderboard').then(res => res.json()).then(data => {...})

    // Untuk saat ini, kita gunakan data simulasi:
    const scores = globalScores; 

    leaderboardList.innerHTML = '';
    if (scores.length === 0) {
        leaderboardList.innerHTML = '<li>Belum ada skor tercatat. Jadilah yang pertama!</li>';
        return;
    }

    scores.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>#${index + 1} ${player.name}</strong>: ${player.score} pts 
            <span style="font-size: 0.8em; color: #ccc;">(${player.date})</span>
        `;
        leaderboardList.appendChild(listItem);
    });
}

// Muat leaderboard awal saat script berjalan
document.addEventListener('DOMContentLoaded', loadGeneralLeaderboard);
