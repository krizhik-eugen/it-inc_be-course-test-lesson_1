import express, { Request, Response } from 'express';
import cors from 'cors';
import { SETTINGS } from './settings';
import { videosRouter } from './videos';
import { setDB } from './db/db';

export const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ version: '1.0' })
});

app.delete('/testing/all-data', (req: Request, res: Response) => {
    setDB();
    res.sendStatus(204);
});

app.use(SETTINGS.PATH.VIDEOS, videosRouter);
