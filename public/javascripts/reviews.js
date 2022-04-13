document.addEventListener('DOMContentLoaded', (e) => {

    const reviewForm = document.getElementById("review-form");
    const reviewButton = document.querySelector('.review-btn');
    const cancelReviewButton = document.querySelector('#review-cancel');
    const submitReviewButton = document.querySelector('#review-submit');
    const bgModal = document.querySelector('.bg-modal');

    reviewButton.addEventListener("click", (event) => {
        reviewForm.classList.remove("hidden");
        bgModal.classList.remove("hidden");
        const hikeId = event.target.id.split("-")[2];



        cancelReviewButton.addEventListener("click", (event) => {
            event.preventDefault();
            reviewForm.classList.add("hidden");
            bgModal.classList.add("hidden");
        });

        let rating;
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, i) => {
            star.onclick = function(e) {
                e.preventDefault();
                rating = i + 1;
                let current_star = i + 1;
                stars.forEach((star, j) => {
                    if (current_star >= j + 1) {
                        star.innerHTML = '&#9733';
                    } else {
                        star.innerHTML = '&#9734';
                    }
                });
            }
        });

        submitReviewButton.addEventListener("click", async (event) => {
            event.preventDefault();
            let comment = document.querySelector('textarea[name=comment]');
            let dateHike = document.querySelector('input[name=dateHike]');


            const res = await fetch(`/hikes/${hikeId}/reviews`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hikeId,
                    rating,
                    comment: comment.value,
                    dateHike: dateHike.value
                })
            })

            const data = await res.json();
            if (data.message === 'Success') {

                const reviewRating = document.querySelector('.rating-username #rating');
                const reviewUsername = document.querySelector('.rating-username .username');
                const reviewComment = document.querySelector('#review .comment');
                const reviewDateHike = document.querySelector('#review .dateHike');
                const starRating = document.querySelector('#review .star-sprite');

                starRating.style = `width:${data.review.rating / 5 * 100}%`;
                reviewUsername.innerHTML = data.user.username;
                reviewRating.innerHTML = data.review.rating;

                if (data.review.comment) {
                    reviewComment.innerHTML = data.review.comment;
                }
                if (data.review.dateHike) {
                    reviewDateHike.innerHTML = data.review.dateHike;
                }

                stars.forEach(star => {
                    star.innerHTML = '&#9734';
                });
                comment.value = "";
                dateHike.value = "";
                reviewForm.classList.add("hidden");
                bgModal.classList.add("hidden");
            } else {
                const errorMessage = document.querySelector('.errors');

                rating = data.review.rating;
                if (data.review.comment) {
                    comment = data.review.comment;
                }
                if (data.review.dateHike) {
                    dateHike = data.review.dateHike;
                }
                errorMessage.innerHTML = data.errors;
            }
        });
    });
});
