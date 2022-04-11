const csrf = require("csurf");
const { validationResult } = require("express-validator");

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) =>
    handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
    //generate error obj
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    } else {
        next();
    }
};

module.exports = {
    csrfProtection,
    asyncHandler,
    handleValidationErrors,
};
