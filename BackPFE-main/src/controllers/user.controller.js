const userModel = require("../models/user.model");
const User = userModel.User;

const getAllUsers = async function (req, res) {
  const user = await User.find().sort(User.createdAt).exec();
  return res.status(200).json(user);
};
const getUserDetails = async(req, res) =>{
  const user =await  User.findById(req.params.id);
  if(user){
    return res.status(200).json(user);
  }
  return res.status(404).json({message: "User not found"});
}

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body,
    {
      returnOriginal: false,
    }, (error, result) => {
    if (error) {
      return res.status(error.code).json(error);
    }
    return res.status(200).json(result);
  });
};


module.exports = { getAllUsers, updateUser, getUserDetails };
