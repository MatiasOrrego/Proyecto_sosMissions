const counter = document.getElementById('counter');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const bpmValue = document.getElementById('bpmValue');
const decreaseBpm = document.getElementById('decreaseBpm');
const increaseBpm = document.getElementById('increaseBpm');

let count = 0;
let isRunning = false;
let intervalId = null;
let bpm = 100;

// Sonido del metrónomo (opcional)
const metronomeSound = new Audio('data:audio/wav;base64,UklGRqgEAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YYQEAACAgICAgICAgICAgICAgICAgICAgICAgICAf3hxeH+AfXZ1eHx6dnR5fYGFgoOKi42SkpOSmpeQhHlyfXp5em13eH+HjpmiqK2vt8DGydDW297g4eDh4tjQzcrEuLOwq6aioJ6dm5yZlpSTkpGOjY2LiomHhYSCgYB/f319fHx7e3p6eXl5eHh4d3d3d3Z2dnV1dXV0dHRzc3NycnJycXFxcXBwcHBvb29vb25ubm5tbW1tbGxsbGxra2tra2pqamppaWlpaWhoaGhoZ2dnZ2dnZmZmZmZlZWVlZWVkZGRkZGRjY2NjY2NiYmJiYmJhYWFhYWFgoqCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgn5ubm5+gnp2bmZyenZqZmp2foaKkpqisrbCzsrS0syedkY6RkpGQkI+Pk5aZnaOoq66ytbnBxcrP0tTX2NnY2dbRz8zHwLu2sq2ppaKgnpybmpmXlpWTkpGPjo2LioiHhYSCgYB/f319fHx7e3p6eXl5eHh4d3d3d3Z2dnV1dXV0dHRzc3NycnJycXFxcXBwcHBvb29vb25ubm5tbW1tbGxsbGxra2tra2pqamppaWlpaWhoaGhoZ2dnZ2dnZmZmZmZlZWVlZWVkZGRkZGRjY2NjY2NiYmJiYmJhYWFhYWFgYGBgYGBfX19fX19eXl5eXl5dXV1dXV1cXFxcXFxbW1tbW1taWlpaWlpZWVlZWVlYWFhYWFhXV1dXV1dWVlZWVlZVVVVVVVVUVFRUVFRTU1NTU1NSUlJSUlJRUVFRUVFQUFBQUFBPT09PT09OTk5OTk5NTU1NTU1MTExMTExLS0tLS0tKSkpKSkpJSUlJSUlISEhISEhHR0dHR0dGRkZGRkZFRUVFRUVEREREREVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRkZGRkZGRkZGR0dHR0dHR0dHSEhISEhISEhISUlJSUlJSUlJSkpKSkpKSkpKS0tLS0tLS0tLTExMTExMTExMTU1NTU1NTU1NTk5OTk5OTk5PT09PT09PT09QUFBQUFBQUFBRUVFRUVFRUVFSUlJSUlJSUlJTU1NTU1NTU1NUVFRUVFRUVFRVVVVVVVVVVVVWVlZWVlZWVlZXV1dXV1dXV1dYWFhYWFhYWFhZWVlZWVlZWVlaWlpaWlpaWlpbW1tbW1tbW1tcXFxcXFxcXFxdXV1dXV1dXV1eXl5eXl5eXl5fX19fX19fX19gYGBgYGBgYGBhYWFhYWFhYWFiYmJiYmJiYmJjY2NjY2NjY2NkZGRkZGRkZGRlZWVlZWVlZWVmZmZmZmZmZmZnZ2dnZ2dnZ2doaGhoaGhoaGhpaWlpaWlpaWlqampqampqamtra2tra2tra2tsbGxsbGxsbGxtbW1tbW1tbW1ubm5ubm5ubm5vb29vb29vb29wcHBwcHBwcHBxcXFxcXFxcXFycnJycnJycnJzc3Nzc3Nzc3N0dHR0dHR0dHR1dXV1dXV1dXV2dnZ2dnZ2dnZ3d3d3d3d3d3d4eHh4eHh4eHh5eXl5eXl5eXl6enp6enp6enp7e3t7e3t7e3t8fHx8fHx8fHx9fX19fX19fX1+fn5+fn5+fn5/f39/f39/f3+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==');

function updateBPM(newBpm) {
    bpm = Math.max(60, Math.min(120, newBpm));
    bpmValue.textContent = bpm;
    if (isRunning) {
        stopCounter();
        startCounter();
    }
}

function startCounter() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = '⏸ Pausar';
        startBtn.classList.remove('start-btn');
        startBtn.classList.add('pause-btn');
        
        const interval = (60 / bpm) * 1000; // Convertir BPM a milisegundos
        
        intervalId = setInterval(() => {
            count++;
            counter.textContent = count;
            counter.classList.add('active');
            
            // Reproducir sonido (opcional)
            metronomeSound.currentTime = 0;
            metronomeSound.play().catch(() => {}); // Ignorar errores si el navegador bloquea el audio
            
            // Quitar la clase de animación
            setTimeout(() => {
                counter.classList.remove('active');
            }, 100);

            // Detenerse para ventilaciones después de 30 compresiones
            if (count % 30 === 0) {
                stopCounter();
                alert('Realiza 2 ventilaciones');
                setTimeout(startCounter, 2000); // Pausa de 2 segundos para ventilaciones
            }
        }, interval);
    } else {
        stopCounter();
    }
}

function stopCounter() {
    isRunning = false;
    clearInterval(intervalId);
    startBtn.textContent = '▶ Iniciar';
    startBtn.classList.remove('pause-btn');
    startBtn.classList.add('start-btn');
}

function resetCounter() {
    stopCounter();
    count = 0;
    counter.textContent = count;
}

// Event Listeners
startBtn.addEventListener('click', startCounter);
resetBtn.addEventListener('click', resetCounter);
decreaseBpm.addEventListener('click', () => updateBPM(bpm - 5));
increaseBpm.addEventListener('click', () => updateBPM(bpm + 5));

// Manejar teclas de atajos
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            startCounter();
            break;
        case 'KeyR':
            if (e.ctrlKey) {
                e.preventDefault();
                resetCounter();
            }
            break;
    }
});