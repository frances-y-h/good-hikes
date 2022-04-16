document.addEventListener("DOMContentLoaded", (event) => {
    //Demo login Event Listener
    const demoUser = document.querySelector("#user-demo");

    if (demoUser) {
        demoUser.addEventListener("click", async (event) => {
            const body = {
                email: "ilovesnowpatrol@alec.com",
                password: "I<3ChasingCars!",
            };

            try {
                const res = await fetch("/users/login/demo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!res.ok) {
                    alert("Demo User Unavailable");
                } else {
                    window.location.href = "/";
                }
            } catch (err) {
                console.error();
            }
        });
    }
});
