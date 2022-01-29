const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res.send('./index.html');
});

router.get('/api/counter/', async (req, res) => {
  const users = await User.find();
  const data = {};
  users.forEach((user) => { data[user.user] = user.counter; });

  return res.send(data);
});

router.put('/api/counter/:username/', async (req, res) => {
  const { username } = req.params;
  const { load } = req.body;

  const user = await User.findOne({ user: username });

  if (user.counter + load < 0) {
    return res.send({ count: user.counter });
  }

  user.counter += load;

  await user.save();

  return res.send({ count: user.counter });
});

module.exports = router;
