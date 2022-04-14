document.addEventListener("DOMContentLoaded", (e) => {

    //grab the buttons and input fields for the edit form


    const renameBtns = document.querySelectorAll('.btn-rename');
    const updateBtns = document.querySelectorAll(".btn-update");
    const cancelBtns = document.querySelectorAll(".btn-cancel");
    const renameInputs = document.querySelectorAll(".input-rename");
    const pNames = document.querySelectorAll(".p-table");

    console.log(renameBtns);
    console.log(updateBtns);
    console.log(cancelBtns);
    console.log(renameInputs);
    console.log(pNames);

    for (let i = 0; i < renameBtns.length; i++) {
        renameBtns[i].addEventListener("click", (renameEvent) => {
			renameEvent.preventDefault();
			console.log(event.target);
			updateBtns[i].classList.remove("hidden");
			cancelBtns[i].classList.remove("hidden");
			renameInputs[i].classList.remove("hidden");
			renameBtns[i].classList.add("hidden");
            pNames[i].classList.add("hidden");

				const collectionId = renameEvent.target.id.split("-")[0];

				console.log('---------');
				console.log(collectionId);

            updateBtns[i].addEventListener("click", (upEvent) => {
			    // upEvent.preventDefault();
            });

            cancelBtns[i].addEventListener("click", (cancelEvent) => {
                cancelEvent.preventDefault();
                updateBtns[i].classList.add("hidden");
                cancelBtns[i].classList.add("hidden");
                renameInputs[i].classList.add("hidden");
                renameBtns[i].classList.remove("hidden");
                pNames[i].classList.remove("hidden");
            });

		})
    }



    // renameBtns.addEventListener("mouseover", (event) => {
    //     event.preventDefault();
        
    //     console.log(event.target);

	// 	updateBtn.classList.remove("hidden");
	// 	cancelBtn.classList.remove("hidden");
	// 	renameInput.classList.remove("hidden");
	// 	renameBtn.classList.add("hidden");

	// 	// const collectionId = event.target.id.split("-")[0];

	// 	//     console.log('---------');
	// 	//     console.log(collectionId);

	// 	updateBtn.addEventListener("click", (upEvent) => {
	// 		upEvent.preventDefault();
    //         // console.log('*-=*-=*-=*-=*-=*-=*-=*',collectionId);
	// 	});

	// 	cancelBtn.addEventListener("click", (cancelEvent) => {
	// 		cancelEvent.preventDefault();
	// 		updateBtn.classList.add("hidden");
	// 		cancelBtn.classList.add("hidden");
	// 		renameInput.classList.add("hidden");
	// 		renameBtn.classList.remove("hidden");
	// 	});
	// });



});


//grab the modal background and form
// const bgModal = document.querySelector(".bg-modal");
// const renameForm = document.querySelector("rename-form");

// //grab the buttons related to edit name functionality
// const openRenameBtn = document.getElementById("btn-rename");
// const submitRenameBtn = document.getElementById("rename-collection-button");
// const cancelRenameBtn = document.getElementById("cancel-collection-button");

// const renameTitle = document.getElementById("rename-title");

// //upon click of the rename, modal and form are revealed
// openRenameBtn.addEventListener("click", (event) => {
//     //capture the collection id and name
//     const collectionId = event.target.id.split('-')[0];
    
//     console.log('---------');
//     console.log(collectionId);

//     // const collectionName = await 

//     renameTitle.innerText = `Renaming collection ${collectionId}`;

    
//     //reveal the modal and form
//     bgModal.classList.remove("hidden");
//     renameForm.classList.remove("hidden");
// })
