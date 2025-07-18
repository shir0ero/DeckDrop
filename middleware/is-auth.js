// middleware/is-auth.js

// This middleware function will protect our routes
module.exports = (req, res, next) => {
    // Check if the user is not logged in
    if (!req.session.isLoggedIn) {
        // If not logged in, redirect to the login page
        return res.redirect('/login');
    }
    // If the user is logged in, allow them to proceed
    next();
}