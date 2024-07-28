const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.header('x-auth-token');
    if (!token) {
        return res.redirect('/api/auth/sign-in'); // Redirect to sign-in if no token is found
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/api/auth/sign-in'); // Redirect to sign-in if token is invalid
    }
};

// Middleware to prevent access to sign-in page if already signed in
const isAlreadyAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.header('x-auth-token');
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return res.redirect('/'); // Redirect to home if already signed in
        } catch (err) {
            // Token is invalid, proceed to sign-in page
        }
    }

    next();
};

module.exports = { isAuthenticated, isAlreadyAuthenticated };

