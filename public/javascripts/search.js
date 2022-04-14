document.addEventListener("DOMContentLoaded", (event) => {
    //toggle modal
    const toggles = document.querySelectorAll(".search-toggle");

    toggles.forEach((toggle) => {
        toggle.addEventListener("click", (event) => {
            //update the icon in the clicked button
            const currentIcon = document.querySelector(
                `button#${event.currentTarget.id} span`
            );

            if (currentIcon.innerText === "expand_more") {
                currentIcon.innerText = "expand_less";
            } else {
                currentIcon.innerText = "expand_more";
            }

            //update the modal class from hidden to false
            const menuModal = document.querySelector(
                `button#${event.currentTarget.id} + .toggle-popup`
            );

            menuModal.classList.toggle("hidden");
        });
    });

    //Advanced Search Event Listener
    const advSearch = document.querySelector("#adv-search-button");

    advSearch.addEventListener("click", async (event) => {
        event.preventDefault();

        const advSearchInput = document.querySelector("#adv-search-input");

        const searchQuery = advSearchInput.value;

        //refreshes the page, sending a Route with user's query to the backend
        window.location.href = `/search?query=${searchQuery}`;

        ///API ROUTE, boilerplate
        // try {
        //     const res = await fetch(`/search/?query=${searchQuery}`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         // body: JSON.stringify(searchQuery),
        //     });

        //     console.log(res);

        //     if (!res.ok) {
        //         alert("Adv Search Unavailable");
        //     } else {
        //         window.location.href = `/search/?query=${searchQuery}`;
        //     }
        // } catch (err) {
        //     console.error();
        // }
    });

    //Placeholder for additional code
});
