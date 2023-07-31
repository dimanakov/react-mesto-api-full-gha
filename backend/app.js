const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { signValidator } = require('./middlewares/requestValidator');
const NOT_FOUND_404 = require('./errors/NOT_FOUND_404');
const { login, createUser } = require('./controllers/auth');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB_URL);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', signValidator, createUser);
app.post('/signin', signValidator, login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => { // обработчик несуществующих страниц
  next(new NOT_FOUND_404('Запрашиваемая страница не найдена.'));
});

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик ошибок express

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server work on port ${PORT}`);
});
