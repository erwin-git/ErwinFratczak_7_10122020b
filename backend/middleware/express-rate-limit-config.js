const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 30,
    message: "Authorized request limit reached for the IP."
});

module.exports = limiter;