const { Router } = require("express");

const router = Router({ caseSensitive: true });

router
    .get("/", (req, res) => {res.json({msg: "iae"})})

module.exports = router