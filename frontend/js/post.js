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

document.getElementById('nueva-publicacion-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let title = document.getElementById('titulo').value;
  
  // Obtener solo el texto plano de la descripción, sin etiquetas HTML
  let description = document.querySelector('#editor-container .ql-editor').innerText;

  fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
  })
  .then(response => response.json())
  .then(data => {
      console.log('Éxito:', data);
      window.location.href = '/frontend/home.html';
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});
