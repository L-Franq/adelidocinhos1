const express = require("express");
const router = express.Router();
const path = require("path");
const middleware = require("../middleware/isUser")

router.get("/", middleware, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "calendario.html")
  );
});

module.exports = router;
 