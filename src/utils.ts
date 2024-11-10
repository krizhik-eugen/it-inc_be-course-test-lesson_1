import { RESOLUTIONS } from "./db/constants";
import { TError, TRequestBody } from "./videos/types";


export const isDateTimeString = (value: string): boolean => {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return dateTimeRegex.test(value);
}

export const checkNumber = (num: number): boolean => {
    const pattern = /^[1-9]$|1[0-8]$/;
    return pattern.test(String(num));
};


export const inputValidation = (video: TRequestBody) => {
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