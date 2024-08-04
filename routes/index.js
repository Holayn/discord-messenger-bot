const express = require('express');

const notifier = require('../services/notifier');

const router = express.Router();

router.post('/notify', (req, res) => {
  notifier.notify(req.body.message);
  res.sendStatus(200);
});

module.exports = router;