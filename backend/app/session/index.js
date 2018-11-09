var session 	= require('express-session');

/**
 * Initialize Session
 * Uses MongoDB-based session store
 *
 */
var init = function () {
	return session({
        path: '/',
        secret: 'very secret',
        saveUninitialized: false,
        resave:false
    });
}

module.exports = init();