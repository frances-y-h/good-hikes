window.addEventListener("DOMContentLoaded", (event) => {
    const logoutButton = document.getElementById("user-logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", (event) => {
            window.alert("You are being logged out.");
        });
    }
});
