document.addEventListener("DOMContentLoaded", async (e) => {


	//grab the buttons for all the available collections
	const deleteBtns = document.querySelectorAll(".btn-delete");


    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener("click", async (deleteEvent) => {
            //prevent form submission
            deleteEvent.preventDefault();

            //where you will pop up and or whatever with the modal

            const collectionId = deleteEvent.target.id.split('-')[0];
            const collectionHikeCount = parseInt(deleteEvent.target.id.split("-")[5], 10);

            console.log('id', collectionId);
            console.log("hike count", collectionHikeCount);
            console.log("hike count type", typeof(collectionHikeCount));

            const res = await fetch(`/collections/${collectionId}`, {
                    method: 'DELETE'
                }
                );

            const data = await res.json();

            //if response was successful
            if (data.message === "Success") {

                //select the row to hide from view
                const collectionRow = document.querySelector(`.row-${collectionId}`);
                collectionRow.remove();
                // collectionRow.classList.add("hidden");

            }


        });
    }

	// 			//if response was successful
	// 			if (data.message === "Success") {
	// 				//take the display text for the collection name
	// 				//fill in with the new name
	// 				pNames[i].innerText = `${data.collection.name}`;

	// 				//hide and unhide to reset view
	// 				updateBtns[i].classList.add("hidden");
	// 				c
	// 			} else {
	// 				//if response was unsuccessful

	// 				// const updateError = document.querySelector(".update-name-errors");

	// 				//fill form back in
	// 				renameInputs[i].value = currentName;
	// 				updateError.innerHTML = `<div class="div-errors">
    //                 <p> The following error(s) occurred:</p>
    //                 <ul>
    //                     <li> ${data.errors}</li>
    //                 </ul>
    //                 </div>
    //                 `;
	// 			}
	// 		});
	// 	});
	// }








});
