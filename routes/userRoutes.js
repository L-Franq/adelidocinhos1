const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/login-cadastrar", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "public", "HTML", "loginCadastrar.html"));
});

router.get("/user", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "public", "HTML", "userDashboard"));
});

module.exports = router;