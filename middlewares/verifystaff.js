const jwt = require("jsonwebtoken");

const verifyStaff = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "staffjdbinfotechsecuredatatech");

    req.staff = decoded; // 👈 staff data attach

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyStaff;