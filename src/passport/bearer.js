const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { blockList } = require("../api/redis/block-list");

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const logout = await blockList.existsToken(token);

                if (logout === true) throw new Error("Tokem logout");
                
                const securetKey = process.env.SECURET_KEY;
                const payload = jwt.verify(token, securetKey);


                return done(null, payload, {token: token});
            } catch (error) {
                done(error);
            }
        }
    )
);

module.exports = passport