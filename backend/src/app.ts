import express from 'express';
import fs from 'fs';
import cors from 'cors';

import { parseStatus } from './parse';


const STATUS_FILE_PATH = process.env.STATUS_FILE_PATH || './status';


const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://frontend.reaktor.jebetech.online'
    : 'http://localhost:8080',
}));

const statusStr = fs.readFileSync(STATUS_FILE_PATH, 'utf8');
const items = parseStatus(statusStr);

app.get('/', (_req, res) => {
  res.json(items);
});

export { app };

