let c = document.getElementById('canvas');
let $ = c.getContext('2d');

// Convertir colores hex a RGB
let col = function(x, y, r, g, b) {
    $.fillStyle = `rgb(${r},${g},${b})`;
    $.fillRect(x, y, 1, 1);
};

// Colores base en RGB
const colors = {
    color1: { r: 3, g: 12, b: 21 },  // #030c15
    color2: { r: 116, g: 6, b: 33 },  // #740621
    color3: { r: 228, g: 1, b: 46 }   // #e4012e
};

// Funciones para calcular colores RGB con base en el tiempo
let R = function(x, y, t) {
    // Usar colores base para generar una variación
    return Math.floor(colors.color1.r + (colors.color2.r - colors.color1.r) * (Math.sin(t + x / 10) + 1) / 2);
};

let G = function(x, y, t) {
    return Math.floor(colors.color1.g + (colors.color3.g - colors.color1.g) * (Math.sin(t + y / 10) + 1) / 2);
};

let B = function(x, y, t) {
    return Math.floor(colors.color1.b + (colors.color3.b - colors.color2.b) * (Math.sin(t + (x + y) / 20) + 1) / 2);
};

let t = 0;

let run = function() {
    for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
            col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
        }
    }
    t = t + 0.050; // Reducir la velocidad
    window.requestAnimationFrame(run);
};

run();
