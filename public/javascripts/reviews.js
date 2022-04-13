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
            reviewForm.classList.add("hidden");
            bgModal.classList.add("hidden");
        });

        submitReviewButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const rating = document.querySelector('input[name=rating]').value;
            const comment = document.querySelector('textarea[name=comment]').value;
            const dateHike = document.querySelector('input[name=dateHike]').value;


            const res = await fetch(`/hikes/${hikeId}/reviews`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hikeId,
                    rating,
                    comment,
                    dateHike
                })
            })

            const data = await res.json();
            if (data.message === 'Success') {

                const reviewRating = document.querySelector('.rating-username #rating');
                const reviewUsername = document.querySelector('.rating-username .username');

                const reviewComment = document.querySelector('#review .comment');
                const reviewDateHike = document.querySelector('#review .dateHike');

                reviewUsername.innerHTML = data.user.username;
                reviewRating.innerHTML = data.review.rating;

                if (data.review.comment) {
                    reviewComment.innerHTML = data.review.comment;
                }
                if (data.review.dateHike) {
                    reviewDateHike.innerHTML = data.review.dateHike;
                }

                reviewForm.classList.add("hidden");
                console.log("hi after classHidden")
                bgModal.classList.add("hidden");
            } else {
                //errors  add elements with errors
                console.log(data.errors);
            }
        });
    });
});
