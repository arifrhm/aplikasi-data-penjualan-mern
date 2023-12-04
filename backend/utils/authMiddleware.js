import jwt from 'jsonwebtoken';

// authMiddleware.js

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}
export default authenticateToken;