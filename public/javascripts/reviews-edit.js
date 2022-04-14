//creating a function for edit-buttons eventListeners
const addEditReviewEventHanlder = (editReviewBtn) => {

    //find hikeId
    const hikeId = document.querySelector(".hike-name").id.split("-")[1];

    //add eventListener to all edit buttons
    editReviewBtn.addEventListener('click', (event) => {

        //extracting values from the existing review
        const reviewData = (event.target.parentNode.parentNode).innerText;
        const partsOfReview = reviewData.split("\n");
        const ratingValue = partsOfReview[1];
        const commentValue = partsOfReview[2];
        const dateHikeValue = partsOfReview[3].split(" ")[2];
        const reviewId = event.target.id.split("-")[1];
        const reviewForm = document.getElementById(`edit-review-form-${reviewId}`);
        const bgModal = reviewForm.parentNode;
        const errorMessage = document.querySelector(`#edit-review-form-${reviewId} .errors`);

        // cancel and submit edit review buttons
        const cancelReviewButton = reviewForm.querySelector("#edit-review-cancel");
        const submitReviewButton = reviewForm.querySelector("#edit-review-submit");

        //show edit form
        reviewForm.classList.remove("hidden");
        bgModal.classList.remove("hidden");

        //grabbing comment and dateHike fields from them edit form
        let commentField = document.querySelector(`#edit-review-form-${reviewId} textarea[name=comment]`);
        let dateHikeField = document.querySelector(`#edit-review-form-${reviewId} input[name=dateHike]`);
        let stars = document.querySelectorAll(`#edit-review-form-${reviewId} .star`);

        //populate form fields with existing values
        if (commentValue === "Delete") {
            commentField.innerText = "";
        } else {
            commentField.innerText = commentValue;
        }
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
            errorMessage.innerHTML = "";


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
                errorMessage.innerHTML = "";


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
            let commentUpdated = document.querySelector(`#edit-review-form-${reviewId} textarea[name=comment]`);
            let dateHikeUpdated = document.querySelector(`#edit-review-form-${reviewId} input[name=dateHike]`);


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
                const reviewCard = document.querySelector(`#reviewId-${reviewId}`);
                const reviewRating = reviewCard.querySelector('.rating-username #rating');
                const reviewComment = reviewCard.querySelector('.review .comment');
                const reviewDateHike = reviewCard.querySelector('.review .dateHike');
                const starRating = reviewCard.querySelector('.review .star-sprite');

                //populate them with the saved data from the database
                starRating.style = `width:${data.reviewToUpdate.rating / 5 * 100}%`;
                reviewRating.innerHTML = data.reviewToUpdate.rating;

                if (data.reviewToUpdate.comment) {
                    reviewComment.innerHTML = data.reviewToUpdate.comment;
                } else {
                    if (commentValue) {
                        reviewComment.innerHTML = commentValue;
                    } else {
                        reviewComment.innerHTML = "";
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

window.addEventListener('DOMContentLoaded', (e) => {

    // adding event Listeners to all edit buttons edit buttons
    const editReviewBtns = document.querySelectorAll('.edit-review');
    for (let i = 0; i < editReviewBtns.length; i++) {
        let editReviewBtn = editReviewBtns[i];
        addEditReviewEventHanlder(editReviewBtn)
    }
});
