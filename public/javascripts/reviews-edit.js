window.addEventListener('DOMContentLoaded', (e) => {

    // edit buttons
    const editReviewBtns = document.querySelectorAll('.edit-review');

    //edit review form
    const reviewForm = document.getElementById("edit-review-form");

    //bg for form
    const bgModal = document.querySelector('.bg-modal2');

    // cancel and submit edit review buttons
    const cancelReviewButton = document.querySelector("#edit-review-cancel");
    const submitReviewButton = document.querySelector("#edit-review-submit");

    //find hikeId
    const hikeId = document.querySelector(".hike-name").id.split("-")[1];

    for (let i = 0; i < editReviewBtns.length; i++) {
        let editReviewBtn = editReviewBtns[i];

        editReviewBtn.addEventListener('click', (event) => {

            //extracting values from the existing review
            const reviewData = (event.target.parentNode.parentNode).innerText;
            const partsOfReview = reviewData.split("\n");
            const ratingValue = partsOfReview[1];
            const commentValue = partsOfReview[2];
            const dateHikeValue = partsOfReview[3].split(" ")[2];
            const reviewId = event.target.id.split("-")[1];

            //show edit form
            reviewForm.classList.remove("hidden");
            bgModal.classList.remove("hidden");

            //grabbing comment and dateHike fields from the form
            let commentField = document.querySelector('#edit-review-form textarea[name=comment]');
            let dateHikeField = document.querySelector('#edit-review-form input[name=dateHike]');
            let stars = document.querySelectorAll('#edit-review-form .star');

            //populate form fields with existing values
            commentField.innerText = commentValue;
            dateHikeField.value = dateHikeValue;

            for (let i = 0; i < ratingValue; i++) {
                const star = stars[i];
                star.innerHTML = '&#9733';
            }

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

            //closing the form when the user clicks outside of the form
            window.onclick = function (event) {
                if (event.target == bgModal) {
                    stars.forEach(star => {
                        star.innerHTML = '&#9734';
                    });
                    comment.value = "";
                    dateHike.value = "";

                    reviewForm.classList.add("hidden");
                    bgModal.classList.add("hidden");
                }
            };

            //building rating starts functionality in the review form
            let rating;
            stars.forEach((star, i) => {
                star.onclick = function (e) {
                    e.preventDefault();
                    rating = i + 1;
                    let current_star = i + 1;
                    stars.forEach((star, j) => {
                        if (current_star >= j + 1) {
                            star.innerHTML = "&#9733";
                        } else {
                            star.innerHTML = "&#9734";
                        }
                    });
                };
            });

            if (!rating) {
                rating = ratingValue;
            }

            //event listener for the submit button
            submitReviewButton.addEventListener("click", async (event) => {
                event.preventDefault();

                //grabbing comment and dateHike fields from the form
                let commentUpdated = document.querySelector('#edit-review-form textarea[name=comment]');
                let dateHikeUpdated = document.querySelector('#edit-review-form input[name=dateHike]');


                //send request to the database
                const res = await fetch(`/reviews/${reviewId}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        hikeId,
                        rating,
                        comment: commentUpdated.value,
                        dateHike: dateHikeUpdated.value,
                    }),
                });

                //response from the database
                const data = await res.json();


                //if response was successful
                if (data.message === 'Success') {

                    // grab the review fields from review card
                    const reviewRating = document.querySelector('.rating-username #rating');
                    const reviewComment = document.querySelector('#review .comment');
                    const reviewDateHike = document.querySelector('#review .dateHike');
                    const starRating = document.querySelector('#review .star-sprite');

                    //populate them with the saved data from the database
                    starRating.style = `width:${data.reviewToUpdate.rating / 5 * 100}%`;
                    reviewRating.innerHTML = data.reviewToUpdate.rating;

                    if (data.reviewToUpdate.comment) {
                        reviewComment.innerHTML = data.reviewToUpdate.comment;
                    }  else {
                        if (commentValue) {
                            reviewComment.innerHTML = commentValue;
                        }
                    }

                    if (data.reviewToUpdate.dateHike) {
                        reviewDateHike.value = data.reviewToUpdate.dateHike;
                    } else {
                        if (dateHikeValue) {
                            reviewDateHike.value = dateHikeValue;
                        }
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
                    const errorMessage = document.querySelector('#edit-review-form .errors');

                    //prepopulate the form and show error message
                    rating = data.reviewToUpdate.rating;
                    if (data.reviewToUpdate.comment) {
                        comment = data.reviewToUpdate.comment;
                    }
                    if (data.reviewToUpdate.dateHike) {
                        dateHike = data.reviewToUpdate.dateHike;
                    }
                    errorMessage.innerHTML = data.errors;

                }
            });
        })
    }
});
