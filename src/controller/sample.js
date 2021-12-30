const { User, Match, UserMatch } = require("../models");

// www.data.com/profile
const getUserById = async (req, res) => {
  try {
    const userInfo = await User.findByPk(1);

    const matches = await Match.findAll({
      where: {
        match_request_from: 1,
      },
      include: [
        {
          model: User,
        },
      ],
      raw: true,
    });

    // const userInfo = userInfoFromDB.get({ plain: true });
    // const matches = matchesFromDB.get({ plain: true });

    const templateData = {
      userInfo,
      matches,
    };

    // res.render("profile", templateData);
    console.log(templateData);
  } catch (error) {
    console.log(error);
    // logError("GET traveller by ID", error.message);
    // return res.status(500);
    //   .json({ success: false, error: "Failed to send response" });
  }
};

module.exports = { getUserById };
