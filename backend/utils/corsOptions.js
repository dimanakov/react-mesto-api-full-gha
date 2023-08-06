const whitelist = ['http://localhost:3001', 'https://get-mesto.nomoreparties.co'];

function checkOrigin(origin, callback) {
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}

const corsOptions = {
  origin: checkOrigin(),
};

module.exports = { corsOptions };
