import { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import TaskComposer from './components/TaskComposer';
import Toolbar from './components/Toolbar';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem('tt_tasks');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState('all'); // all | active | completed
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('created'); // created | due | priority

  useEffect(() => {
    localStorage.setItem('tt_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (payload) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: payload.title.trim(),
      completed: false,
      due: payload.due || '',
      priority: payload.priority || 'medium',
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = useMemo(() => {
    let list = [...tasks];

    if (filter === 'active') list = list.filter((t) => !t.completed);
    if (filter === 'completed') list = list.filter((t) => t.completed);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }

    if (sort === 'created') {
      list.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sort === 'due') {
      list.sort((a, b) => {
        const ad = a.due ? new Date(a.due).getTime() : Infinity;
        const bd = b.due ? new Date(b.due).getTime() : Infinity;
        return ad - bd;
      });
    } else if (sort === 'priority') {
      const order = { high: 0, medium: 1, low: 2 };
      list.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return list;
  }, [tasks, filter, search, sort]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <HeroCover />

      <main className="relative mx-auto -mt-24 w-full max-w-3xl px-4 pb-24">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-100">Your Tasks</h2>
            <p className="mt-1 text-sm text-neutral-400">Capture, prioritize, and complete with focus.</p>

            <div className="mt-6">
              <TaskComposer onAdd={addTask} />
            </div>

            <div className="mt-4">
              <Toolbar
                filter={filter}
                onFilterChange={setFilter}
                search={search}
                onSearchChange={setSearch}
                sort={sort}
                onSortChange={setSort}
                stats={stats}
                onClearCompleted={clearCompleted}
              />
            </div>

            <div className="mt-4">
              <TaskList tasks={filtered} onToggle={toggleTask} onRemove={removeTask} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
