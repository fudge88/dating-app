const updateProfileById = (req, res) => {
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

module.export = { updateProfileById };
