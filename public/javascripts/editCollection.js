document.addEventListener("DOMContentLoaded", async (e) => {

    //grab the modal background and form
    const bgModal = document.querySelector(".bg-modal");
    const renameForm = document.querySelector("rename-form");
    
    //grab the buttons related to edit name functionality
    const openRenameBtn = document.getElementById("btn-rename");
    const submitRenameBtn = document.getElementById("rename-collection-button");
    const cancelRenameBtn = document.getElementById("cancel-collection-button");
    
    const renameTitle = document.getElementById("rename-title");

    //upon click of the rename, modal and form are revealed
    openRenameBtn.addEventListener("click", (event) => {
        //capture the collection id and name
        const collectionId = event.target.id.split('-')[0];
        
        console.log('---------');
        console.log(collectionId);

        // const collectionName = await 

        renameTitle.innerText = `Renaming collection ${collectionId}`;

        
        //reveal the modal and form
        bgModal.classList.remove("hidden");
        renameForm.classList.remove("hidden");
    })


});


