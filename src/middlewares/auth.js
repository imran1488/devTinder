const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked");
  const token = "xyz";
  const isAdminAuthorized = token == "xyz";
  if (!isAdminAuthorized) {
    res.send(401).send("Unauthorized Admin");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  console.log("User auth is getting checked");
  const token = "xyzfaf";
  const isAdminAuthorized = token == "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthhorized User");
  } else {
    next();
  }
};
module.exports = {
  adminAuth,
  userAuth,
};
