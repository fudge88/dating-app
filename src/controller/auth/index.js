const { getPayloadWithValidFieldsOnly } = require("../../helpers");
const User = require("../../models/User");

const login = (req, res) => {
  res.render("login");
};

const signup = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ["name", "email", "password", "age", "location"],
      req.body
    );

    if (Object.keys(payload).length !== 5) {
      return res.status(400).json({
        success: false,
        error: "Please provide the valid fields in your body",
      });
    }

    await User.create(payload);

    return res.json({ success: true, data: "Successfully Created a user" });
  } catch (error) {
    console.log(`[ERROR]: Create user failed | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create user" });
  }
};

const logout = (req, res) => {
  res.render("logout");
};

module.exports = { login, signup, logout };
