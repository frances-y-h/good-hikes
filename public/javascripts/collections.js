document.addEventListener("DOMContentLoaded", () => {
    // only have event listeners if user is logged in
    const logOutBtn = document.getElementById("user-logout");
    if (logOutBtn) {
        const hikeId = document.querySelector(".hike-page").id.split("-")[1];
        const updateStatusDiv = document.querySelector(".update-status");
        const wantToHikeSpan = document.querySelector(".checkMk");
        const checkBoxDivs = document.querySelectorAll(".dropdown-item");
        const wantToHikeCkBx = checkBoxDivs[0].children[0];
        const dropdownModal = document.querySelector(".bg-modal-dropdown");

        //Quick add "Want To Hike"
        const wantToBtn = document.querySelector(".hike-coll-want");
        wantToBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const collectionId = document
                .querySelector(".coll-ckbx")
                .id.split("-")[1];
            try {
                // if want to hike was not checked
                if (wantToHikeSpan.innerText !== "✓") {
                    const res = await fetch(`/hikes/${hikeId}/collections`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify([[collectionId, true]]),
                    });
                    const data = await res.json();
                    if (data.message === "Success") {
                        updateStatusDiv.innerText = "Added to Want To Hike";
                        wantToHikeSpan.innerText = "✓";
                        wantToHikeCkBx.checked = true;
                    } else {
                        updateStatusDiv.innerText =
                            "Something went wrong. Please try again";
                    }
                } else {
                    const res = await fetch(`/hikes/${hikeId}/collections`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ collectionId }),
                    });
                    const data = await res.json();
                    if (data.message === "Success") {
                        updateStatusDiv.innerText = "Removed Want To Hike";
                        wantToHikeSpan.innerText = "";
                        wantToHikeCkBx.checked = false;
                    } else {
                        updateStatusDiv.innerText =
                            "Something went wrong. Please try again";
                    }
                }
            } catch (err) {
                console.error(err);
            }
        });

        // Dropdown menu toggle
        const menuBtn = document.querySelector(".hike-coll-arrow");
        const dropdownMenu = document.querySelector(".dropdown-menu");

        menuBtn.addEventListener("click", (ev) => {
            dropdownMenu.classList.remove("hidden");
            dropdownModal.classList.remove("hidden");
        });

        // Click on div and will update checkbox, instead of having to click exactly on the box

        for (let j = 0; j < checkBoxDivs.length; j++) {
            let checkBoxDiv = checkBoxDivs[j];
            let label = checkBoxDiv.children[1];
            let checkBox = checkBoxDiv.children[0];
            checkBoxDiv.addEventListener("click", (event) => {
                checkBox.checked = !checkBox.checked;
            });
            checkBox.addEventListener("click", (event) => {
                checkBox.checked = !checkBox.checked;
            });
            label.addEventListener("click", (event) => {
                checkBox.checked = !checkBox.checked;
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
            event.stopPropagation();
            const collectionInput = document.getElementById("add-new-coll");
            const newCollectionName = collectionInput.value;
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
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("dropdown-item");

                const newInput = document.createElement("input");
                newInput.classList.add("coll-ckbx");
                newInput.setAttribute("type", "checkbox");
                newInput.setAttribute("id", `collectionId-${collectionId}`);

                const newLabel = document.createElement("label");
                newLabel.classList.add("coll-label");
                newLabel.setAttribute("for", `collectionId-${collectionId}`);
                newLabel.innerText = collectionName;

                itemDiv.append(newInput);
                itemDiv.append(newLabel);
                collectionInput.value = "";
                collectionDropdown.append(itemDiv);
            } else {
                addNewCollectionTitle.innerText = data.message;
            }
        });

        // Event listener for adding hikes
        const addToCollection = document.getElementById("update-collect");

        addToCollection.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();
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
                    updateStatusDiv.innerText = "Collection(s) Updated!";
                } else {
                    updateStatusDiv.innerText =
                        "Something went wrong. Please try again";
                }
                dropdownModal.classList.add("hidden");
            } catch (err) {
                console.error(err);
            }
        });

        // If we click outside the menu, will close the menu

        window.onclick = function (event) {
            if (event.target == dropdownModal) {
                dropdownMenu.classList.add("hidden");
                dropdownModal.classList.add("hidden");
            }
        };
    }
});
