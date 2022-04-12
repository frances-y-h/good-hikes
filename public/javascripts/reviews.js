document.addEventListener('DOMContentLoaded', (e) => {
    console.log("hi from reviews.js")



    const reviewForm = document.getElementById("review-form");
    const reviewButton = document.querySelector('.review-btn');
    const cancelReviewButton = document.querySelector('#review-cancel');
    const submitReviewButton = document.querySelector('#review-submit');

    reviewButton.addEventListener("click", (event) => {
        reviewForm.classList.remove("hidden");
        const hikeId = event.target.id.split("-")[2];

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
                    hikeId,
                    rating,
                    comment,
                    dateHike
                })
            })

            const data = await res.json();
            if (data.message === 'Success') {
                console.log("*********", data.user.username);
                // const reviewUsername = document.getElementById('review-username'); // change to name
                // const reviewRating = document.getElementById('review-rating');
                // const reviewComment = document.getElementById('review-comment');
                // const reviewDateHike = document.getElementById('review-dateHike');

                // reviewUsername.innerHTML = data.user.username;
                // reviewRating.innerHTML = data.review.rating;

                // if (data.review.comment) {
                //     reviewComment.innerHTML = data.review.comment;
                // }
                // if (data.review.dateHike) {
                //     reviewDateHike.innerHTML = data.review.dateHike;
                // }
                // reviewForm.classList.add("hidden");
            } else {
                //errors  add elements with errors
                console.log(data.errors);
            }
        });
    });
});
