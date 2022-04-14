document.addEventListener("DOMContentLoaded", () => {
    const hikeId = document.querySelector(".hike-page").id.split("-")[1];
    const updateStatusDiv = document.querySelector(".update-status");

    //Quick add "Want To Hike"
    const wantToBtn = document.querySelector(".hike-coll-want");
    wantToBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const collectionId = document
            .querySelector(".coll-ckbx")
            .id.split("-")[1];
        try {
            const res = await fetch(`/hikes/${hikeId}/collections`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([[collectionId, true]]),
            });
            const data = await res.json();
            if (data.message === "Success") {
                updateStatusDiv.innerText = "Added to Want To Hike";
            } else {
                updateStatusDiv.innerText =
                    "Something went wrong. Please try again";
            }
        } catch (err) {
            console.error(err);
        }
    });

    // Dropdown menu toggle
    const menuBtn = document.querySelector(".hike-coll-arrow");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    menuBtn.addEventListener("click", (ev) => {
        dropdownMenu.classList.toggle("hide");
    });

    // window.onclick = function (event) {
    //     console.log(event.target);
    //     if (event.target !== dropdownMenu && event.target !== menuBtn) {
    //         dropdownMenu.classList.add("hide");
    //     }
    // };
    // Event listener for adding hikes
    const addToCollection = document.getElementById("add-collect");

    addToCollection.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            let collections = document.querySelectorAll(".coll-ckbx");
            collections = Array.from(collections).map((el) => {
                return [el.id.split("-")[1], el.checked];
            });
            const res = await fetch(`/hikes/${hikeId}/collections`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(collections),
            });
            const data = await res.json();
            dropdownMenu.classList.add("hide");
            if (data.message === "Success") {
                updateStatusDiv.innerText = "Collection Updated!";
            } else {
                updateStatusDiv.innerText =
                    "Something went wrong. Please try again";
            }
        } catch (err) {
            console.error(err);
        }
    });
});
