import { Request, Response } from 'express';
import { db } from '../db/db';
import { TParam, TRequestBody } from './types';
import { HTTP_STATUS_CODES } from '../constants';
import { inputValidation } from '../utils';


export const updateVideoController = (req: Request<TParam, {}, TRequestBody>, res: Response) => {
    const errors = inputValidation(req.body);

    if (errors.errorsMessages.length) {
        res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json(errors)
        return;
    };

    const isUpdated = db.updateVideo(Number(req.params.id), req.body);

    if (!isUpdated) {
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
        return;
    };

    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
};
