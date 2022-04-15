// function to add event handler to delete review button
const addDeleteReviewEventHandler = (deleteReviewButton) => {

    //getting hikeId from the page
    const hikeId = document.querySelector('.hike-name').id.split("-")[1];

    // adding event handler to delete review button
    deleteReviewButton.addEventListener('click', (event) => {
        event.preventDefault();

        //getting reviewId from the page
        const reviewId = event.target.id.split("-")[1];

        //getting delete form from the page
        const deleteForm = document.getElementById(`delete-review-form-${reviewId}`);
        //getting background modal from the page
        const bgModal = deleteForm.parentNode;

        //showing the form for deleting
        deleteForm.classList.remove("hidden");
        bgModal.classList.remove("hidden");

        //grabbing cancel and delete buttons from the form
        const cancelDeleteReviewButton = deleteForm.querySelector("#delete-review-cancel");
        const submitDeleteReviewButton = deleteForm.querySelector("#delete-review-submit");

        // adding event handler to cancel button
        cancelDeleteReviewButton.addEventListener("click", (event) => {
            event.preventDefault();

            deleteForm.classList.add("hidden");
            bgModal.classList.add("hidden");
        });

        //closing the form when the user clicks outside of the form
        window.onclick = function (event) {
            if (event.target == bgModal) {
                deleteForm.classList.add("hidden");
                bgModal.classList.add("hidden");
            }
        };

        //adding event handler to submit(delete) button
        submitDeleteReviewButton.addEventListener("click", async (event) => {
            event.preventDefault();

            //request for delete selected post
            const res = await fetch(`/reviews/${reviewId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hikeId })
            })

            //response from server
            const data = await res.json();

            if (data.message === "Success") {

                //grabbing array of new reviews from response
                let reviewsToUpdate = data.reviewsUpdated;

                //grabbing reviews container from the page
                const reviewsContainer = document.querySelector('.reviews-container');

                //deleting all the previous reviews on the page
                reviewsContainer.innerHTML = "";

                //looping through the array of new reviews
                reviewsToUpdate.forEach((reviewToUpdate) => {

                    //grabbing template for reviews from the template
                    const reviewTemplate = document.querySelector(".review-template");

                    //clonong the template
                    const newReview = reviewTemplate.cloneNode(true);

                    //grabbing the review fields from the cloned template
                    const username = newReview.querySelector(".username");
                    const starsSprite = newReview.querySelector(".star-sprite");
                    const rating = newReview.querySelector(".review-rating");
                    const comment = newReview.querySelector(".comment");
                    const dateHike = newReview.querySelector(".dateHike");
                    const deleteReviewButton = newReview.querySelector(".delete-review");
                    const editReviewButton = newReview.querySelector(".edit-review");
                    const editReviewForm = newReview.querySelector(".edit-review-form");
                    const deleteReviewForm = newReview.querySelector(".delete-review-form");

                    // adding necessary attributes and data to the review fields
                    newReview.id = `reviewId-${reviewToUpdate.id}`;
                    newReview.classList.remove("hidden");
                    newReview.classList.remove("review-template");
                    newReview.classList.add("review");

                    username.setAttribute("id", `${reviewToUpdate.userId}`);
                    username.innerHTML = reviewToUpdate.User.username;

                    starsSprite.style = `width:${reviewToUpdate.rating / 5 * 100}%`;

                    rating.innerHTML = reviewToUpdate.rating;

                    if (reviewToUpdate.comment) {
                        comment.innerText = reviewToUpdate.comment;
                    } else {
                        comment.value = "";
                    }

                    if (reviewToUpdate.dateHike) {
                        dateHike.innerHTML = `Date hiked ${reviewToUpdate.dateHike}`;
                    } else {
                        dateHike.innerHTML = "";
                    }

                    deleteReviewButton.id = `delete-${reviewToUpdate.id}`;
                    editReviewButton.id = `edit-${reviewToUpdate.id}`;

                    // if user is logged in and is the owner of the review
                    // then show the delete and edit buttons
                    if (data.loggedInUserId !== reviewToUpdate.userId) {
                        editReviewButton.innerHTML = "";
                        deleteReviewButton.innerHTML = "";
                    } else {
                        addEditReviewEventHanlder(editReviewButton);
                        addDeleteReviewEventHandler(deleteReviewButton);
                    }

                    editReviewForm.id = `edit-review-form-${reviewToUpdate.id}`;
                    deleteReviewForm.id = `delete-review-form-${reviewToUpdate.id}`;

                    //adding the new review to the reviews container
                    reviewsContainer.append(newReview);
                });

            }
        });
    });
};


window.addEventListener('DOMContentLoaded', (e) => {

    // adding event Listeners to all edit buttons edit buttons
    const deleteReviewBtns = document.querySelectorAll('.delete-review');
    for (let i = 0; i < deleteReviewBtns.length; i++) {
        let deleteReviewBtn = deleteReviewBtns[i];
        addDeleteReviewEventHandler(deleteReviewBtn);
    };

});
