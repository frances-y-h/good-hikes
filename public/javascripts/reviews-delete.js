const addDeleteReviewEventHandler = (deleteReviewButton) => {

    //on the backend:
    // find by pk review,
    //   destroy it
    // find 10 latest reviews
    // send the response sucsessful + array of latest reviews

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
            console.log(data);
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
