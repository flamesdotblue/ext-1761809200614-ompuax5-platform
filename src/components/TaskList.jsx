import { Calendar, CheckCircle2, Circle, Clock, Flag, Trash2 } from 'lucide-react';

function PriorityBadge({ priority }) {
  const map = {
    low: { label: 'Low', className: 'bg-emerald-500/15 text-emerald-300 border-emerald-700/30' },
    medium: { label: 'Medium', className: 'bg-yellow-500/15 text-yellow-300 border-yellow-700/30' },
    high: { label: 'High', className: 'bg-red-500/15 text-red-300 border-red-700/30' },
  };
  const cfg = map[priority] || map.medium;
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${cfg.className}`}><Flag size={12} />{cfg.label}</span>;
}

function DueBadge({ due }) {
  if (!due) return (
    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-700/40 bg-neutral-800/40 px-2 py-0.5 text-xs text-neutral-300">
      <Clock size={12} /> No due
    </span>
  );
  const d = new Date(due);
  const isOverdue = Date.now() > d.getTime() + 24 * 60 * 60 * 1000; // a day grace
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${isOverdue ? 'border-red-700/40 bg-red-500/10 text-red-300' : 'border-neutral-700/40 bg-neutral-800/40 text-neutral-300'}`}>
      <Calendar size={12} /> {d.toLocaleDateString()}
    </span>
  );
}

function TaskItem({ task, onToggle, onRemove }) {
  return (
    <div className="group flex items-start justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
      <button
        onClick={() => onToggle(task.id)}
        className="mt-0.5 inline-flex flex-none items-center justify-center rounded-full p-1 text-neutral-400 transition hover:text-yellow-400"
        aria-label={task.completed ? 'Mark as active' : 'Mark as completed'}
      >
        {task.completed ? <CheckCircle2 className="text-yellow-400" size={20} /> : <Circle size={20} />}
      </button>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className={`truncate text-sm ${task.completed ? 'text-neutral-500 line-through' : 'text-neutral-100'}`}>{task.title}</div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <DueBadge due={task.due} />
        </div>
      </div>

      <button
        onClick={() => onRemove(task.id)}
        className="invisible ml-2 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 transition hover:border-red-900 hover:bg-red-950 hover:text-red-300 group-hover:visible"
        aria-label="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

function TaskList({ tasks, onToggle, onRemove }) {
  if (!tasks.length)
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-8 text-center text-sm text-neutral-400">
        Nothing here yet. Add your first task above.
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />)
      )}
    </div>
  );
}

export default TaskList;
