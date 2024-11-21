// Fecha del evento
const weddingDate = new Date("2024-12-30T19:00:00").getTime();

function formatNumber(number) {
    return number < 10 ? `0${number}` : number;
}

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostrar resultado
    document.getElementById("days").innerText = formatNumber(days);
    document.getElementById("hours").innerText = formatNumber(hours);
    document.getElementById("minutes").innerText = formatNumber(minutes);
    document.getElementById("seconds").innerText = formatNumber(seconds);

    // Si la cuenta regresiva ha terminado
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown-timer").innerHTML = "¡El día ha llegado!";
    }
}, 1000);
