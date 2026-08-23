import express, { type Request, type Response } from 'express';

import { notify } from '../services/notifier';

const router = express.Router();

router.post('/notify', async (req: Request, res: Response) => {
  await notify(req.body.message, req.body.user);
  return res.sendStatus(200);
});

export default router;
