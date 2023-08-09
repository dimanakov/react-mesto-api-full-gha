const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signValidator } = require('../middlewares/requestValidator');
const { login, createUser } = require('../controllers/auth');
const NOT_FOUND_404 = require('../errors/NOT_FOUND_404');

router.post('/signup', signValidator, createUser);
router.post('/signin', signValidator, login);

// все роуты, кроме /signin и /signup защищены авторизацией
router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res, next) => { // обработчик несуществующих страниц
  next(new NOT_FOUND_404('Запрашиваемая страница не найдена.'));
});

module.exports = router;
