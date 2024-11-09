import { Request, Response } from 'express';
import { db, setDB } from '../db/db';
import { TVideo } from '../db/types';
import { TParam } from './types';

export const deleteVideoController = (req: Request<TParam, {}, {}>, res: Response) => {
    const foundVideo = db.videos.find(video => video.id === Number(req.params.id));

    if (!foundVideo) {
        res.sendStatus(404);
        return;
    };

    setDB({
        ...db,
        videos: db.videos.filter(video => video.id !== foundVideo.id),
    });

    res.sendStatus(204);
};
