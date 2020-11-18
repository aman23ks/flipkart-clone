const express = require("express");
const router = express.Router(); //Express router is a class which helps us to create router handlers. By router handler i mean to not just providing routing to our app but also can extend this routing to handle validation.
const User = require("../models/user");
const { signup, signin, requireSignin } = require("../controller/auth");

router.post("/signin", signin);

router.post("/signup", signup);

// //if a user is logged in  how he can navigate to some protected routes such as profile page or somewhere where he need to be a logged in user.
// router.post("/profile", requireSignin, (req, res) => {
//   //after calling the requireSignin the function will run to the next step as we called 'next' in requireSignin
//   res.status(200).json({ user: "profile" });
// });

module.exports = router;
