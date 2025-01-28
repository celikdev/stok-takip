import jwt from "jsonwebtoken";

const SECRET_KEY = "secretkey";

export const checkToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
