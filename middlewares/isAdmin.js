const User = require("../models/User.model");

const isAdmin = async (req, res, next) => {
  console.log("role", req.payload.role);
  try {
    const userRole = await User.findById(req.payload._id).select("role");
    if (userRole.role !== "admin") {
      res.status(500).json("Admin role required");
      return;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;