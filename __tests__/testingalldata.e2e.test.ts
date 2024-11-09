import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { setDB } from '../src/db/db';
import { TDB, TVideo } from '../src/db/types';
import { RESOLUTIONS } from '../src/db/constants';

describe('/testing/all-data', () => {
    const test_video: TVideo = {
        id: Date.now() + Math.random(),
        title: 'test title 1',
        author: 'unknown',
        availableResolution: [RESOLUTIONS.P144]
    };

    const test_dataset: TDB = {
        videos: [test_video],
    };

    it('should remove all data', async () => {
        setDB(test_dataset);

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200);

        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual(test_dataset.videos[0]);
        expect(res.body[0].title).toEqual(test_dataset.videos[0].title);

        const delete_res = await req
            .get('/testing/all-data')
            .expect(204);

        expect(delete_res.body).toEqual({});
    });
});
