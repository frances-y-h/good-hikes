//updated from window "load" event to document "DOMContentloaded"
document.addEventListener("DOMContentloaded", (event) => {
    //Demo login Event Listener
    const demoUser = document.querySelector("#user-demo");
    demoUser.addEventListener("click", async (event) => {
        const body = {
            email: "ilovesnowpatrol@alec.com",
            password: "I<3ChasingCars!",
        };

        try {
            const res = await fetch("/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                alert("Demo User Unavailable");
            }
        } catch (err) {
            console.error();
        }
    });

    //PLaceholder for other code
});

window.onload = () => {
    const cards = document.querySelectorAll(".top-rated-card");
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.addEventListener("click", (event) => {
            const hikeId = event.currentTarget.id.split("-")[1];
            window.location.href = `/hikes/${hikeId}`;
        });
    }
};
