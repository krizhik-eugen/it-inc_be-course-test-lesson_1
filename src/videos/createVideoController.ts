import { Response, Request } from 'express';
import { db } from '../db/db';
import { TVideo } from '../db/types';
import { TError, TRequestBody } from './types';
import { HTTP_STATUS_CODES } from '../constants';
import { inputValidation } from '../utils';


export const createVideoController = (req: Request<{}, {}, TRequestBody>, res: Response<TVideo | TError>) => {
    const errors = inputValidation(req.body);

    if (errors.errorsMessages.length) {
        res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json(errors)
        return;
    };

    const newVideo = db.addVideo(req.body);

    res
        .status(HTTP_STATUS_CODES.CREATED)
        .json(newVideo)
};
