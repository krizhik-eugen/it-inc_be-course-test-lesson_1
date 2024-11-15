import { Response } from 'express';
import { db } from '../db/db';
import { TVideo } from '../db/types';
import { TFindOrDeleteRequest } from './types';
import { HTTP_STATUS_CODES } from '../constants';

export const findVideoController = (req: TFindOrDeleteRequest, res: Response<TVideo>) => {
    const foundVideo = db.getVideo(Number(req.params.id));

    if (!foundVideo) {
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
        return;
    };

    res.status(HTTP_STATUS_CODES.OK).json(foundVideo);
};
