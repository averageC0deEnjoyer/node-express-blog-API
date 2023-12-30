// exports.checkTokenExist = (req, res, next) => {
//   if (req.token) {
//     return res.status(200).json({ message: 'Already Log In' });
//   } else {
//     next();
//   }
// };

//do i have to handle if client send req.body.username req.body.password with JWT authorization Bearer <token>
//maybe this one can be used, so if user hit the login POST endpoint with token, then verify token, if no user found from the token,
//continue to login/signuppage, if there exist token, then return response.
