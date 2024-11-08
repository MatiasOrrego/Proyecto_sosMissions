document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.comment-form');
    const commentsList = document.querySelector('.comments-list');
    const ratingStars = document.querySelectorAll('.star');
    const ratingCount = document.querySelector('.rating-count');

    // Manejar la subida de comentarios
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

    // Manejar la valoración del artículo
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            ratingStars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
            ratingCount.textContent = `(Valoración: ${rating} estrellas)`;
        });
    });

    // Manejar la subida de imágenes y texto
    const articleForm = document.querySelector('.article-form');
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
                    const newArticle = document.createElement('article');
                    newArticle.classList.add('article-header');
                    newArticle.innerHTML = `
                        <h1>${title}</h1>
                        <div class="article-meta">
                            <div class="author-info">
                                <img src="${e.target.result}" alt="Author" class="author-avatar">
                                <span>Por ${author}</span>
                            </div>
                            <span>|</span>
                            <span>${date}</span>
                            <span>|</span>
                            <span>${readingTime} min de lectura</span>
                        </div>
                        <div class="article-content">
                            <img src="${e.target.result}" alt="IA Imagen">
                            <p>${content}</p>
                        </div>
                    `;
                    document.querySelector('.container').prepend(newArticle);
                };
                reader.readAsDataURL(image);
                articleForm.reset();
            }
        });
    }
});