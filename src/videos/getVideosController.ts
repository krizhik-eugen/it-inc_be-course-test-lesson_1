import { Request, Response } from 'express';
import { db } from '../db/db';
import { TVideo } from '../db/types';
import { HTTP_STATUS_CODES } from '../constants';

export const getVideosController = (req: Request, res: Response<TVideo[]>) => {
    const videos = db.getAllVideos();

    res.status(HTTP_STATUS_CODES.OK).json(videos);
};
