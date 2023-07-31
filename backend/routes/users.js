// создаём роутер express router
const router = require('express').Router();
const {
  userIdValidator, updateUserProfileValidator, updateUserAvatarValidator,
} = require('../middlewares/requestValidator');

const {
  getUsers, getUserById, updateUserProfile, updateUserAvatar, getUserProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserProfile);
router.get('/:userId', userIdValidator, getUserById);
router.patch('/me', updateUserProfileValidator, updateUserProfile);
router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);

module.exports = router;
