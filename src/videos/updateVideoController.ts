import { Request, Response } from 'express';
import { db } from '../db/db';
import { TError, TParam, TRequestBody } from './types';
import { RESOLUTIONS } from '../db/constants';
import { checkNumber, HTTP_STATUS_CODES, isDateTimeString } from '../constants';

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

    if (typeof video.minAgeRestriction != 'undefined' && video.minAgeRestriction != null && !checkNumber(video.minAgeRestriction)) {
        errors.errorsMessages.push({
            message: 'Please provide correct age restriction', field: 'minAgeRestriction',
        });
    };

    if (typeof video.canBeDownloaded != 'undefined' && typeof video.canBeDownloaded != 'boolean') {
        errors.errorsMessages.push({
            message: 'Please provide correct canBeDownloaded', field: 'canBeDownloaded',
        });
    };

    if (typeof video.publicationDate != 'undefined' && !isDateTimeString(video.publicationDate)) {
        errors.errorsMessages.push({
            message: 'Please provide correct publicationDate', field: 'publicationDate',
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
