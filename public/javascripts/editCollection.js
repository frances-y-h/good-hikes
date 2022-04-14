
document.addEventListener("DOMContentLoaded", async (e) => {

    //grab the buttons and input fields for the edit form
    const renameBtns = document.querySelectorAll('.btn-rename');
    const updateBtns = document.querySelectorAll(".btn-update");
    const cancelBtns = document.querySelectorAll(".btn-cancel");
    const renameInputs = document.querySelectorAll(".input-rename");
    const pNames = document.querySelectorAll(".p-table");

    //create button listener events for each of the rows in the table
    for (let i = 0; i < renameBtns.length; i++) {

        renameBtns[i].addEventListener("click", (renameEvent) => {
            //prevent form submission
            renameEvent.preventDefault();
			
            //on rename button click show
                //input form
                //update and cancel buttons
			updateBtns[i].classList.remove("hidden");
			cancelBtns[i].classList.remove("hidden");
			renameInputs[i].classList.remove("hidden");
            //hide the collection name text and rename button
			renameBtns[i].classList.add("hidden");
            pNames[i].classList.add("hidden");

            //save current collection name in case of any error handling
            currentName = pNames[i].innerText;

            const collectionId = renameEvent.target.id.split("-")[0];

            cancelBtns[i].addEventListener("click", (cancelEvent) => {
                cancelEvent.preventDefault();
                updateBtns[i].classList.add("hidden");
                cancelBtns[i].classList.add("hidden");
                renameInputs[i].classList.add("hidden");
                renameBtns[i].classList.remove("hidden");
                pNames[i].classList.remove("hidden");
            });
            
            updateBtns[i].addEventListener("click", async (upEvent) => {
                upEvent.preventDefault();
                
                const newName = renameInputs[i].value;

                console.log('new name', newName);

                const res = await fetch(`/collections/${collectionId}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json" },
                    body: JSON.stringify({
                        collectionname: newName,
                    }),
                });

                const data = await res.json();

                //if response was successful
                if (data.message === "Success") {
                    //take the display text for the collection name
                    //fill in with the new name
                    pNames[i].innerText = `${data.collection.name}`;
                    
                    //hide and unhide to reset view
                    updateBtns[i].classList.add("hidden");
                    cancelBtns[i].classList.add("hidden");
                    renameInputs[i].classList.add("hidden");
                    renameBtns[i].classList.remove("hidden");
                    pNames[i].classList.remove("hidden");


                } else {
                    //if response was unsuccessful
                    
                    const updateError = document.querySelector(".update-name-errors");

                    //fill form back in
                    renameInputs[i].value = currentName;
                    updateError.innerHTML = data.errors;
                }


            });
		})
    }






});



