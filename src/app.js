import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import cards from './controllers/cardsController.js';
import { genericErrorHandler } from './helpers/serverHelper.js';

process.on('SIGINT', () => process.exit(0));

const app = express().use(
    helmet.contentSecurityPolicy({
        directives: { defaultSrc: ["'self'"] },
    }),
    cors(),
    rateLimit({
        windowMs: 60 * 1000,
        limit: 20,
        message: 'Too many requests, please try again later',
    }),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
);

const apiv1 = Router();

apiv1.use('/cards', cards);

app.use('/api/v1', apiv1);
app.use(genericErrorHandler);

export default app;
