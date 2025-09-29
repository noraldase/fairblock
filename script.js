const STORAGE_KEY = 'fungusLeaderboard';

// --- FUNGSI UTAMA GAME ---
function startGame() {
    const playerNameInput = document.getElementById('playerName');
    const name = playerNameInput.value.trim();
    const resultDisplay = document.getElementById('gameResult');

    if (name === '') {
        resultDisplay.textContent = 'Nama Petualang tidak boleh kosong!';
        return;
    }

    // 1. Simulasi Permainan dan Skor
    // Menghasilkan skor acak antara 1000 hingga 10000
    const score = Math.floor(Math.random() * 9001) + 1000; 
    
    // 2. Tampilkan Hasil Permainan
    resultDisplay.textContent = `Selamat, ${name}! Anda mendapatkan skor: ${score} 🗝️`;

    // 3. Simpan Skor ke LocalStorage
    saveScore(name, score);
}

// --- FUNGSI PENYIMPANAN DATA ---
function getLeaderboard() {
    // Mengambil data dari LocalStorage
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveScore(name, score) {
    let leaderboard = getLeaderboard();

    // Cek apakah pemain ini sudah ada
    const existingIndex = leaderboard.findIndex(p => p.name.toLowerCase() === name.toLowerCase());

    if (existingIndex !== -1) {
        // Jika sudah ada, update hanya jika skor baru lebih tinggi
        if (score > leaderboard[existingIndex].score) {
            leaderboard[existingIndex].score = score;
            leaderboard[existingIndex].date = new Date().toLocaleString();
            document.getElementById('gameResult').textContent += ' (REKOR BARU!)';
        } else {
             document.getElementById('gameResult').textContent += ' (Skor tidak memecahkan rekor Anda.)';
        }
    } else {
        // Jika pemain baru, tambahkan
        leaderboard.push({ name: name, score: score, date: new Date().toLocaleString() });
    }

    // Urutkan leaderboard dari skor tertinggi
    leaderboard.sort((a, b) => b.score - a.score);

    // Simpan kembali ke LocalStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboard));
    
    // Muat ulang tampilan leaderboard
    loadLeaderboard();
}

// --- FUNGSI TAMPILAN LEADERBOARD ---
function loadLeaderboard() {
    const leaderboard = getLeaderboard();
    const listElement = document.getElementById('scoreList');
    listElement.innerHTML = ''; // Kosongkan list sebelumnya

    if (leaderboard.length === 0) {
        listElement.innerHTML = '<li>Belum ada skor yang dicatat. Mulai main!</li>';
        return;
    }

    leaderboard.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>#${index + 1} ${player.name}</strong>: ${player.score} poin 
            <span style="font-size: 0.8em; color: #aaa;">(${player.date})</span>
        `;
        listElement.appendChild(listItem);
    });
}

// --- FUNGSI HAPUS LEADERBOARD ---
function clearLeaderboard() {
    if (confirm('Apakah Anda yakin ingin menghapus semua data peringkat di browser ini?')) {
        localStorage.removeItem(STORAGE_KEY);
        loadLeaderboard();
    }
}
