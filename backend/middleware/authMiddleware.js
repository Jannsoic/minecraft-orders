const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'replace_this_with_a_secure_secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({message:'No token'});
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({message:'Invalid token'});
  }
}

module.exports = authMiddleware;
