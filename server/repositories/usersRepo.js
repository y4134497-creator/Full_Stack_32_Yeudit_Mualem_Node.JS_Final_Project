const { User } = require('../models/models');

const getAllUsers = async () => {
  return await User.find({});
};
const getUserById =async (id) => {
  return await User.findById(id);
};
const updateUser = async (id,NumOfActions) => {
  return await User.findByIdAndUpdate(id, {NumOfActions},{ new: "after" });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
};