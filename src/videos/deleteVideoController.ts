import { Request, Response } from 'express';
import { db } from '../db/db';
import { TParam } from './types';
import { HTTP_STATUS_CODES } from '../constants';

export const deleteVideoController = (req: Request<TParam, {}, {}>, res: Response) => {
    const isDeleted = db.deleteVideo(Number(req.params.id));

    res.sendStatus(isDeleted ? HTTP_STATUS_CODES.NO_CONTENT : HTTP_STATUS_CODES.NOT_FOUND);
};
