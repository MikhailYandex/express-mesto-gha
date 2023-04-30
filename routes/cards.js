const cardsRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCard);
cardsRouter.put('/:cardId/likes', addCardLike);
cardsRouter.delete('/:cardId/likes', removeCardLike);

module.exports = cardsRouter;
