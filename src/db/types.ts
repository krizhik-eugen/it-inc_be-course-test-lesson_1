import { RESOLUTIONS } from "./constants";

export type TDB = {
    videos: TVideo[];
};

export type TVideo = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: null | number,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions?: Array<typeof RESOLUTIONS[keyof typeof RESOLUTIONS]> | null,
};
