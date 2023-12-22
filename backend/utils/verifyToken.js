function verifyToken(req, res, next) {
  //process the headers and put token at req Obj
  if (req.headers.authorization !== undefined) {
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    req.token = token;
    next();
  } else {
    next();
  }
}

module.exports = verifyToken;
