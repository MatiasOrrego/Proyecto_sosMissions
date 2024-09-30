// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const btnLoginRegister = document.getElementById('btn-lr');

    if (token) {
        btnLoginRegister.innerHTML = `<a href='' id='logout'>Cerrar Sesión</a>`;

        document.getElementById('logout').addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('token');
            window.location.reload();
        });
    }
});
