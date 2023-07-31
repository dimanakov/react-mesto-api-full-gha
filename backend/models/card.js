const mongoose = require('mongoose');
const validator = require('validator'); //  валидатор для данных БД

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, 'Поле name должно быть не меньше 2 символов.'],
      maxLength: [30, 'Поле name должно быть не больше 30 символов.'],
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Неправильный формат ссылки',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
