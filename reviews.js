// ===== Guest Reviews - Drunkyard =====
(function () {
  const STORAGE_KEY = 'drunkyard-reviews';

  const defaultReviews = [
    { name: 'Rahul M.', rating: 5, text: 'Amazing ambience and great cocktails! The Yard Special is a must-try. Staff is friendly and the music hits just right.', date: '2024-12-15' },
    { name: 'Priya S.', rating: 5, text: 'Best lounge in Dombivli. Food is delicious, especially the Chicken Bao and Dim Sum. Perfect for weekend plans.', date: '2024-12-10' },
    { name: 'Amit K.', rating: 4, text: 'Great vibe and good crowd. Cocktails are well crafted. Would recommend booking in advance on weekends.', date: '2024-12-05' },
    { name: 'Neha R.', rating: 5, text: 'Built for the night indeed! Live music, cool decor, and the Mojitos are top notch. Will definitely come back.', date: '2024-11-28' },
    { name: 'Vikram D.', rating: 4, text: 'Nice place for a casual hangout. Good food, decent drinks, and the service was quick. Parking can be tight.', date: '2024-11-20' },
  ];

  function getReviews() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : defaultReviews;
      }
    } catch (_) {}
    return [...defaultReviews];
  }

  function saveReviews(reviews) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (_) {}
  }

  function starStr(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  function renderReview(card) {
    return `
      <div class="review-card">
        <div class="review-card-header">
          <span class="review-card-name">${escapeHtml(card.name)}</span>
          <span class="review-card-stars">${starStr(card.rating)}</span>
        </div>
        <p class="review-card-text">${escapeHtml(card.text)}</p>
      </div>
    `;
  }

  function escapeHtml(s) {
    if (!s) return '';
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function renderReviewsList() {
    const list = document.getElementById('reviews-list');
    if (!list) return;
    const reviews = getReviews();
    list.innerHTML = reviews.map(renderReview).join('');
  }

  // Only run form logic if form exists (reviews page has no form)
  const starsInput = document.querySelector('.stars-input');
  const form = document.querySelector('.review-form');
  if (starsInput && form) {
    let selectedRating = 0;
    const stars = starsInput.querySelectorAll('button');

    stars.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        selectedRating = parseInt(btn.dataset.star, 10);
        starsInput.dataset.rating = selectedRating;
        stars.forEach((s, i) => s.classList.toggle('filled', i < selectedRating));
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('[name="name"]');
      const reviewInput = form.querySelector('[name="review"]');
      if (!nameInput || !reviewInput) return;

      selectedRating = parseInt(starsInput.dataset.rating || '0', 10);
      if (selectedRating < 1) {
        alert('Please select a rating.');
        return;
      }

      const name = nameInput.value.trim();
      const text = reviewInput.value.trim();
      if (!name || !text) return;

      const reviews = getReviews();
      const newReview = {
        name,
        rating: selectedRating,
        text,
        date: new Date().toISOString().split('T')[0],
      };
      reviews.unshift(newReview);
      saveReviews(reviews);

      form.reset();
      starsInput.dataset.rating = '0';
      stars.forEach((s) => s.classList.remove('filled'));

      renderReviewsList();
      alert('Thank you for your review!');
    });
  }

  renderReviewsList();
})();
