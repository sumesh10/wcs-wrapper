import errorHandler from '#middleware/exceptionHandler.js';
import express from 'express';

import router from './routes/route.js';


const app = express();
app.use(express.json());

app.use('/api/orchestrator', router);
app.use(errorHandler)

export default app;


