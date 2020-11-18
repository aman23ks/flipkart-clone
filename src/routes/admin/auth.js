const express = require("express");
const router = express.Router(); //Express router is a class which helps us to create router handlers. By router handler i mean to not just providing routing to our app but also can extend this routing to handle validation.
const User = require("../../models/user");
const {
  signup,
  signin,
  requireSignin,
} = require("../../controller/admin/auth");

router.post("/admin/signin", signin);

router.post("/admin/signup", signup);

module.exports = router;
