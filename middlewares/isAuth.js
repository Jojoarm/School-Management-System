const verifyToken = require('../utils/verifyToken');

const isAuth = (model) => {
  return async (req, res, next) => {
    // get token from header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(' ')[1];

    //verify the token
    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
      //find the user
      const user = await model
        .findById(verifiedToken.id)
        .select('name email role');
      //save the user into req.obj
      req.userAuth = user;
      next();
    } else {
      const err = new Error('Token expired/invalid');
      next(err);
    }
  };
};

module.exports = isAuth;
