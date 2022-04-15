//creating a function for edit-buttons eventListeners
const addEditReviewEventHanlder = (editReviewBtn) => {

    //find hikeId
    const hikeId = document.querySelector(".hike-name").id.split("-")[1];

    //add eventListener to all edit buttons
    editReviewBtn.addEventListener('click', (event) => {

        //extracting values from the existing review
        const reviewId = event.target.id.split("-")[1];
        const reviewCard = document.getElementById(`reviewId-${reviewId}`);
        const ratingValue = reviewCard.querySelector(".review-rating").innerText;
        const commentValue = reviewCard.querySelector(".comment").innerText;
        const dateHikeValue = reviewCard.querySelector(".dateHike").innerText.split(" ")[2];
        const editReviewForm = document.getElementById(`edit-review-form-${reviewId}`);
        const bgModal = editReviewForm.parentNode;
        const errorMessage = editReviewForm.querySelector(`#edit-review-form-${reviewId} .errors`);

        // cancel and submit edit review buttons
        const cancelReviewButton = editReviewForm.querySelector("#edit-review-cancel");
        const submitReviewButton = editReviewForm.querySelector("#edit-review-submit");

        //show edit form
        editReviewForm.classList.remove("hidden");
        bgModal.classList.remove("hidden");

        //grabbing comment and dateHike fields from them edit form
        let commentField = editReviewForm.querySelector("textarea[name=comment]");
        let dateHikeField = editReviewForm.querySelector("input[name=dateHike]");
        let stars = editReviewForm.querySelectorAll(".star");

        //populate form fields with existing values
        if (commentValue.length === 0) {
            commentField.innerText = "";
        } else {
            commentField.innerText = commentValue;
        }
        if (!dateHikeValue) {
            dateHikeField.value = "";
        } else {
            dateHikeField.value = dateHikeValue;
        }

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

            commentField.value = commentValue;
            dateHikeField.value = dateHikeValue;
            errorMessage.innerHTML = "";

            //hiding the form
            editReviewForm.classList.add("hidden");
            bgModal.classList.add("hidden");
        });

        //closing the form when the user clicks outside of the form
        window.onclick = function (event) {
            if (event.target == bgModal) {
                stars.forEach(star => {
                    star.innerHTML = '&#9734';
                });

                commentField.value = commentValue;
                dateHikeField.value = dateHikeValue;

                editReviewForm.classList.add("hidden");
                bgModal.classList.add("hidden");
                errorMessage.innerHTML = "";
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
            const editFormData = new FormData(editReviewForm);
            let commentUpdated = editFormData.get("comment");
            let dateHikeUpdated = editFormData.get("dateHike");

            if (!commentUpdated.length) {
                commentUpdated = null;
            }

            if (!dateHikeUpdated.length) {
                dateHikeUpdated = null;
            }

            //send request to the database
            const res = await fetch(`/reviews/${reviewId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hikeId,
                    rating,
                    comment: commentUpdated,
                    dateHike: dateHikeUpdated,
                }),
            });

            //response from the database
            const data = await res.json();

            //if response was successful
            if (data.message === 'Success') {

                // grab the review fields from review card
                const reviewCard = document.querySelector(`#reviewId-${reviewId}`);
                const reviewRating = reviewCard.querySelector('.rating-username .review-rating');
                const reviewComment = reviewCard.querySelector('.comment');
                const reviewDateHike = reviewCard.querySelector('.dateHike');
                const starRating = reviewCard.querySelector('.star-sprite');

                //populate them with the saved data from the database
                starRating.style = `width:${data.reviewToUpdate.rating / 5 * 100}%`;
                reviewRating.innerText = data.reviewToUpdate.rating;

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
                    reviewDateHike.innerHTML = `<span> Date hiked ${data.reviewToUpdate.dateHike}</span>`;
                } else {
                    if (dateHikeValue) {
                        reviewDateHike.innerHTML = `<span>Date hiked ${dateHikeValue}</span>`;
                    }
                }

                //resetting review form fields
                stars.forEach(star => {
                    star.innerHTML = '&#9734';
                });
                comment.value = "";
                dateHike.value = "";

                //hiding the form
                editReviewForm.classList.add("hidden");
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
                errorMessage.innerHTML = data.errors.map(
                    message => `
                                    <div style="margin-bottom: 5px">
                                        ${message}
                                    </div>
                                `
                ).join("");

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
