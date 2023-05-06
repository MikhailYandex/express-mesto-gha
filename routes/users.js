const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regAvatar = /^((http|https:\/\/.)[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)$/;

const {
  getUsers,
  getUserInfo,
  findUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserInfo);

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), findUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regAvatar),
  }),
}), updateAvatar);

module.exports = usersRouter;
