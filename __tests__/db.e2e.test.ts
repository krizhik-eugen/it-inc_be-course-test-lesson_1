import { db } from '../src/db/db';

describe('Database', () => {
    beforeEach(() => {
        db.setDB();
    });

    const testVideo1 = { id: 1, title: 'Test Video 1', author: 'Test Author 1' };
    const testVideo2 = { id: 2, title: 'Test Video 2', author: 'Test Author 2' };

    describe('setDB', () => {
        it('should reset the database when no dataset is provided', () => {
            db.setDB({ videos: [testVideo1] });
            expect(db.getAllVideos()).toHaveLength(1);
            db.setDB();
            expect(db.getAllVideos()).toHaveLength(0);
        });

        it('should set the database to the provided dataset', () => {
            const dataset = { videos: [testVideo1] };
            db.setDB(dataset);
            expect(db.getAllVideos()).toEqual(dataset.videos);
        });
    });

    describe('getAllVideos', () => {
        it('should return an empty array when the database is empty', () => {
            expect(db.getAllVideos()).toHaveLength(0);
        });

        it('should return all videos in the database', () => {
            db.addVideo(testVideo1);
            db.addVideo(testVideo2);
            expect(db.getAllVideos()).toHaveLength(2);
        });
    });

    describe('deleteVideo', () => {
        it('should return false when the video is not found', () => {
            expect(db.deleteVideo(1)).toBe(false);
        });

        it('should delete the video and return true', () => {
            const video = db.addVideo(testVideo1);
            expect(db.deleteVideo(video.id)).toBe(true);
            expect(db.getAllVideos()).toHaveLength(0);
        });
    });

    describe('getVideo', () => {
        it('should return undefined when the video is not found', () => {
            expect(db.getVideo(1)).toBeUndefined();
        });

        it('should return the video when it is found', () => {
            const video = db.addVideo(testVideo1);
            expect(db.getVideo(video.id)).toEqual(video);
        });
    });

    describe('addVideo', () => {
        it('should add a new video to the database', () => {
            const video = db.addVideo(testVideo1);
            expect(db.getAllVideos()).toHaveLength(1);
            expect(video).toHaveProperty('id');
            expect(video).toHaveProperty('createdAt');
            expect(video).toHaveProperty('publicationDate');
        });
    });

    describe('updateVideo', () => {
        it('should return false when the video is not found', () => {
            expect(db.updateVideo(1, testVideo1)).toBe(false);
        });

        it('should update the video and return true', () => {
            const video = db.addVideo(testVideo1);
            expect(db.updateVideo(video.id, { ...testVideo1, title: 'New Title' })).toBe(true);
            expect(db.getVideo(video.id)?.title).toBe('New Title');
        });
    });
});
