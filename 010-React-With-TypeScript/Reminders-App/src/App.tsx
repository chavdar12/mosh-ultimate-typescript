import { useEffect, useState } from 'react';
import NewReminder from './components/NewReminder';
import ReminderList from './components/ReminderList';
import Reminder from './models/reminder';
import reminderService from './services/reminder';

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    reminderService
      .getReminders()
      .then((items) => setReminders(items.slice(0, 10)))
      .catch((e: Error) => setError(e.message));
  }, []);

  const removeReminder = (id: number) => {
    setReminders((items) => items.filter((r) => r.id !== id));
    reminderService.removeReminder(id).catch((e: Error) => setError(e.message));
  };

  const addReminder = async (title: string) => {
    try {
      const created = await reminderService.addReminder(title);
      setReminders((items) => [created, ...items]);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="container py-4">
      <NewReminder onAddReminder={addReminder} />
      {error && <div className="alert alert-danger">{error}</div>}
      <ReminderList items={reminders} onRemoveReminder={removeReminder} />
    </div>
  );
}

export default App;
