const addDeleteReviewEventHandler = (deleteReviewButton) => {

    //event listeners on delete buttons

    //if yes, then delete it
    //fetch DELETE request to the database with reviewId
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
