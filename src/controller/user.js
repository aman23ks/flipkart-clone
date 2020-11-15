const User = require("../models/user");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered", //the messages written everywhen will be shown on postman as a server side message.
      });
  });

  const { firstName, lastName, email, password } = req.body;
  const _user = new User({
    firstName,
    lastName,
    email,
    password,
    username: Math.random().toString(),
  });

  _user.save((error, data) => {
    //all the data entered by user firstName,lastName,email,password,username,timestamps,role etc. all will be saved in a variable data. user:data called below visualizes the api in postman.
    if (error) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
    if (data) {
      return res.status(201).json({
        //user: data, //after running on postman you'll see all the data entered by the user
        message: "User created Successfully..!",
      });
    }
  });
};
