document.addEventListener("DOMContentLoaded", () => {
    // only have event listeners if user is logged in
    const logOutBtn = document.getElementById("user-logout");
    if (logOutBtn) {
        const hikeId = document.querySelector(".hike-page").id.split("-")[1];
        const updateStatusDiv = document.querySelector(".update-status");
        const wantToHikeSpan = document.querySelector(".checkMk");

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
                    wantToHikeSpan.innerText = "✓";
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
            dropdownMenu.classList.toggle("hidden");
        });

        // window.onclick = function (event) {
        //     console.log(event.target);
        //     if (event.target !== dropdownMenu && event.target !== menuBtn) {
        //         dropdownMenu.classList.add("hide");
        //     }
        // };

        // Click on div and will update checkbox, instead of having to click exactly on the box
        const checkBoxDivs = document.querySelectorAll(".dropdown-item");
        for (let j = 0; j < checkBoxDivs.length; j++) {
            let checkBoxDiv = checkBoxDivs[j];
            checkBoxDiv.addEventListener("click", (event) => {
                checkBoxDiv.children[0].checked =
                    !checkBoxDiv.children[0].checked;
            });
        }

        // Add new collection
        const addNewCollectionBtn = document.getElementById("add-collection");
        const addNewCollectionTitle = document.querySelector(
            ".add-collection-title"
        );
        addNewCollectionBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const newCollectionName =
                document.getElementById("add-new-coll").value;
            // specific route for api
            const res = await fetch(`/collections`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCollectionName),
            });
            const data = await res.json();
            if (data.message === "Success") {
            } else if (data.message === "Duplicate") {
                addNewCollectionTitle.innerText =
                    "Collection Name already exists";
            } else {
                addNewCollectionTitle.innerText =
                    "Something went wrong, try again.";
            }
        });

        // Event listener for adding hikes
        const addToCollection = document.getElementById("update-collect");

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
                dropdownMenu.classList.add("hidden");
                if (data.message === "Success") {
                    if (collections[0][1] === true) {
                        wantToHikeSpan.innerText = "✓";
                    } else {
                        wantToHikeSpan.innerText = "";
                    }
                    updateStatusDiv.innerText = "Collection Updated!";
                } else {
                    updateStatusDiv.innerText =
                        "Something went wrong. Please try again";
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
});
