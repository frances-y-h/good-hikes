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

            //call to the back end
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
            } 

        });
    }
});
