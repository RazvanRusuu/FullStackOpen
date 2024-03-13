const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const Blog = require("../models/Blog");

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
  req.username = verifiedToken.username;

  next();
};

const blogVerifyUser = async (req, res, next) => {
  const userId = req.userId;
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);

  if (!blog.user || blog.user.toString() !== userId) {
    return res.status(403).json({
      status: "fail",
      message: "You are not allowed to do this action",
      data: { blog, userId },
    });
  }
  next();
};

const getTokenFrom = (req) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "");
  }
  return null;
};

module.exports = { verifyToken, blogVerifyUser };
