document.addEventListener('DOMContentLoaded', function() {
    // Форма добавления отзыва
    const form = document.getElementById('reviewForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const productName = document.getElementById('productName').value;
            const reviewText = document.getElementById('reviewText').value;
            saveReview(productName, reviewText);
            form.reset();
        });
    }

    // Страница просмотра отзывов
    const reviewsList = document.getElementById('reviewsList');
    if (reviewsList) {
        loadReviews();
    }
});

function saveReview(productName, reviewText) {
    const reviews = getReviewsFromStorage() || {};
    if (!reviews[productName]) {
        reviews[productName] = [];
    }
    reviews[productName].push(reviewText);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function getReviewsFromStorage() {
    return JSON.parse(localStorage.getItem('reviews'));
}

function loadReviews() {
    const reviews = getReviewsFromStorage();
    if (reviews) {
        for (const productName in reviews) {
            const productReviews = reviews[productName];
            const productElement = document.createElement('div');
            productElement.textContent = productName;
            productElement.addEventListener('click', function() {
                showProductReviews(productName, productReviews);
            });
            reviewsList.appendChild(productElement);
        }
    }
}

function showProductReviews(productName, reviews) {
    reviewsList.innerHTML = ''; // Очистить список отзывов
    const productElement = document.createElement('div');
    productElement.textContent = productName;
    reviewsList.appendChild(productElement);

    reviews.forEach(function(review, index) {
        const reviewElement = document.createElement('div');
        reviewElement.textContent = review;
        reviewElement.classList.add('review-item');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function() {
            deleteReview(productName, index);
            showProductReviews(productName, reviews); // Обновить список отзывов
        });
        reviewElement.appendChild(deleteButton);
        reviewsList.appendChild(reviewElement);
    });
}

function deleteReview(productName, index) {
    const reviews = getReviewsFromStorage();
    reviews[productName].splice(index, 1);
    if (reviews[productName].length === 0) {
        delete reviews[productName];
    }
    localStorage.setItem('reviews', JSON.stringify(reviews));
}
