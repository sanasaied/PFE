

const Authorize = (Permissions) => {
    return async (req, res, next) => {
      if (Permissions.includes(req.user.role)) {
        next();
      } else {
        return res.status(401).json({message: "access denied", cause: "only users with roles " +Permissions+" are authorized"});
      }
    };
  };
module.exports = {Authorize}