const addDeleteReviewEventHandler = (deleteReviewButton) => {

    // on the frontend, when the response is back:
    //grab reviews-container if do childNodes -- live collection
    //querySelectorAll -- static collection

    // iterate over the reviews
    //grab review card
    //clone it, fill with info from reviews array
    //add to the container -- perpend
    //delete last review card


    //if no close the popup
    const hikeId = document.querySelector('.hike-name').id.split("-")[1];

    deleteReviewButton.addEventListener('click', (event) => {
        event.preventDefault();

        const reviewId = event.target.id.split("-")[1];

        const deleteForm = document.getElementById(`delete-review-form-${reviewId}`);
        const bgModal = deleteForm.parentNode;

        deleteForm.classList.remove("hidden");
        bgModal.classList.remove("hidden");

        const cancelDeleteReviewButton = deleteForm.querySelector("#delete-review-cancel");
        const submitDeleteReviewButton = deleteForm.querySelector("#delete-review-submit");

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

        submitDeleteReviewButton.addEventListener("click", async (event) => {

            event.preventDefault();

            const res = await fetch(`/reviews/${reviewId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hikeId })
            })

            const data = await res.json();
            console.log(data.reviewsUpdated[0]);
            let reviewsToUpdate = data.reviewsUpdated;

            const reviewsContainer = document.querySelector('.reviews-container');
            reviewsContainer.innerHTML = "";

            reviewsToUpdate.forEach((reviewToUpdate) => {



                const reviewTemplate = document.querySelector(".review-template");
                const newReview = reviewTemplate.cloneNode(true);
                const username = newReview.querySelector(".username");
                const starsSprite = newReview.querySelector(".star-sprite");
                const rating = newReview.querySelector("#rating");
                const comment = newReview.querySelector(".comment");
                const dateHike = newReview.querySelector(".dateHike");
                const deleteReviewButton = newReview.querySelector(".delete-review");
                const editReviewButton = newReview.querySelector(".edit-review");
                const editReviewForm = newReview.querySelector(".edit-review-form");
                const deleteReviewForm = newReview.querySelector(".delete-review-form");

                newReview.id = `reviewId-${reviewToUpdate.id}`;
                newReview.classList.remove("hidden");
                newReview.classList.remove("review-template");
                newReview.classList.add("review");

                username.setAttribute("id", `${reviewToUpdate.userId}`);
                username.innerHTML = reviewToUpdate.User.username;

                starsSprite.style = `width:${reviewToUpdate.rating / 5 * 100}%`

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

                addEditReviewEventHanlder(editReviewButton);
                addDeleteReviewEventHandler(deleteReviewButton);

                editReviewForm.id = `edit-review-form-${reviewToUpdate.id}`;
                deleteReviewForm.id = `delete-review-form-${reviewToUpdate.id}`;

                reviewsContainer.append(newReview);
            });
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
