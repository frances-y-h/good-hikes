document.addEventListener("DOMContentLoaded", (e) => {
    //getting all the form elements(form, review, cancel, submit buttons)
    const reviewForm = document.getElementById("review-form");
    const reviewButton = document.querySelector(".review-btn");
    const cancelReviewButton = document.querySelector("#review-cancel");
    const submitReviewButton = document.querySelector("#review-submit");
    //errors block
    const errorMessage = document.querySelector(".errors");

    //getting bg-modal for changing the background color
    const bgModal = document.querySelector(".bg-modal");

    const ifLoggedIn = reviewButton.getAttribute("data-user");
    //event listener to the Write review button
    reviewButton.addEventListener("click", (event) => {
        if (ifLoggedIn === "undefined") {
            window.location.href = '/users/login';
        } else {

            //showing form
            reviewForm.classList.remove("hidden");
            bgModal.classList.remove("hidden");

            //finding the hikeId for the review
            const hikeId = event.target.id.split("-")[2];

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
                reviewForm.classList.add("hidden");
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

                    reviewForm.classList.add("hidden");
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
                let comment = document.querySelector("textarea[name=comment]");
                let dateHike = document.querySelector("input[name=dateHike]");

                //send request to the database
                const res = await fetch(`/hikes/${hikeId}/reviews`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        hikeId,
                        rating,
                        comment: comment.value,
                        dateHike: dateHike.value,
                    }),
                });

                //response from the database
                const data = await res.json();

                //if response was successful
                if (data.message === "Success") {

                    //grabbing all review cards
                    const reviewCards = document.querySelectorAll(".reviews-container .review");

                    //creating new review card
                    const newReviewCard = reviewCards[0].cloneNode(true);

                    //adding id attribute to the new review card
                    newReviewCard.setAttribute("id", `reviewId-${data.review.id}`);


                    //find the edit button on the new review card
                    const editButton = newReviewCard.querySelector(".edit-review");
                    const deleteButton = newReviewCard.querySelector(".delete-review");

                    //adding id attribute to the edit button on the new review card
                    editButton.setAttribute("id", `edit-${data.review.id}`);
                    deleteButton.setAttribute("id", `delete-${data.review.id}`);

                    //finding edit form for the new review card
                    const hiddenForm = newReviewCard.querySelector(".edit-review-form");

                    //adding id attribute to the edit form on the new review card
                    hiddenForm.setAttribute("id", `edit-review-form-${data.review.id}`);

                    //adding event listener to the edit button on the new review card
                    addEditReviewEventHanlder(editButton);
                    addDeleteReviewEventHandler(deleteButton);

                    //adding new review card to the very top of the list on /hikes/:hikeId page
                    const allReviews = document.querySelector(".reviews-container");
                    allReviews.prepend(newReviewCard);

                    //grabbing updated review list
                    const reviewCardsList = document.querySelectorAll(".reviews-container .review");

                    // //removing last review if there are more than 10 reviews on the page
                    if (reviewCardsList.length + 1 > 10) {
                        reviewCardsList[0].parentNode.removeChild(reviewCardsList[10]);
                    };

                    // grab the review fields from review card
                    const reviewRating = document.querySelector(
                        ".rating-username #rating"
                    );
                    const reviewUsername = document.querySelector(
                        ".rating-username .username"
                    );
                    const reviewComment =
                        document.querySelector(".review .comment");
                    const reviewDateHike =
                        document.querySelector(".review .dateHike");

                    const starRating = document.querySelector(
                        ".review .star-sprite"
                    );

                    //populate them with the saved data from the database
                    starRating.style = `width:${(data.review.rating / 5) * 100}%`;
                    reviewUsername.innerHTML = data.user.username;
                    reviewRating.innerHTML = data.review.rating;

                    if (data.review.comment) {
                        reviewComment.innerHTML = data.review.comment;
                    } else {
                        reviewComment.innerHTML = "";
                    }


                    if (data.review.dateHike) {
                        reviewDateHike.innerText = `Date hiked ${data.review.dateHike}`;
                    } else {
                        reviewDateHike.innerText = "";
                    }



                    //resetting review form fields
                    stars.forEach((star) => {
                        star.innerHTML = "&#9734";
                    });
                    comment.value = "";
                    dateHike.value = "";

                    //hiding the form
                    reviewForm.classList.add("hidden");
                    bgModal.classList.add("hidden");
                } else {
                    //if response was unsuccessful
                    //prepopulate the form and show error message
                    rating = data.review.rating;
                    if (data.review.comment) {
                        comment = data.review.comment;
                    }
                    if (data.review.dateHike) {
                        dateHike = data.review.dateHike;
                    }
                    //show error message
                    errorMessage.innerHTML = data.errors;
                }
            });

        }
    });
});
