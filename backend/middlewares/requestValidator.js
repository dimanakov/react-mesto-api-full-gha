const { Joi, celebrate } = require('celebrate');
const { regexpURL } = require('../utils/constants');

module.exports.signValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexpURL),
    email: Joi.string().required().max(63).email(),
    password: Joi.string().required(),
  }).unknown(true),
});

module.exports.userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.updateUserProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexpURL),
  }),
});

module.exports.addCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexpURL),
  }),
});

module.exports.cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});
