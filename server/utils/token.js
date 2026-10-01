import jwt from "jsonwebtoken";

const genToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default genToken;