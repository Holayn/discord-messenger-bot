import express, { type Request, type Response } from 'express';

import { notify } from '../services/notifier';

const router = express.Router();

router.post('/notify', async (req: Request, res: Response) => {
  const result = await notify(req.body.message, req.body.user);
  if (result.error) {
    return res.status(400).send(result.message);
  }
  return res.sendStatus(200);
});

export default router;
