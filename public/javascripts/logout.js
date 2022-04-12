window.addEventListener("DOMContentLoaded", event => {
    const logoutButton = document.getElementById("user-logout");

    logoutButton.addEventListener("click", event => {
        window.alert("You are being logged out.");
    })
})