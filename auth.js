const db = require("./db/models");

//function to persist a user's login state using a session
//Session data is not saved in the cookie itself, just the session ID.
//Session data is stored server-side.
//The default server-side session storage, MemoryStore, is purposely not designed
//for a production environment

function loginUser(req, res, user) {
    req.session.auth = {
        userId: user.id,
    };
}

//function to recover a user's info from the database if they are authenticated
async function restoreUser(req, res, next) {
    // Log session object to the console to assist with debugging.
    console.log(req.session);

    //check if .auth property exists, if so grab userID and fetch user
    if (req.session.auth) {
        const { userId } = req.session.auth;

        try {
            const user = await db.User.findByPk(userId);

            //res locals allows you to store data in response to pass along to next middleware
            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        } catch (err) {
            res.locals.authenticated = false; //indicate no authenticated users in current request
            next(err);
        }
    } else {
        res.locals.authenticated = false; //indicate no authenticated user in current request
        next();
    }
}

//function to logout a user, remover their auth from the session cookie
function logoutUser(req, res) {
    delete req.session.auth;
}

//function to check whether a authenticated user exists or not,
// if no, log in, if yes, then keep going along the route
function requireAuth(req, res, next) {
    if (!res.locals.authenticated) {
        res.redirect("/users/login");
    }
    return next();
}

module.exports = { loginUser, restoreUser, logoutUser, requireAuth };
