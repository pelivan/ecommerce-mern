exports.userSignupValidator = (req,res,next) => {
    req.check('name','Name is required').notEmpty();
    req.check('email','Email must be between 3 to 20 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must be in correct format')
    req.check('password','Password is required!').notEmpty();
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg) [0]
        return res.status(400).json({error:firstError});
    }
    next();
};