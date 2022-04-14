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
            modal3.classList.toggle("hidden");
        });

        // Click on div and will update checkbox, instead of having to click exactly on the box
        const checkBoxDivs = document.getElementsByClassName("dropdown-item");
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
        const collectionDropdown = document.querySelector(
            ".dropdown-collections"
        );
        addNewCollectionBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const newCollectionName =
                document.getElementById("add-new-coll").value;
            // specific route for api
            const res = await fetch(`/collections`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ collectionname: newCollectionName }),
            });
            const data = await res.json();
            if (data.message === "Success") {
                const collectionId = data.newCollection.id;
                const collectionName = data.newCollection.name;

                // get the dropdown divs
                const newDropdownDiv = checkBoxDivs[0].cloneNode(true);

                // Set correct ID and value for input and label
                newDropdownDiv.children[0].id = `collectionId-${collectionId}`;
                newDropdownDiv.children[1].id = `collectionId-${collectionId}`;
                newDropdownDiv.children[1].setAttribute(
                    "for",
                    `collectionId-${collectionId}`
                );
                newDropdownDiv.children[1].innerText = collectionName;
                collectionDropdown.append(newDropdownDiv);
            } else {
                addNewCollectionTitle.innerText = data.message;
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

        // If we click outside the menu, will close the menu
        const modal3 = document.querySelector(".bg-modal3");
        window.onclick = function (event) {
            if (event.target == modal3) {
                dropdownMenu.classList.add("hidden");
                modal3.classList.add("hidden");
            }
        };
    }
});
