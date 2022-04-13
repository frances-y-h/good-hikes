window.addEventListener('DOMContentLoaded', (e) => {
    console.log("******update review js")
    //get Edit-review button from the page
    const editReviews = document.querySelectorAll('#review');
    const editReviewBtns = document.querySelectorAll('.edit-review');
    const reviewForm = document.getElementById("review-form");
    const bgModal = document.querySelector('.bg-modal');


    //loop through all the edit-review buttons
    for (let i = 0; i < editReviews.length; i++) {
        const review = editReviews[i];

        //add event listener to every button
        review.addEventListener('click', (event) => {

            //reviewId
            const reviewId = (event.target.parentNode.id).split("-")[1];
            console.log(reviewId);

            //extracting values from the existing review
            const review = event.currentTarget.innerText;
            const partsOfReview = review.split("\n");
            const ratingValue = partsOfReview[1];
            const commentValue = partsOfReview[2];
            const dateHikeValue = partsOfReview[3].split(" ")[2];


            // check if the clicked edit is for the right review
            for (let j = 0; j < editReviewBtns.length; j++) {
                const editReviewId = editReviewBtns[j].id.split("-")[1];
                if (reviewId === editReviewId) {

                    //grabbing comment and dateHike fields from the form
                    let commentField = document.querySelector('textarea[name=comment]');
                    let dateHikeField = document.querySelector('input[name=dateHike]');
                    const stars = document.querySelectorAll('.star');

                    commentField.innerText = commentValue;
                    dateHikeField.innerHTML = dateHikeValue;

                    for (let i = 0; i < ratingValue; i++) {
                        const star = stars[i];
                        star.innerHTML = '&#9733';
                    }

                    reviewForm.classList.remove("hidden");
                    bgModal.classList.remove("hidden");


                    // add event listener to the cancel button
                    cancelReviewButton.addEventListener("click", (event) => {
                        event.preventDefault();

                        //resetting review form fields
                        stars.forEach(star => {
                            star.innerHTML = '&#9734';
                        });
                        comment.value = "";
                        dateHike.value = "";

                        //hiding the form
                        reviewForm.classList.add("hidden");
                        bgModal.classList.add("hidden");
                    });

                    //event listener for the submit button
                    submitReviewButton.addEventListener("click", async (event) => {
                        event.preventDefault();

                        //grabbing comment and dateHike fields from the form
                        let comment = document.querySelector('textarea[name=comment]');
                        let dateHike = document.querySelector('input[name=dateHike]');

                        //send request to the database
                        const res = await fetch(`/hikes/${hikeId}/reviews`, {
                            method: "PUT",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({

                            })
                        })

                        //response from the database
                        const data = await res.json();

                        //if response was successful
                        if (data.message === 'Success') {

                            // grab the review fields from review card
                            const reviewRating = document.querySelector('.rating-username #rating');
                            const reviewUsername = document.querySelector('.rating-username .username');
                            const reviewComment = document.querySelector('#review .comment');
                            const reviewDateHike = document.querySelector('#review .dateHike');
                            const starRating = document.querySelector('#review .star-sprite');

                            //populate them with the saved data from the database
                            starRating.style = `width:${data.review.rating / 5 * 100}%`;
                            reviewUsername.innerHTML = data.user.username;
                            reviewRating.innerHTML = data.review.rating;

                            if (data.review.comment) {
                                reviewComment.innerHTML = data.review.comment;
                            }
                            if (data.review.dateHike) {
                                reviewDateHike.innerHTML = data.review.dateHike;
                            }

                            //resetting review form fields
                            stars.forEach(star => {
                                star.innerHTML = '&#9734';
                            });
                            comment.value = "";
                            dateHike.value = "";

                            //hiding the form
                            reviewForm.classList.add("hidden");
                            bgModal.classList.add("hidden");
                        } else {
                            //if response was not successful
                            const errorMessage = document.querySelector('.errors');

                            //prepopulate the form and show error message
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
                }

            }
        });
    };
});
