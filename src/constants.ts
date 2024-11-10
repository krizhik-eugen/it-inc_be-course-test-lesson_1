export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
};


export const isDateTimeString = (value: string): boolean => {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return dateTimeRegex.test(value);
}

export const checkNumber = (num: number): boolean => {
    const pattern = /^[1-9]$|1[0-8]$/;
    return pattern.test(String(num));
};
