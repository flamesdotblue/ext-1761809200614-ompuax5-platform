import { Filter, Search, Trash2 } from 'lucide-react';

function Toolbar({ filter, onFilterChange, search, onSearchChange, sort, onSortChange, stats, onClearCompleted }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950/60 p-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`rounded-lg px-3 py-1.5 text-sm ${filter === 'all' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'}`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange('active')}
          className={`rounded-lg px-3 py-1.5 text-sm ${filter === 'active' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'}`}
        >
          Active
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`rounded-lg px-3 py-1.5 text-sm ${filter === 'completed' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'}`}
        >
          Completed
        </button>

        <div className="ml-2 hidden items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2 py-1.5 text-sm text-neutral-300 md:flex">
          <Filter size={16} className="text-neutral-400" />
          <select
            aria-label="Sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-neutral-200 outline-none"
          >
            <option value="created">Newest</option>
            <option value="due">Due date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>Total {stats.total}</span>
          <span>•</span>
          <span>Active {stats.active}</span>
          <span>•</span>
          <span>Done {stats.completed}</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm text-neutral-300">
            <Search size={16} className="text-neutral-400" />
            <input
              aria-label="Search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="bg-transparent text-neutral-200 outline-none placeholder:text-neutral-500"
            />
          </label>

          <button
            onClick={onClearCompleted}
            className="inline-flex items-center gap-2 rounded-lg border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-300 transition hover:bg-red-900/60"
          >
            <Trash2 size={16} />
            Clear done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
