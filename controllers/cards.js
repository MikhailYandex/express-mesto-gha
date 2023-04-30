const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Не корректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Карточки с таким id не найденo' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id карточки' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const addCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Карточки с таким id не найденo' });
      }
      return res.send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id карточки' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Карточки с таким id не найденo' });
      }
      return res.send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id карточки' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
