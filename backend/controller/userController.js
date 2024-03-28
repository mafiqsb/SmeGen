const db = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../Utils');
const userModel = db.user;

const registerUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password);

  const emailReq = email;

  const emailRecord = await userModel.findOne({ where: { email: emailReq } });

  if (emailRecord) {
    res.status(404).send({ message: 'email already exist' });

    return;
  }
  try {
    const resultUserRegister = await userModel.create({
      name,
      email,
      password,
    });

    // Send a success response with the created user data
    res.status(200).send({
      id: resultUserRegister.id,
      name: resultUserRegister.name,
      email: resultUserRegister.email,
      token: generateToken(resultUserRegister),
    });
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).send({ message: 'Failed to create user' });
  }
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await userModel.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).send({ message: 'Account does not exist' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).send({ message: 'Password does not match' });
    }

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
