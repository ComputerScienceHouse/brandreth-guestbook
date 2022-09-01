import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Place routes above this, it will be the catchall to direct to the client
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

const PORT = process.env.APP_PORT ?? 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
