import { Request, Response } from 'express';
import { db } from '../db/db';
import { TVideo } from '../db/types';
import { TParam } from './types';

export const findVideoController = (req: Request<TParam, {}, {}>, res: Response<TVideo>) => {
    const foundVideo = db.videos.find(video => video.id === Number(req.params.id));

    if (!foundVideo) {
        res.sendStatus(404);
        return;
    };

    res.status(200).json(foundVideo);
};
