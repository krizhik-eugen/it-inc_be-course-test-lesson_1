import { TDB, TVideo } from "./types";

export const db: TDB = {
    videos: [],
};

export const setDB = (dataset?: TDB) => {
    if (!dataset) {
        db.videos = [];
        return
    };

    db.videos = dataset.videos || db.videos;
};
