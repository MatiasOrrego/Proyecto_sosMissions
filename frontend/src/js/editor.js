let quill = new Quill('#editor-container', {
  theme: 'snow',
  modules: {
      toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['image']
      ]
  }
});

const form = document.getElementById('post-category');

form.addEventListener('submit',async (e) => {
  e.preventDefault();

  const title = document.getElementById('titulo').value;
  const description = document.getElementById('descripcion').value;

  const category = document.getElementById('categories').value;
  console.log(category)

  const categoryId = parseInt(category)

  try {
    const response = await fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        title,
        description,
        categoryId
      })
    })
    if(!response.ok) {
        throw new Error('Error al crear la publicacion')
    } else {
      window.location.href = 'http://localhost:5173/index.html'
    }
  } catch (error) {
    alert('Hubo un error al crear la publicacion')
  }
})