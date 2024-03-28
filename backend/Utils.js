const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET_TOKEN,
    { expiresIn: '30d' }
  );
};

module.exports = { generateToken };
