import { PROGRAM_TYPES, SORT_OPTIONS, STATUSES } from '../data.js';
import { logRender } from '../debug.js';

const STATUS_TABS = [{ value: 'all', label: 'All' }, ...STATUSES];

export default function Toolbar({
  filters,
  statusCounts,
  onFilterChange,
  sortBy,
  onSortChange,
  reversed,
  onReverse,
  shownCount,
}) {
  logRender('Toolbar');

  return (
    <div className="toolbar">
      <div className="toolbar__row">
        <input
          type="search"
          className="toolbar__search"
          placeholder="Search by name or enclosure"
          aria-label="Search dinosaurs"
          value={filters.query}
          onChange={(e) => onFilterChange('query', e.target.value)}
        />

        <div className="tabs" role="group" aria-label="Filter by status">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={`tab ${filters.status === tab.value ? 'is-active' : ''}`}
              aria-pressed={filters.status === tab.value}
              onClick={() => onFilterChange('status', tab.value)}
            >
              {tab.label}
              <span className="tab__count">{statusCounts[tab.value]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="toolbar__row">
        <label className="toolbar__select">
          Species
          <select value={filters.type} onChange={(e) => onFilterChange('type', e.target.value)}>
            <option value="all">All species</option>
            {PROGRAM_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.value}</option>
            ))}
          </select>
        </label>

        <label className="toolbar__select">
          Sort by
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className={`btn btn--outline ${reversed ? 'is-active' : ''}`}
          aria-pressed={reversed}
          onClick={onReverse}
        >
          ⇅ Reverse
        </button>

        <p className="toolbar__count">
          {shownCount} of {statusCounts.all} shown
        </p>
      </div>
    </div>
  );
}
