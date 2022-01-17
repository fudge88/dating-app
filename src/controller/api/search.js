const { Op } = require("sequelize");

const { User } = require("../../models");

const getRandomUser = async (req, res) => {
  try {
    const loggedUser = req.session.user.id;
    const userIdsToSkip = [...req.body.userIdsToSkip, loggedUser];
    const allUsers = await User.findAll({
      where: { id: { [Op.notIn]: userIdsToSkip } },
    });
    const users = allUsers.map((user) => {
      return user.get({ plain: true });
    });
    console.log(users);
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomUserIndex];
    if (randomUser) {
      const userData = {
        name: randomUser.name,
        age: randomUser.age,
        img: randomUser.img,
        location: randomUser.location,
        id: randomUser.id,
        build: randomUser.build,
        height: randomUser.height,
        seriousness: randomUser.seriousness,
        aboutMe: randomUser.aboutMe,
      };

      return res.json({ success: true, data: userData });
    }
    return res.json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to get user" });
  }
};

module.exports = { getRandomUser };
