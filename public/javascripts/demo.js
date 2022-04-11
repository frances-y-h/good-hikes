const { User } = require("../../db/models");

const demo = document.querySelector("#user-demo");

demo.addEventListener("click", async (event) => {
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
            alert("Demo unavailable");
        }
    } catch (err) {
        console.error();
    }
});
