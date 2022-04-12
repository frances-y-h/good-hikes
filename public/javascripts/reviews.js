document.addEventListener('DOMContentLoaded', (e) => {
    console.log("hi from reviews.js")



    const reviewForm = document.getElementById("review-form");
    const reviewButton = document.querySelector('.review-btn');
    const cancelReviewButton = document.querySelector('#review-cancel');
    const submitReviewButton = document.querySelector('#review-submit');

    reviewButton.addEventListener("click", (event) => {
        reviewForm.classList.remove("hidden");
        hikeId = event.target.id.split("-")[2];

        cancelReviewButton.addEventListener("click", (event) => {
            reviewForm.classList.add("hidden");
            ;
        });

        submitReviewButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const rating = document.querySelector('input[name=rating]').value;
            const comment = document.querySelector('textarea[name=comment]').value;
            const dateHike = document.querySelector('input[name=dateHike]').value;
            // console.log(dateHike) 2022-03-31

            const res = await fetch(`/hikes/${hikeId}/reviews`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rating,
                    comment,
                    dateHike
                })
            })

            const data = await res.json();
            if (data.message === 'Success') {
                const review = document.getElementById('review');
                const reviewId = document.getElementById('review-id'); // change to name
                const reviewRating = document.getElementById('review-rating');
                const reviewComment = document.getElementById('review-comment');
                const reviewDateHike = document.getElementById('review-dateHike');

                reviewId.innerHTML = data.review.id; // change to name
                reviewRating.innerHTML = data.review.rating;

                if (data.review.comment) {
                    reviewComment.innerHTML = data.review.comment;
                }
                if (data.review.dateHike) {
                    reviewDateHike.innerHTML = data.review.dateHike;
                }
            } else {
                //errors
            }
        });
    });
});
