var quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'video'] // Agregar imágenes y videos
      ]
    }
  });
  
  // Manejar la inserción de imágenes y videos
  quill.getModule('toolbar').addHandler('image', function() {
    selectLocalImage();
  });
  
  quill.getModule('toolbar').addHandler('video', function() {
    selectLocalVideo();
  });
  
  // Función para seleccionar la imagen local
  function selectLocalImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  
    input.onchange = async function() {
      const file = input.files[0];
      if (file) {
        // Subir a Cloudinary o cualquier otro servicio
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'sosdoc');
  
        const response = await fetch('https://api.cloudinary.com/v1_1/dfu9mimfn/image/upload', {
          method: 'POST',
          body: formData
        });
  
        const data = await response.json();
        const url = data.secure_url;
  
        // Insertar la imagen en el editor
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
      }
    };
  }
  
  // Función para seleccionar el video local
  function selectLocalVideo() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();
  
    input.onchange = async function() {
      const file = input.files[0];
      if (file) {
        // Subir a Cloudinary o cualquier otro servicio
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'sosdoc');
  
        const response = await fetch('https://api.cloudinary.com/v1_1/clodfu9mimfnud/video/upload', {
          method: 'POST',
          body: formData
        });
  
        const data = await response.json();
        const url = data.secure_url;
  
        // Insertar el video en el editor
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'video', url);
      }
    };
  }
  