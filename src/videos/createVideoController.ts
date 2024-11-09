import { Response, Request } from 'express';
import { db } from '../db/db';
import { TVideo } from '../db/types';
import { RESOLUTIONS } from '../db/constants';
import { TError, TRequestBody } from './types';


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
            .status(400)
            .json(errors)
        return;
    };

    const newVideo: TVideo = {
        id: Math.floor(Date.now() + Math.random()),
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        ...req.body,
    };

    db.videos = [...db.videos, newVideo];

    res
        .status(201)
        .json(newVideo)
};
