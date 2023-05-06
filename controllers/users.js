const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const IncorrectError = require('../errors/IncorrectError');
const AlreadyExistsError = require('../errors/AlreadyExistsError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res.send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new AlreadyExistsError('Данный профиль уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new IncorrectError('Некорректные данные'));
          } else {
            next(err);
          }
        });
    });
};

const findUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Данного пользователя не существует');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectError('Не корректный id пользователя'));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Данного пользователя не существует');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectError('Не корректные данные'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Данного пользователя не существует');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectError('Не корректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  getUserInfo,
  getUsers,
  createUser,
  findUser,
  updateProfile,
  updateAvatar,
};
