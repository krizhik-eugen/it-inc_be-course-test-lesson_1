import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { db } from '../src/db/db';
import { TDB } from '../src/db/types';
import { RESOLUTIONS } from '../src/db/constants';
import { TRequestBody } from '../src/videos/types';

describe('/videos', () => {
    const test_dataset: TDB = {
        videos: [{
            id: 1,
            title: 'test title 1',
            author: 'test author 1',
            availableResolutions: [RESOLUTIONS.P240],
        },
        {
            id: 2,
            title: 'test title 2',
            author: 'test author 2',
            availableResolutions: [RESOLUTIONS.P240],
        }],
    };

    describe('get all videos', () => {
        it('should get empty array', async () => {
            const res = await req
                .get(SETTINGS.PATH.VIDEOS)
                .expect(200);

            expect(res.body.length).toBe(0);
        });

        it('should get not empty array', async () => {
            db.setDB(test_dataset);

            const res = await req
                .get(SETTINGS.PATH.VIDEOS)
                .expect(200);

            expect(res.body.length).toBe(2);
            expect(res.body[0]).toEqual(test_dataset.videos[0]);
            expect(res.body[0].title).toEqual(test_dataset.videos[0].title);
        });
    });

    describe('create new video', () => {
        let test_video: Partial<TRequestBody> = {
        };
        beforeEach(() => {
            test_video = {
                title: 'test title 1',
                author: 'test author 1',
                availableResolutions: [RESOLUTIONS.P240],
            };

        });

        it('should create new video in db', async () => {
            const res = await req
                .post(SETTINGS.PATH.VIDEOS)
                .send(test_video)
                .expect(201);

            expect(res.body.title).toBe(test_video.title);
            expect(res.body.author).toBe(test_video.author);
        });

        it('should return error if title is missing', async () => {
            delete test_video.title;

            const res = await req
                .post(SETTINGS.PATH.VIDEOS)
                .send(test_video)
                .expect(400);

            expect(res.body.errorsMessages[0].field).toBe('title');
        });

        it('should return error if author is missing', async () => {
            delete test_video.author;

            const res = await req
                .post(SETTINGS.PATH.VIDEOS)
                .send(test_video)
                .expect(400);

            expect(res.body.errorsMessages[0].field).toBe('author');
        });

        it('should return error if availableResolutions is missing', async () => {
            delete test_video.availableResolutions;

            const res = await req
                .post(SETTINGS.PATH.VIDEOS)
                .send(test_video)
                .expect(400);

            expect(res.body.errorsMessages[0].field).toBe('availableResolutions');
        });
    });

    describe('get one video', () => {
        it('should return video by id', async () => {
            db.setDB(test_dataset);

            const res = await req
                .get(SETTINGS.PATH.VIDEOS + '/1')
                .expect(200);

            expect(res.body.title).toBe(test_dataset.videos[0].title);
        });

        it('should return error if no video found', async () => {
            const res = await req
                .get(SETTINGS.PATH.VIDEOS + '/3')
                .expect(404);

            expect(res.body).toEqual({});
        });
    });

    describe('delete one video', () => {
        it('should delete video by id', async () => {
            db.setDB(test_dataset);

            const res = await req
                .get(SETTINGS.PATH.VIDEOS)
                .expect(200);

            expect(res.body.length).toBe(2);

            await req
                .delete(SETTINGS.PATH.VIDEOS + '/1')
                .expect(204);

            const delete_res = await req
                .get(SETTINGS.PATH.VIDEOS)
                .expect(200);

            expect(delete_res.body.length).toBe(1);
        });

        it('should return error if no video to delete found', async () => {
            const res = await req
                .get(SETTINGS.PATH.VIDEOS + '/3')
                .expect(404);

            expect(res.body).toEqual({});
        });
    });

    describe('update one video', () => {
        const updated_video = {
            title: 'new test title 1',
            author: 'new test author 1',
            availableResolutions: [RESOLUTIONS.P240],
            canBeDownloaded: true,
            publicationDate: '2022-07-25T14:30:00.000Z',
            minAgeRestriction: 18
        };
        it('should update video by id', async () => {
            db.setDB(test_dataset);

            const res = await req
                .get(SETTINGS.PATH.VIDEOS)
                .expect(200);

            expect(res.body[0].title).toEqual(test_dataset.videos[0].title);
            expect(res.body[0].id).toEqual(test_dataset.videos[0].id);

            await req
                .put(SETTINGS.PATH.VIDEOS + '/1')
                .send(updated_video)
                .expect(204);

            const updated_res = await req
                .get(SETTINGS.PATH.VIDEOS)
                .expect(200);

            expect(updated_res.body[0].title).toBe(updated_video.title);
            expect(updated_res.body[0].author).toBe(updated_video.author);
        });

        it('should return error if no video to update found', async () => {
            const res = await req
                .put(SETTINGS.PATH.VIDEOS + '/3')
                .send(updated_video)
                .expect(404);

            expect(res.body).toEqual({});
        });

        it('should return error if title to update is missing', async () => {
            updated_video.title = '';

            const res = await req
                .put(SETTINGS.PATH.VIDEOS + '/1')
                .send(updated_video)
                .expect(400);

            expect(res.body.errorsMessages[0].field).toBe('title');
        });
    });

    it('should receive 404 error with wrong url', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/wrong-url')
            .expect(404);

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({});
    });
}); 