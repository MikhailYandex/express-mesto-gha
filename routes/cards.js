const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regLink = /^((http|https:\/\/.)[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)$/;

const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regLink),
  }).unknown(true),
}), createCard);

cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), addCardLike);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), removeCardLike);

module.exports = cardsRouter;
