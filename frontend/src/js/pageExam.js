document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.comment-form');
    const commentsList = document.querySelector('.comments-list');
    const ratingStars = document.querySelectorAll('.star');
    const ratingCount = document.querySelector('.rating-count');
    const articleForm = document.querySelector('.article-form');
    const container = document.querySelector('.container');

    // Manejar la subida de comentarios
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const textarea = form.querySelector('textarea');
            const commentText = textarea.value.trim();

            if (commentText) {
                const newComment = document.createElement('li');
                newComment.classList.add('comment');
                newComment.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">Usuario Anónimo</span>
                        <span class="comment-date">Hace unos momentos</span>
                    </div>
                    <p>${commentText}</p>
                `;
                commentsList.appendChild(newComment);
                textarea.value = '';
            }
        });
    }

    // Manejar la valoración del artículo
    if (ratingStars) {
        ratingStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = star.getAttribute('data-rating');
                ratingStars.forEach(s => s.classList.remove('selected'));
                star.classList.add('selected');
                ratingCount.textContent = `(Valoración: ${rating} estrellas)`;
            });
        });
    }

    // Manejar la subida de artículos
    if (articleForm) {
        articleForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = articleForm.querySelector('input[name="title"]').value.trim();
            const author = articleForm.querySelector('input[name="author"]').value.trim();
            const date = articleForm.querySelector('input[name="date"]').value.trim();
            const readingTime = articleForm.querySelector('input[name="readingTime"]').value.trim();
            const content = articleForm.querySelector('textarea[name="content"]').value.trim();
            const image = articleForm.querySelector('input[name="image"]').files[0];

            if (title && author && date && readingTime && content && image) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageData = e.target.result;
                    const articleData = { title, description: content, userId: 1, categoryId: 1, image: imageData };

                    fetch('http://localhost:3000/api/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté almacenado en localStorage
                        },
                        body: JSON.stringify(articleData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        addArticleToDOM(data);
                        articleForm.reset();
                    })
                    .catch(error => console.error('Error:', error));
                };
                reader.readAsDataURL(image);
            }
        });
    }

    // Función para agregar un artículo al DOM
    function addArticleToDOM(article) {
        const newArticle = document.createElement('article');
        newArticle.classList.add('article-header');
        newArticle.innerHTML = `
            <h1>${article.title}</h1>
            <div class="article-meta">
                <div class="author-info">
                    <img src="${article.image}" alt="Author" class="author-avatar">
                    <span>Por ${article.author}</span>
                </div>
                <span>|</span>
                <span>${article.date}</span>
                <span>|</span>
                <span>${article.readingTime} min de lectura</span>
            </div>
            <div class="article-content">
                <img src="${article.image}" alt="IA Imagen">
                <p>${article.description}</p>
            </div>
        `;
        container.prepend(newArticle);
    }

    // Cargar artículos al cargar la página
    fetch('http://localhost:3000/api/posts', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté almacenado en localStorage
        }
    })
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            data.forEach(article => addArticleToDOM(article));
        } else {
            console.error('Error: data is not an array');
        }
    })
    .catch(error => console.error('Error:', error));
});