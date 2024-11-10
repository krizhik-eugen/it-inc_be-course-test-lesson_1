import express, { Request, Response } from 'express';
import cors from 'cors';
import { SETTINGS } from './settings';
import { videosRouter } from './videos';
import { db } from './db/db';
import { HTTP_STATUS_CODES } from './constants';

export const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(HTTP_STATUS_CODES.OK).json({ version: '1.0' })
});

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.setDB();
    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
});

app.use(SETTINGS.PATH.VIDEOS, videosRouter);
