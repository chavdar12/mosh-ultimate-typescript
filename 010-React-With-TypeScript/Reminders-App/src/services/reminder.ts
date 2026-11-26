import Reminder from '../models/reminder';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Lesson: calling the backend (the course used axios; fetch needs no dependency).
class ReminderService {
  async getReminders(): Promise<Reminder[]> {
    const res = await fetch(`${BASE_URL}/todos`);
    if (!res.ok) throw new Error(`Loading reminders failed: ${res.status}`);
    return res.json();
  }

  async addReminder(title: string): Promise<Reminder> {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error(`Adding the reminder failed: ${res.status}`);
    return res.json();
  }

  async removeReminder(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Removing the reminder failed: ${res.status}`);
  }
}

export default new ReminderService();
