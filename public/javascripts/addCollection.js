document.addEventListener("DOMContentLoaded", () => {
    // const addCollectionFrmBtn = document.getElementById("collection-add");
    const ulCollection = document.getElementById("collection-list").children[1];
    const addCollectionFrm = document.querySelector(".new-collection-div");
    const addCollectionBtn = document.getElementById("add-collection");
    const addCollectionDesc = document.querySelector(".add-collection-desc");

    // Click to open mini form
    // addCollectionFrmBtn.addEventListener("click", (event) => {
    //     addCollectionFrm.classList.remove("hidden");
    //     addCollectionFrmBtn.classList.add("hidden");
    // });

    // Add new collection
    addCollectionBtn.addEventListener("click", async (event) => {
        const inputFiled = document.querySelector(".add-collection-input");
        const collectionname = inputFiled.value;
        const res = await fetch("/collections", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ collectionname }),
        });
        const data = await res.json();
        if (data.message === "Success") {
            const coll = data.newCollection;
            const newLi = document.createElement("li");
            newLi.innerHTML = `<a href="/collections/${coll.id}"> ${coll.name} (0)</a>`;
            ulCollection.append(newLi);
            inputFiled.value = "";
            addCollectionDesc.innerText = "";
        } else {
            addCollectionDesc.innerText = data.message;
        }
    });
});
