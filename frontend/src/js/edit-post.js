let quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
      ],
    },
  });
  
  // Obtener el ID de la publicación desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  
  const form = document.getElementById('post-category');
  const titleInput = document.getElementById('titulo');
  const categorySelect = document.getElementById('categories');
  const editorContainer = document.querySelector('#editor-container .ql-editor');
  
  // Cargar datos de la publicación existente
  async function fetchPostData() {
    try {
      const response = await fetch(`http://localhost:3000/post/${postId}`, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Error al cargar los datos de la publicación');
      }
  
      const post = await response.json();
      titleInput.value = post.title;
      categorySelect.value = post.categoryId;
      editorContainer.innerHTML = post.description;
    } catch (error) {
      console.error(error);
      alert('Error al cargar los datos de la publicación');
    }
  }
  
  // Enviar datos actualizados al servidor
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = titleInput.value;
    const description = editorContainer.innerHTML;
    const categoryId = parseInt(categorySelect.value);
  
    try {
      const response = await fetch(`http://localhost:3000/post/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title,
          description,
          categoryId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar la publicación');
      }
  
      alert('Publicación actualizada con éxito');
      window.location.href = 'medic-publications.html';
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la publicación');
    }
  });
  
  // Llamar a la función para cargar los datos de la publicación
  fetchPostData();
  