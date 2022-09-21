const UserModel = require("../models/user.models");

exports.createUser = async (req, res) => {
  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  await newUser.save();
 
};
