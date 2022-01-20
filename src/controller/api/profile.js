const { User } = require("../../models");

const updateProfileById = async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      success: true,
      userData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to update user" });
  }
};

const getProfileById = async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    const user = userData.get({ plain: true });
    if (user) {
      return res.json({
        success: true,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        error: "User does not exist",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to get user data" });
  }
};

module.exports = { updateProfileById, getProfileById };
