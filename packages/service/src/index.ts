import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import 'dotenv/config';

import logger from './services/logger';

logger.init();

import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morganMiddleware = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  {
    stream: {
      write: (message: string) => logger.http(message.split('\n').join('')),
    },
  },
);
app.use(morganMiddleware);

app.use('/api', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  res.sendStatus(500);
  next();
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.info(`Listening on ${port}`);
});
