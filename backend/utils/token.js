const jwt = require('jsonwebtoken');
const config = require('config').get('development');
function ensureToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, config.get('secret'), (err, decoded) => {
      if (err) {
        res.json({ status: 'auth' });
        return;
      } else {
        req.token = decoded;
        next();
      }
    });
  } else {
    res.json({ status: 'auth' });
    return;
  }
}

module.exports = ensureToken;
