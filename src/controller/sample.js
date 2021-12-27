require("dotenv").config();
const { User, Match, UserMatch } = require("../models");

const getUserById = async (req, res) => {
  try {
    const userData = await User.findByPk(1, {
      include: [
        {
          model: Match,
          through: UserMatch,
          //   through: {
          //     attributes: ["match_request_from", "match_request_to"],
          // where: { match_request_status: "accepted" },
          // },
        },
      ],
    });

    const data = await User.findAll({
      include: [
        {
          model: Match,
          through: UserMatch,
          //   through: {
          //     attributes: ["match_request_from", "match_request_to"],
          // where: { match_request_status: "accepted" },
          // },
        },
      ],
    });

    console.log(JSON.parse(JSON.stringify(data)));
    // const userData = await User.findAll();
    console.log(JSON.parse(JSON.stringify(userData)));
    // if (data) {
    //   return res.json({ success: true, data });
    // }

    // return res
    //   .status(404)
    //   .json({ success: false, error: "Traveller does not exist" });
  } catch (error) {
    console.log(error);
    // logError("GET traveller by ID", error.message);
    // return res.status(500);
    //   .json({ success: false, error: "Failed to send response" });
  }
};

getUserById();
