import { TDB, TVideo } from "./types";

class Database {
    private db: TDB;

    constructor() {
        this.db = {
            videos: [],
        };
    }

    public setDB(dataset?: TDB) {
        if (!dataset) {
            this.db.videos = [];
            return;
        }

        this.db.videos = dataset.videos || this.db.videos;
    }

    public getAllVideos() {
        return this.db.videos;
    }

    public deleteVideo(id: number) {
        const foundVideo = this.db.videos.find((video) => video.id === id);

        if (!foundVideo) return false;

        this.setDB({
            ...this.db,
            videos: this.db.videos.filter((video) => video.id !== foundVideo.id),
        });
        return true;
    }

    public getVideo(id: number) {
        return this.db.videos.find((video) => video.id === id);
    }

    public addVideo(video: Omit<TVideo, 'id'>) {
        const newVideo: TVideo = {
            id: Math.floor(Date.now() + Math.random()),
            createdAt: new Date().toISOString(),
            publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
            canBeDownloaded: false,
            minAgeRestriction: null,
            ...video,
        };

        this.db.videos = [...this.db.videos, newVideo];

        return newVideo;
    }

    public updateVideo(id: number, video: Omit<TVideo, 'id'>) {
        const foundVideo = this.db.videos.find((video) => video.id === id);

        if (!foundVideo) return false;

        const updatedVideo = { ...foundVideo, ...video };
        this.db.videos = this.db.videos.map((video) => video.id === foundVideo.id ? updatedVideo : video);

        return true;
    }
}

export const db = new Database();