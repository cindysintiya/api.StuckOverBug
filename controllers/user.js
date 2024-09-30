const userModel = require("../models/user");

exports.login = (req, res) => {
  userModel
    .findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      if (user) {
        res.status(201).json({ message: "Login info matched.", value: user });
      } else {
        res.status(404).json({ message: "Wrong username or password. Please check again!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

exports.register = (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password,
    // password: bcrypt.hashSync(req.body.password, 8),
    profile: req.body.profile,
    realname: req.body.realname,
    email: req.body.email,
  });
  
  user
    .save()
    .then((user) => {
      res.status(200).json({ message: "User Registered Successfully", value: user });
    })
    .catch((err) => {
      if (err.message.toLowerCase().includes('duplicate key')) {
        return res.status(400).json({ message: "Please use another username or email to register your new account." });
      } else if (err.message.toLowerCase().includes('validation')) {
        return res.status(400).json({ message: "Please fill in your Registration info." });
      }
      res.status(500).json({ message: err.message });
    });
}