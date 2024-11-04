// Sistema de valoración
const stars = document.querySelectorAll('.star');
let userRating = 0;

stars.forEach(star => {
    star.addEventListener('mouseover', function() {
        const rating = this.dataset.rating;
        highlightStars(rating);
    });

    star.addEventListener('mouseout', function() {
        highlightStars(userRating);
    });

    star.addEventListener('click', function() {
        userRating = this.dataset.rating;
        highlightStars(userRating);
        // Aquí se podría enviar la valoración al servidor
        alert(`Gracias por tu valoración de ${userRating} estrellas!`);
    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        const starRating = star.dataset.rating;
        star.style.color = starRating <= rating ? '#ffd700' : '#ddd';
    });
}

// Sistema de comentarios
const commentForm = document.querySelector('.comment-form');
const commentsList = document.querySelector('.comments-list');

commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const commentText = this.querySelector('textarea').value;
    if (commentText.trim()) {
        addComment(commentText);
        this.querySelector('textarea').value = '';
    }
});

function addComment(text) {
    const comment = document.createElement('li');
    comment.className = 'comment';
    comment.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">Usuario</span>
            <span class="comment-date">Ahora</span>
        </div>
        <p>${text}</p>
    `;
    commentsList.insertBefore(comment, commentsList.firstChild);
}