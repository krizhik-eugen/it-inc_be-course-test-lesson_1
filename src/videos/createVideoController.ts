import { Response, Request } from 'express';
import { db } from '../db/db';
import { TVideo } from '../db/types';
import { RESOLUTIONS } from '../db/constants';
import { TError, TRequestBody } from './types';
import { HTTP_STATUS_CODES } from '../constants';


const inputValidation = (video: TRequestBody) => {
    const errors: TError = {
        errorsMessages: [],
    };

    if (!video.title || video.title.length > 40) {
        errors.errorsMessages.push({
            message: 'Please provide correct title less than 32 characters', field: 'title',
        });
    };

    if (!video.author || video.author.length > 20) {
        errors.errorsMessages.push({
            message: 'Please provide author name', field: 'author',
        });
    };

    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !RESOLUTIONS[p])
    ) {
        errors.errorsMessages.push({
            message: `Please upload one of resolutions: ${Object.values(RESOLUTIONS)}`, field: 'availableResolutions',
        });
    }

    return errors;
};


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
