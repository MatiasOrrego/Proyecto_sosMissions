var quill = new Quill('#editor-container', {
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
  var description = document.querySelector('#editor-container .ql-editor').innerHTML;
  document.getElementById('descripcion').value = description;
});

document.getElementById('nueva-publicacion-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Previene el envío del formulario por defecto

  var title = document.getElementById('titulo').value;
  var description = document.querySelector('#editor-container .ql-editor').innerHTML; // Obtén el HTML con formato

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
