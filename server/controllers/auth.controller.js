const User = require("../models/user");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  try {
    let token;
    const { phone } = req.body;
    const user = await User.findOne({ phone });
    if (user) {
      token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
     return res.status(200).json({ token });
    }
    const newUser = new User ({phone})
    await newUser.save()
    token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Login Failed" });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "phone verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "phone Verificatioion Failed" });
  }
};

module.exports = {
  verifyToken,
  login,
};
