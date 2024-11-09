import { Request, Response } from 'express';
import { db } from '../db/db';
import { TVideo } from '../db/types';

export const getVideosController = (req: Request, res: Response<TVideo[]>) => {
    const videos = db.videos;

    res.status(200).json(videos);
};
