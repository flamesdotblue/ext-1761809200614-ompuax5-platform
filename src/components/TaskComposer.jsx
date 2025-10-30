import { useState } from 'react';
import { Calendar, Flag, Plus } from 'lucide-react';

function TaskComposer({ onAdd }) {
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, due, priority });
    setTitle('');
    setDue('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950/60 p-3 sm:flex-row sm:items-center sm:gap-2">
      <input
        aria-label="Task title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task and press Enter..."
        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-600"
      />

      <div className="flex gap-2">
        <label className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm text-neutral-300">
          <Calendar size={16} className="text-neutral-400" />
          <input
            aria-label="Due date"
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="bg-transparent text-neutral-200 outline-none [color-scheme:dark]"
          />
        </label>

        <label className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm text-neutral-300">
          <Flag size={16} className={{ low: 'text-green-400', medium: 'text-yellow-400', high: 'text-red-400' }[priority]} />
          <select
            aria-label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-transparent text-neutral-200 outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-yellow-400"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </form>
  );
}

export default TaskComposer;
