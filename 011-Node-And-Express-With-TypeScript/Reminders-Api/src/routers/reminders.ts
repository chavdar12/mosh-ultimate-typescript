import { Router } from 'express';
import CreateReminderDto from '../dtos/create-reminder.js';
import Reminder from '../models/reminder.js';

/** A router with its own in-memory store (the course keeps reminders in memory too). */
export function remindersRouter(): Router {
  const router = Router();
  const reminders: Reminder[] = [];

  router.get('/', (_req, res) => {
    res.json(reminders);
  });

  router.post('/', (req, res) => {
    const { title } = (req.body ?? {}) as Partial<CreateReminderDto>;
    if (typeof title !== 'string' || !title.trim()) {
      res.status(400).json({ error: 'title is required' });
      return;
    }
    const reminder = new Reminder(title.trim());
    reminders.push(reminder);
    res.status(201).json(reminder);
  });

  return router;
}
