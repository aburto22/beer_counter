const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.x1pbh.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, () => {
  console.log('connected to mongoose');
  const port = process.env.PORT || 5500;

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
