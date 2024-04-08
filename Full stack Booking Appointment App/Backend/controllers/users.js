const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ allUsers: users });
  } catch (err) {
    console.log("Get User is failing", JSON.stringify(err));
    res.status(500).json({ error: err });
  }
};

exports.postAddUser = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new Error("Name is Mandatory");
    }

    if (!req.body.email) {
      throw new Error("Email is Mandatory");
    }

    if (!req.body.mobile) {
      throw new Error("Phone Number is Mandatory");
    }

    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;

    const userData = await User.create({
      name: name,
      email: email,
      mobile: mobile,
    });

    res.status(201).json({ newUserDetail: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (userId == "undefined") {
      console.log("ID is missing");
      return res.status(400).json({ err: "ID is missing" });
    }
    await User.destroy({ where: { id: userId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedMobile = req.body.mobile;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = updatedName;
    user.email = updatedEmail;
    user.mobile = updatedMobile;

    const result = await user.save();
    console.log("UPDATED USER!");

    res.status(200).json({ message: "User updated successfully", user: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};