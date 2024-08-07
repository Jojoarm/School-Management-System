const roleRestriction = (...roles) => {
  return async (req, res, next) => {
    //Find the user
    if (!roles.includes(req.userAuth.role)) {
      throw new Error('You do not have permission to perform this action');
    }
    next();
  };
};

module.exports = roleRestriction;
