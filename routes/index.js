const express = require('express');

const notifier = require('../services/notifier');

const router = express.Router();

router.post('/notify', async (req, res) => {
  try {
    await notifier.notify(req.body.message, req.body.user);
    res.sendStatus(200);
  }
  catch (e) {
    res.sendStatus(400);
  }
});

module.exports = router;