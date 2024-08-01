import {createAction} from '@reduxjs/toolkit';

const start = createAction('loading/start');

const stop = createAction('loading/stop');

const clear = createAction('loading/clear');

const idle = createAction('loading/idle');

const pending = createAction('loading/pending');

const succeeded = createAction('loading/succeeded');

const failed = createAction('loading/failed');


export default {
    start,
    stop,
    clear,
    idle,
    pending,
    succeeded,
    failed
};
