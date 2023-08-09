const FOBIDDEN_403 = require('../errors/FORBIDDEN_403');
const NOT_FOUND_404 = require('../errors/NOT_FOUND_404');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .sort([['createAt', -1]])
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create(
    { name, link, owner: req.user._id },
  )
    .then((card) => {
      Card.findById(card._id)
        .populate(['owner', 'likes'])
        // eslint-disable-next-line no-shadow
        .then((card) => {
          res.status(201).send(card);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NOT_FOUND_404('Карточка не найдена.'));
        return;
      }
      if (card.owner._id.toString() !== req.user._id) {
        next(new FOBIDDEN_403('Удаление чужих карточек невозможно'));
        return;
      }
      Card.deleteOne(card)
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.setLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NOT_FOUND_404('Карточка не найдена.'));
        return;
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NOT_FOUND_404('Карточка не найдена.'));
        return;
      }
      res.send(card);
    })
    .catch(next);
};
