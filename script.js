function terjemahkanJargon() {
    const input = document.getElementById('jargonInput').value.trim().toLowerCase();
    const resultSpan = document.getElementById('translationResult');
    let terjemahan = '';

    // Logika penerjemah jargon fun
    if (input.includes('confidential computing') || input.includes('komputasi rahasia')) {
        terjemahan = "Sihir Kopi yang Tahu Kapan Harus Menyajikan Informasi Rahasia! ☕🍄✨";
    } else if (input.includes('defi') || input.includes('finance') || input.includes('keuangan')) {
        terjemahan = "Harta Karun Emas yang Dijaga oleh Jamur Ajaib! Jangan Sampai Dicuri! 💰🔒";
    } else if (input.includes('liquidation') || input.includes('manipulation') || input.includes('manipulasi')) {
        terjemahan = "Hantu Pasar yang Tidak Bisa Melihat Data Rahasiamu, Yeee! 👻🎉";
    } else if (input === 'fairblock') {
        terjemahan = "Lingkaran Jamur Kita! Tempat Paling Aman di Hutan Crypto. 🛡️";
    } else if (input === '') {
        terjemahan = "Jangan kosongkan mantra ini! Ketik sesuatu, Jamur.";
    }
    else {
        terjemahan = "Entahlah, mungkin itu adalah nama Cacing di bawah Jamur. 🐛 Coba istilah yang lebih keren!";
    }

    resultSpan.textContent = terjemahan;
}
