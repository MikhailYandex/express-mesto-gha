const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use((req, res, next) => {
  req.user = { _id: '644e6bd36d248cd1d30c4acb' };
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use('/', router);

app.use((req, res) => {
  res.status(404).send({ message: 'Такой страницы не существует!' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
