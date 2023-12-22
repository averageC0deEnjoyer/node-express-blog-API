exports.checkTokenExist = (req, res, next) => {
  if (req.token) {
    return res.status(200).json({ message: 'Already Log In' });
  } else {
    next();
  }
};

//do i have to handle if client send req.body.username req.body.password with JWT authorization Bearer <token>
