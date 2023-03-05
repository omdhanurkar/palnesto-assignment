
const express = require('express');
const router = express.Router();
const { createUser, userLogin } = require('../controllers/userController')
const { create, view, edit }= require("../controllers/itineryController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/register", createUser)

router.post("/login", userLogin)

router.post("/create", create);
router.post("/edit/:id", edit);
router.get("/view/:id", view);


module.exports = router