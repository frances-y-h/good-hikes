document.addEventListener("DOMContentLoaded", (event) => {
    //TOGGLE MODAL EVENT LISTENERS
    const toggles = document.querySelectorAll(".search-toggle");
    toggles.forEach((toggle) => {
        toggle.addEventListener("click", (event) => {
            //update the icon in the clicked button
            const currentIcon = document.querySelector(
                `button#${event.currentTarget.id} span`
            );

            if (currentIcon.innerText === "expand_more") {
                currentIcon.innerText = "expand_less";
                toggle.classList.toggle("btn-selected");
            } else {
                currentIcon.innerText = "expand_more";
                toggle.classList.toggle("btn-selected");
            }

            //update all other toggles to normal
            toggles.forEach((toggle) => {
                if (toggle.id !== event.currentTarget.id) {
                    toggle.classList.remove("btn-selected");
                }
            });

            //update the target modal class from hidden to visible
            const menuModalTarget = document.querySelector(
                `button#${event.currentTarget.id} + .toggle-popup`
            );

            //if class is present remove it, if not present add it
            menuModalTarget.classList.toggle("hidden");

            //update all other modals to hidden
            const menuModals = document.querySelectorAll(`.toggle-popup`);
            menuModals.forEach((menuModal) => {
                if (menuModal.id !== menuModalTarget.id) {
                    //adds class to list if not already present
                    menuModal.classList.add("hidden");
                }
            });
        });
    });

    //TOGGLE MODAL SUBMIT EVENT LISTENERS
    const filters = document.querySelectorAll(".search-filters");
    filters.forEach((filter) => {
        filter.addEventListener("click", (event) => {
            event.preventDefault();

            /*
            intercept the form data, parse it out
            send a redirect to new search with form data in link
            backend:
            if filter selected, need to re-render page with form filled out
            */

            const forms = document.querySelectorAll("form.inner-popup");

            //create a boolean to check whether slider was clicked or not
            // const clickedId = event.currentTarget.id.split("menu-submit-")[1];
            // const clicked = {
            //     length: "false",
            //     elevationChange: "false",
            //     rating: "false",
            // };

            // if (clickedId === "length") {
            //     clicked.length = "true";
            // }
            // if (clickedId === "elevation") {
            //     clicked.elevationChange = "true";
            // }
            // if (clickedId === "rating") {
            //     clicked.rating = "true";
            // }

            //Create data map of all 8 filter toggles
            const data = {};

            for (let i = 0; i < forms.length; i++) {
                let form = forms[i];
                let formData = new FormData(form);

                for (let pair of formData.entries()) {
                    if ([...formData.entries()].length > 1) {
                        if (typeof data[pair[0]] !== "object") {
                            data[pair[0]] = {};
                        }
                        data[pair[0]][pair[1]] = pair[1];
                    } else {
                        data[pair[0]] = pair[1];
                    }
                }
            }

            // console.log(data);

            //need default value of ""
            const variables = ["", "", "", "", "", "", "", ""];
            const properties = [
                "sort",
                "difficulty",
                "length",
                "elevationChange",
                "routeType",
                "rating",
                "suitability",
                "attractions",
            ];

            for (let i = 0; i < variables.length; i++) {
                let prop = properties[i];
                if (data[prop]) {
                    if (typeof data[prop] === "object") {
                        const values = Object.values(data[prop]);
                        variables[i] = `&${prop}=${values.join("-")}`;
                    } else {
                        variables[i] = `&${prop}=${data[prop]}`;
                    }
                }
            }

            let sort = variables[0];
            let difficulty = variables[1];
            let length = variables[2];
            let elevation = variables[3]; //elevationChange
            let routeType = variables[4];
            let rating = variables[5];
            let suitability = variables[6];
            let attractions = variables[7];

            const searchBar = document.querySelector("#adv-search-input");

            const url =
                `/search?query=${searchBar.value}` +
                sort +
                difficulty +
                length +
                elevation +
                routeType +
                rating +
                suitability +
                attractions;

            //send user to proper search query:
            // window.location.href = url;
        });
    });

    //ELEVATION RANGE MODAL
    const elevationSlider = document.getElementById("elevation-range");
    const elevationMaxLabel = document.getElementById("elevation-max");
    const elevationSliderClear = document.querySelector(
        "#elevation-button + .toggle-popup .clear-filters"
    );

    // Display the default slider value
    elevationMaxLabel.innerHTML = `Max: ${elevationSlider.value}+ ft`;

    // Update the slider value (each time you drag the slider handle)
    elevationSlider.oninput = function () {
        //'this' will is the object that onclick was bound to aka event.currentTarget
        if (this.value === "5000") {
            elevationMaxLabel.innerHTML = `Max: ${this.value}+ ft`;
        } else {
            elevationMaxLabel.innerHTML = `Max: ${this.value} ft`;
        }
    };

    //Update Clear button functionality to reset to default value
    elevationSliderClear.addEventListener("click", (event) => {
        elevationMaxLabel.innerHTML = `Max: 5000+ ft`;
    });

    //LENGTH RANGE MODAL
    const lengthSlider = document.getElementById("length-range");
    const lengthMaxLabel = document.getElementById("length-max");
    const lengthSliderClear = document.querySelector(
        "#length-button + .toggle-popup .clear-filters"
    );

    // Display the default slider value
    lengthMaxLabel.innerHTML = `Max: ${lengthSlider.value}+ mi`;

    // Update the slider value (each time you drag the slider handle)
    lengthSlider.oninput = function () {
        //'this' will is the object that onclick was bound to aka event.currentTarget
        if (this.value === "50") {
            lengthMaxLabel.innerHTML = `Max: ${this.value}+ mi`;
        } else {
            lengthMaxLabel.innerHTML = `Max: ${this.value} mi`;
        }
    };

    // Update Clear button functionality to reset to default value
    lengthSliderClear.addEventListener("click", (event) => {
        lengthMaxLabel.innerHTML = `Max: 50+ mi`;
    });

    //RATING RANGE MODAL
    const ratingSlider = document.getElementById("rating-range");
    const ratingMaxLabel = document.getElementById("rating-label");
    const ratingSliderClear = document.querySelector(
        "#rating-button + .toggle-popup .clear-filters"
    );

    // Display the default slider value
    ratingMaxLabel.innerHTML = `Any`;

    // Update the slider value (each time you drag the slider handle)
    ratingSlider.oninput = function () {
        //'this' will is the object that onclick was bound to aka event.currentTarget
        if (this.value === "4") {
            ratingMaxLabel.innerHTML = `Any`;
        }
        if (this.value === "3") {
            ratingMaxLabel.innerHTML = `Over 3`;
        }
        if (this.value === "2") {
            ratingMaxLabel.innerHTML = `Over 4`;
        }
        if (this.value === "1") {
            ratingMaxLabel.innerHTML = `Over 4.5`;
        }
    };

    // Update Clear button functionality to reset to default value
    ratingSliderClear.addEventListener("click", (event) => {
        ratingMaxLabel.innerHTML = `Any`;
    });

    //ADVANCED SEARCH BUTTON
    const advSearch = document.querySelector("#adv-search-button");

    advSearch.addEventListener("click", async (event) => {
        event.preventDefault();

        const advSearchInput = document.querySelector("#adv-search-input");

        let searchQuery = advSearchInput.value;

        //Refreshes the page, sending a Route with user's query to the backend
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
