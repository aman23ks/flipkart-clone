const express = require("express");
const router = express.Router(); //Express router is a class which helps us to create router handlers. By router handler i mean to not just providing routing to our app but also can extend this routing to handle validation.
const User = require("../../models/user");
const { signup, signin } = require("../../controller/admin/auth");
const {
  isRequestValidated,
  validateSignupRequest,
  validateSigninRequest,
} = require("../../validators/auth");

router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

module.exports = router;
