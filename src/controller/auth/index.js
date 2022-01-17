const {
  getPayloadWithValidFieldsOnly,
  isAllRequiredFieldsPresent,
} = require("../../helpers");
const User = require("../../models/User");

const login = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ["email", "password"],
      req.body
    );

    if (Object.keys(payload).length !== 2) {
      console.log("[ERROR]: Failed to login | Invalid fields");
      return res.status(400).json({
        success: false,
        error: "Failed to login",
      });
    }

    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      console.log("[ERROR]: Failed to login | User does not exist");
      return res.status(404).json({
        success: false,
        error: "Failed to login",
      });
    }

    const validPassword = await user.checkPassword(payload.password);

    if (!validPassword) {
      console.log("[ERROR]: Failed to login | User not authorized");
      return res.status(401).json({
        success: false,
        error: "Failed to login",
      });
    }

    const userInSession = {
      id: user.get("id"),
      email: user.get("email"),
      name: user.get("name"),
      // get more from user model if needed here
    };

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = userInSession;

      return res.json({ success: true, data: "Login successful" });
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);
    return res.status(500).json({ success: false, error: "Failed to login" });
  }
};

const signup = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      [
        "name",
        "email",
        "password",
        "confirmPassword",
        "age",
        "location",
        "gender",
        "sexuality",
        "aboutMe",
        "height",
        "build",
        "seriousness",
      ],
      req.body
    );

    if (
      !isAllRequiredFieldsPresent(
        [
          "name",
          "email",
          "password",
          "confirmPassword",
          "age",
          "location",
          "gender",
          "sexuality",
          "aboutMe",
          "height",
          "build",
          "seriousness",
        ],
        payload
      )
    ) {
      console.log("[ERROR]: Failed to sign up | Invalid fields");
      return res.status(400).json({
        success: false,
        error: "Failed to sign up",
      });
    }

    await User.create(payload);

    return res.json({ success: true, data: "Successfully Created a user" });
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    return res.status(500).json({ success: false, error: "Failed to sign up" });
  }
};

const logout = (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      return res.json({ success: true, data: "Successfully logged out" });
    });
  } else {
    return res.status(404).json({
      success: false,
      error: "Cannot logout when you are not logged in",
    });
  }
};

module.exports = { login, signup, logout };
