document.addEventListener("DOMContentLoaded", () => {
    const addToCollection = document.getElementById("add-collect");

    addToCollection.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            let collections = document.querySelectorAll(".coll-ckbx");
            collections = Array.from(collections).map((el) => {
                return [el.id.split("-")[1], el.checked];
            });
            const res = await fetch(``);
            console.log(JSON.stringify(collections));
        } catch (err) {
            console.error(err);
        }
    });
});
