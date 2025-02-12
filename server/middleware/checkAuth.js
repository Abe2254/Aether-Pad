// exports.isLoggedIn = function (req, res, next) {
//     console.log("Checking Auth: ", req.user); // Debugging
//     if (req.user) {
//       next();
//     } else {
//       return res.status(401).send('Access Denied');
//     }
//   };
  exports.isLoggedIn = function (req, res, next) {
    console.log("🔍 Checking Auth Middleware:");
    console.log("👉 Session Data:", req.session);
    console.log("👉 User Data:", req.user); // Check if this is undefined

    if (req.user) {
        next();
    } else {
        console.log("❌ Access Denied - User not authenticated");
        return res.status(401).send('Access Denied');
    }
};
