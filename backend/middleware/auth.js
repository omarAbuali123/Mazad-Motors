// const jwt = require('jsonwebtoken');

// exports.authenticate = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Token missing' });

//   jwt.verify(token, 'your_secret_key', (err, user) => {
//     if (err) return res.status(401).json({ message: 'Invalid token' });
//     req.user = user;
//     next();
//   });
// };


//  const jwt = require('jsonwebtoken');

// exports.authenticate = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Token missing' });

//   jwt.verify(token, 'your_secret_key', (err, user) => {
//     if (err) return res.status(401).json({ message: 'Invalid token' });
//     req.user = user; // Assign the user data to the request object
//     next();
//   });
// };


const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
