import userServiece from "../services/userService";
let handlelogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userServiece.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
module.exports = {
  handlelogin: handlelogin,
};

// check email exist
// compare password
// return userInfor
// access_token:JWT
