window.addEventListener("DOMContentLoaded", event => {
    const logoutButton = document.getElementById("user-logout");

    logoutButton.addEventListener("click", event => {
        console.log('you clicked log out, congrats');
    })
})