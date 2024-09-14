let workTime = 1500; // Çalışma süresi (saniye cinsinden, varsayılan 25 dakika)
let breakTime = 300; // Mola süresi (saniye cinsinden, varsayılan 5 dakika)
let time = workTime; // Başlangıçta çalışma süresi
let timerRunning = false;
let isWorking = true; // Şu anda çalışıyor mu, molada mı olduğunu kontrol eder
let interval;

const timerDisplay = document.getElementById('timer');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const setTimerButton = document.getElementById('set-timer');
const workInput = document.getElementById('work-time');
const breakInput = document.getElementById('break-time');
const endSound = document.getElementById('end-sound'); // Meow sesi
const miyuvSound = document.getElementById('miyuv-sound'); // Miyuv sesi
const pisttSound = document.getElementById('pistt-sound'); // Pistt sesi
const modal = document.getElementById('modal');
const closeModal = document.getElementsByClassName('close')[0];

const motivationalMessages = [
    "Harika gidiyorsun! #direnEsoş ❤️",
    "Mini Cooper'ı düşün ",
    "Sterlinlerle dyson almak ne kadar kolay",
    "Tatillerde Türkiye'de Sterlin harcayarak yapacağın tatili düşün"
];

// Zamanlayıcı ekranını günceller
function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Rastgele motivasyon mesajı gösterir (alert kaldırıldı)
function showMotivationalMessage() {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    console.log(motivationalMessages[randomIndex]); // Konsolda mesajı gösterir
}

// Modal pencereyi açar
function showModal() {
    modal.style.display = "block";
}

// Modal pencereyi kapatır
closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Zamanlayıcı başlatır
function startTimer() {
    interval = setInterval(() => {
        time--;
        updateDisplay();

        if (time === 0) {
            clearInterval(interval);
            timerRunning = false;
            startStopButton.textContent = 'Başla';
            endSound.play(); // Zamanlayıcı bittiğinde ses çal
            showModal(); // Modal aç

            if (isWorking) {
                time = breakTime;
                isWorking = false;
                showMotivationalMessage(); // alert kaldırıldı
            } else {
                time = workTime;
                isWorking = true;
                showMotivationalMessage(); // alert kaldırıldı
            }
            updateDisplay();
        }
    }, 1000);
}

// Çalışma ve mola sürelerini ayarlar (alert kaldırıldı)
setTimerButton.addEventListener('click', () => {
    const workMinutes = parseInt(workInput.value, 10);
    const breakMinutes = parseInt(breakInput.value, 10);

    if (workMinutes > 0 && breakMinutes > 0) {
        workTime = workMinutes * 60;
        breakTime = breakMinutes * 60;
        time = workTime; // Zamanlayıcıyı çalışma süresine geri döndür
        isWorking = true;
        updateDisplay();
    } else {
        console.log('Yavrum düzgün bir süre gir lütfen'); // alert kaldırıldı
    }
});

// Başlat/Durdur düğmesi için olay dinleyici
startStopButton.addEventListener('click', () => {
    miyuvSound.play(); // Miyuv sesi çalar
    if (!timerRunning) {
        startTimer();
        startStopButton.textContent = 'Pembe Miyuvv';
    } else {
        clearInterval(interval);
        startStopButton.textContent = 'Miyuvv';
    }
    timerRunning = !timerRunning;
});

// Sıfırlama düğmesi için olay dinleyici
resetButton.addEventListener('click', () => {
    pisttSound.play(); // Pistt sesi çalar
    clearInterval(interval);
    time = workTime; // Zamanlayıcıyı çalışma süresine geri döndür
    updateDisplay();
    timerRunning = false;
    startStopButton.textContent = 'Miyuvv';
});

// İlk ekran güncellemesi
updateDisplay();
