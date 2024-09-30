// Función para cargar comentarios (si tienes una API)
function cargarComentarios() {
    fetch(`http://localhost:3000/comments`)
        .then(response => response.json())
        .then(comentarios => {
            const contenedorComentarios = document.getElementById('comentariosContainer'); // Asegúrate de que este ID sea correcto
            if (contenedorComentarios) {
                contenedorComentarios.innerHTML = ''; // Limpiar el contenedor antes de agregar comentarios

                comentarios.forEach(comentario => {
                    const comentarioDiv = document.createElement('div');
                    comentarioDiv.innerHTML = `<p>${comentario.texto} - <em>${comentario.fecha_comentario}</em></p>`;
                    contenedorComentarios.appendChild(comentarioDiv);
                });
            } else {
                console.error('El contenedor de comentarios no se encontró en el DOM');
            }
        })
        .catch(error => {
            console.error('Error al cargar comentarios:', error);
        });
}

// Manejar el evento de envío de comentario
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Asegúrate de que esto se defina en un contexto global o accesible
    const btnEnviarComentario = document.getElementById('btnEnviarComentario');

    // Aquí puedes agregar el event listener para el botón de enviar comentario
    if (btnEnviarComentario) {
        btnEnviarComentario.addEventListener('click', () => {
            const nuevoComentario = document.getElementById('nuevoComentario').value;

            // Verifica que el token exista
            if (!token) {
                console.error('No hay token de autenticación disponible');
                return;
            }

            // Enviar comentario a tu API
            fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Ahora 'token' está definido
                },
                body: JSON.stringify({ post_id, user_id, text: nuevoComentario })
            })
            .then(response => response.json())
            .then(data => {
                const modal = document.getElementById('comentariosModal');
                modal.style.display = 'none'; // Ocultar la modal
                document.getElementById('nuevoComentario').value = '';
                cargarComentarios(post_id); // Recargar comentarios
            })
            .catch(error => {
                console.error('Error al enviar comentario:', error);
            });
        });
    }
});

