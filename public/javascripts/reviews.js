document.addEventListener("DOMContentLoaded", (e) => {

    // get add review button
    const reviewButton = document.querySelector(".add-review-btn");

    // check if user is logged in and can add review
    const ifLoggedIn = reviewButton.getAttribute("data-user");

    //event listener to the Write review button
    reviewButton.addEventListener("click", (event) => {

        // after click if user is not logged in
        //redirect to login page
        if (ifLoggedIn === "undefined") {
            window.location.href = '/users/login';
        } else {

            //getting the add-review form
            const addReviewForm = document.getElementById("add-review-form");
            const bgModal = addReviewForm.parentNode;
            const cancelReviewButton = addReviewForm.querySelector("#add-review-cancel");
            const submitReviewButton = addReviewForm.querySelector("#add-review-submit");

            //errors block
            const errorMessage = addReviewForm.querySelector(".add-errors");

            //showing form
            addReviewForm.classList.remove("hidden");
            bgModal.classList.remove("hidden");

            //finding the hikeId for the review
            const hikeId = document.querySelector(".hike-name").id.split("-")[1];

            // add event listener to the cancel button
            cancelReviewButton.addEventListener("click", (event) => {
                event.preventDefault();

                //resetting review form fields
                stars.forEach((star) => {
                    star.innerHTML = "&#9734";
                });
                comment.value = "";
                dateHike.value = "";
                errorMessage.innerHTML = "";

                //hiding the form
                addReviewForm.classList.add("hidden");
                bgModal.classList.add("hidden");
            });

            //closing the form when the user clicks outside of the form
            window.onclick = function (event) {
                if (event.target == bgModal) {

                    //resetting review form fields
                    stars.forEach((star) => {
                        star.innerHTML = "&#9734";
                    });
                    comment.value = "";
                    dateHike.value = "";
                    errorMessage.innerHTML = "";

                    //hide the add-review form
                    addReviewForm.classList.add("hidden");
                    bgModal.classList.add("hidden");
                }
            };

            //building rating starts functionality in the review form
            let rating;
            const stars = document.querySelectorAll(".star");
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

            //event listener for the submit button
            submitReviewButton.addEventListener("click", async (event) => {
                event.preventDefault();

                //grabbing comment and dateHike fields from the form
                const addFormData = new FormData(addReviewForm);
                const comment = addFormData.get("comment");
                const dateHike = addFormData.get("dateHike");

                //send request to the database
                const res = await fetch(`/hikes/${hikeId}/reviews`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        hikeId,
                        rating,
                        comment,
                        dateHike
                    }),
                });

                //response from the database
                const data = await res.json();

                //data from response
                const reviewsNew = data.reviews;

                //if response was successful
                if (data.message === "Success") {

                    //grabbing reviews container from the page
                    const reviewsContainer = document.querySelector('.reviews-container');

                    //deleting all the previous reviews on the page
                    reviewsContainer.innerHTML = "";

                    //adding the new reviews to the page
                    //itereating through the reviews array
                    reviewsNew.forEach((review) => {

                        // data from the database for each review
                        const usernameNew = review.User.username;
                        const ratingNew = review.rating;
                        const commentNew = review.comment;
                        const dateHikeNew = review.dateHike;

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
                        newReview.id = `reviewId-${review.id}`;
                        newReview.classList.remove("hidden");
                        newReview.classList.remove("review-template");
                        newReview.classList.add("review");

                        username.setAttribute("id", `${review.userId}`);
                        username.innerHTML = usernameNew;

                        starsSprite.style = `width:${review.rating / 5 * 100}%`;

                        rating.innerHTML = ratingNew;

                        if (commentNew) {
                            comment.innerText = commentNew;
                        } else {
                            comment.value = "";
                        }

                        if (dateHikeNew) {
                            dateHike.innerHTML = `<span>Date hiked ${dateHikeNew}</span>`;
                        } else {
                            dateHike.innerHTML = "";
                        }

                        deleteReviewButton.id = `delete-${review.id}`;
                        editReviewButton.id = `edit-${review.id}`;

                        // if user is logged in and is the owner of the review
                        // then show the delete and edit buttons
                        if (data.loggedInUserId !== review.userId) {
                            editReviewButton.innerHTML = "";
                            deleteReviewButton.innerHTML = "";
                        } else {
                            addEditReviewEventHanlder(editReviewButton);
                            addDeleteReviewEventHandler(deleteReviewButton);
                        }

                        editReviewForm.id = `edit-review-form-${review.id}`;
                        deleteReviewForm.id = `delete-review-form-${review.id}`;

                        //adding the new review to the reviews container
                        reviewsContainer.append(newReview);

                        //resetting review form fields
                        stars.forEach((star) => {
                            star.innerHTML = "&#9734";
                        });

                        errorMessage.innerHTML = "";

                    });

                    addReviewForm.querySelector("#comment").value = "";
                    addReviewForm.querySelector("#dateHike").value = "";
                    rating = 0;
                    errorMessage.innerHTML = "";

                    //hiding the form
                    addReviewForm.classList.add("hidden");
                    bgModal.classList.add("hidden");
                } else {
                    //if response was unsuccessful
                    //prepopulate the form and show error message
                    rating = data.review.rating;
                    if (data.review.comment) {
                        addReviewForm.querySelector("#comment").value = data.review.comment;
                    }
                    if (data.review.dateHike) {
                        addReviewForm.querySelector("#dateHike").value = data.review.dateHike;
                    }
                    //show error message
                    errorMessage.innerHTML = data.errors.map(
                        message => `
                                    <div style="margin-bottom: 5px">
                                        ${message}
                                    </div>
                                `
                    ).join("");
                }
            });

        }
    });
});
