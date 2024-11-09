import { Request, Response } from 'express';
import { db, setDB } from '../db/db';
import { TVideo } from '../db/types';
import { TError, TParam, TRequestBody } from './types';
import { RESOLUTIONS } from '../db/constants';
import { log } from 'console';

const isDateTimeString = (value: string): boolean => {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return dateTimeRegex.test(value);
}

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

    if (video.minAgeRestriction && !(video.minAgeRestriction >= 1 && video.minAgeRestriction <= 18)) {
        errors.errorsMessages.push({
            message: 'Please provide correct age restriction', field: 'minAgeRestriction',
        });
    };

    if (video.canBeDownloaded === undefined) {
        errors.errorsMessages.push({
            message: 'Please provide correct canBeDownloaded', field: 'canBeDownloaded',
        });
    };

    if (video.publicationDate && !isDateTimeString(video.publicationDate)) {
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
    const foundVideo = db.videos.find(video => video.id === Number(req.params.id));

    if (!foundVideo) {
        res.sendStatus(404);
        return;
    };

    const errors = inputValidation(req.body);

    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return;
    };

    const updatedVideo = { ...foundVideo, ...req.body };

    setDB({
        ...db,
        videos: db.videos.map(video => video.id === foundVideo.id ? updatedVideo : video),
    });

    res.sendStatus(204);
};
