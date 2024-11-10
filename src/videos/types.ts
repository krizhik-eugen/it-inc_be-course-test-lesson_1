import { Request, Response } from 'express'
import { TVideo } from '../db/types';

export type TParam = {
    id: string
};

export type TError = {
    errorsMessages: { message: string, field: keyof TVideo }[],
};

export type TRequestBody = Omit<TVideo, 'id'>;

export type TCreateRequest = Request<{}, {}, TRequestBody>;

export type TUpdateRequest = Request<TParam, {}, TRequestBody>;

export type TFindOrDeleteRequest = Request<TParam, {}, {}, TParam>;