import { Request, Response } from 'express'
import { TVideo } from '../db/types';

export type TParam = {
    id: string
};

export type TError = {
    errorsMessages: { message: string, field: keyof TVideo }[],
};

export type TQuery = {
    search?: string
}

export type TRequestBody = Omit<TVideo, 'id'>;

export type TRequest<T> = Request<{}, {}, T>
