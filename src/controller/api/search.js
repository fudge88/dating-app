const { User } = require("../../models");

const getRandomUser = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    const users = allUsers.map((user) => {
      return user.get({ plain: true });
    });

    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomUserIndex];

    const userData = {
      name: randomUser.name,
      age: randomUser.age,
      location: randomUser.location,
      id: randomUser.id,
      build: randomUser.build,
      height: randomUser.height,
      seriousness: randomUser.seriousness,
      about_me: randomUser.about_me,
    };

    res.json({ userData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to get user" });
  }
};

module.exports = { getRandomUser };
