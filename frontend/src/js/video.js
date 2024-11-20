const form = document.getElementById('post-category');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Recoger valores de los campos de texto
  const title = document.getElementById('titulo').value;
  const description = document.getElementById('descripcion').value;
  const category = document.getElementById('categories').value;
  const categoryId = parseInt(category);

  // Obtener el archivo de video
  const videoFile = document.getElementById('video').files[0];

  // Crear un FormData para enviar tanto el video como los datos de texto
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('categoryId', categoryId);
  formData.append('video', videoFile);  // Añadir el archivo de video

  try {
    const response = await fetch('http://localhost:3000/video', {
      method: 'POST',
      credentials: 'include',
      body: formData  // Enviar FormData sin headers adicionales
    });

    if (!response.ok) {
      throw new Error('Error al crear la publicación');
    } else {
      window.location.href = 'medic-publications.html';
    }
  } catch (error) {
    alert('Hubo un error al crear la publicación');
    console.error(error);
  }
});