const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const verifyToken = async (req, res, next) => {
  const token = getTokenFrom(req);
  //   const cookies = req.get("cookie");
  //   const splitCookies = cookies.split("; ");
  //   const jwtCookieFull = splitCookies.find((cookie) =>
  //     cookie.includes("blog_auth")
  //   );
  //   const jwtCookie = jwtCookieFull.split("=")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const verifiedToken = jwt.verify(token, JWT_SECRET);

  if (!verifiedToken.id) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.userId = verifiedToken.id;

  next();
};

const getTokenFrom = (req) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "");
  }
  return null;
};

module.exports = { verifyToken };
