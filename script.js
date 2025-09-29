function terjemahkanJargon() {
    const input = document.getElementById('jargonInput').value.trim().toLowerCase();
    const resultSpan = document.getElementById('translationResult');
    let terjemahan = '';

    // Logika penerjemah jargon fun
    if (input.includes('confidential computing')) {
        terjemahan = "Sihir Kopi yang Tahu Kapan Harus Menyajikan Informasi Rahasia! 🍄✨";
    } else if (input.includes('defi') || input.includes('finance')) {
        terjemahan = "Harta Karun Emas yang Dijaga oleh Jamur Ajaib! 💰🍄";
    } else if (input.includes('liquidation') || input.includes('manipulation')) {
        terjemahan = "Hantu Pasar yang Tidak Bisa Melihat Data Rahasiamu! 👻🔒";
    } else if (input === 'fairblock') {
        terjemahan = "Lingkaran Jamur Kita! Tempat Paling Aman di Hutan Crypto. 🛡️";
    } else if (input === '') {
        terjemahan = "Jangan kosongkan mantra ini!";
    }
    else {
        terjemahan = "Entahlah, mungkin itu adalah nama Cacing di bawah Jamur. 🐛";
    }

    resultSpan.textContent = terjemahan;
}
