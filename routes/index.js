const express = require('express');
const logger = require('../services/logger');

const notifier = require('../services/notifier');

const router = express.Router();

router.post('/notify', async (req, res) => {
  const result = await notifier.notify(req.body.message, req.body.user);
  if (result.error) {
    return res.status(400).send(result.message);
  }
  return res.sendStatus(200);
});

module.exports = router;