import express from 'express';
import { remindersRouter } from './routers/reminders.js';

export function createApp() {
  const app = express();
  app.use(express.json()); // lesson: parsing request bodies
  app.get('/', (_req, res) => {
    res.send('Hello World');
  });
  app.use('/reminders', remindersRouter());
  return app;
}
