const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is my web chat, was written websocket");
});

module.exports = router;