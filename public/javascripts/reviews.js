document.addEventListener('DOMContentLoaded', (e) => {
    console.log("hi from reviews.js")

    const reviewButton = document.querySelector('#review-btn')

    reviewButton.addEventListener("click", (event) => {
        const reviewForm = document.getElementById("review-form");
        reviewForm.classList.remove("hidden");
    });
});
