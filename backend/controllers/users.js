const mongoose = require('mongoose');
const NOT_FOUND_404 = require('../errors/NOT_FOUND_404');
const BAD_REQUEST_400 = require('../errors/BAD_REQUEST_400');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NOT_FOUND_404(' Пользователь по указанному _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BAD_REQUEST_400('Переданы некорректные данные.'));
        return;
      }
      next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, about } },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NOT_FOUND_404(' Пользователь по указанному _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BAD_REQUEST_400('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NOT_FOUND_404(' Пользователь по указанному _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BAD_REQUEST_400('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};
