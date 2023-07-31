const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFLICT_409 = require('../errors/CONFLICT_409');
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 7)
    .then((hash) => {
      const {
        name, about, avatar, email,
      } = req.body;
      return User.create(
        {
          name, about, avatar, email, password: hash, // записываем хеш в базу
        },
      )
        // eslint-disable-next-line no-shadow
        .then((user) => {
          res.status(201).send({
            data: {
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
              _id: user._id,
            },
          });
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new CONFLICT_409('Данный email уже используется.'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, 'soon-im-back', { expiresIn: '7d' }) });
    })
    .catch(next);
};
