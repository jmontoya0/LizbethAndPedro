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

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.story-gallery img');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <span class="modal-navigation left">&#10094;</span>
        <img>
        <span class="modal-navigation right">&#10095;</span>
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector('img');
    const navLeft = modal.querySelector('.modal-navigation.left');
    const navRight = modal.querySelector('.modal-navigation.right');
    let currentIndex = 0;

    function openModal(index) {
        currentIndex = index;
        modalImage.src = images[index].dataset.large;
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        modalImage.src = images[currentIndex].dataset.large;
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    // Cerrar el modal si se hace clic fuera de las flechas o la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Detener la propagación del clic en las flechas para que no cierre el modal
    navLeft.addEventListener('click', (e) => {
        e.stopPropagation(); // Detiene la propagación
        navigate(-1);
    });

    navRight.addEventListener('click', (e) => {
        e.stopPropagation(); // Detiene la propagación
        navigate(1);
    });

    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        }
    });
});
