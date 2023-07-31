const router = require('express').Router();
const { addCardValidator, cardIdValidator } = require('../middlewares/requestValidator');

const {
  getCards, addCard, removeCard, setLike, removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', addCardValidator, addCard);
router.delete('/:cardId', cardIdValidator, removeCard);
router.put('/:cardId/likes', cardIdValidator, setLike);
router.delete('/:cardId/likes', cardIdValidator, removeLike);

module.exports = router;
