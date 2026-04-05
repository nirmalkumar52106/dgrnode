const jwt = require("jsonwebtoken");

const verifyAdminOrStaff = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 🔹 Try Admin/User Token
    try {
      const decodedUser = jwt.verify(
        token,
        "asdfghjiuwetyhbnergbh853njgsdfysf2wsedrfthghybn"
      );

      req.user = decodedUser; // admin/user data
      return next();

    } catch (err) {
      // ignore and try staff
    }

    // 🔹 Try Staff Token
    try {
      const decodedStaff = jwt.verify(
        token,
        "staffjdbinfotechsecuredatatech"
      );

      req.staff = decodedStaff; // staff data
      return next();

    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = verifyAdminOrStaff;