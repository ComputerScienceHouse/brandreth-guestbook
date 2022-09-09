import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { tripRouter, uploadRouter, userRouter } from './routes';
import dbInit from './db/init';
import { logger } from './utils';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    optionsSuccessStatus: 204,
    origin: [
      'https://brandreth.csh.rit.edu',
      'https://brandreth.cs.house',
      'http://localhost:8080',
      'http://localhost:3000'
    ]
  })
);

const api = Router();

api.use('/trip', tripRouter);
api.use('/upload', uploadRouter);
api.use('/user', userRouter);
app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));
  app.use('*', (_, res) => {
    res.sendFile(
      path.join(__dirname, '..', '..', 'client', 'dist', 'index.html')
    );
  });
}

const PORT = process.env.APP_PORT ?? 8080;

app.listen(PORT, () => {
  void (async () => {
    try {
      await dbInit();

      void logger.log('START', `Listening on port ${PORT}`);
    } catch (error) {
      void logger.log('FAILED_TO_START', 'Failed to start server', { error });
    }
  })();
});
