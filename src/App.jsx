import { useState } from 'react';
import Header from './components/Header.jsx';
import AddProgramForm from './components/AddProgramForm.jsx';
import ReactLab from './components/ReactLab.jsx';
import Toolbar from './components/Toolbar.jsx';
import ProgramList from './components/ProgramList.jsx';
import { INITIAL_PROGRAMS } from './data.js';
import { logRender } from './debug.js';

const SORTERS = {
  deployed: null, 
  name: (a, b) => a.name.localeCompare(b.name),
  damage: (a, b) => b.damage - a.damage,
  cost: (a, b) => b.cost - a.cost,
};

const EMPTY_FILTERS = { status: 'all', type: 'all', query: '' };

function makeId() {
  return `prg-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export default function App() {
  // ---- Parent (shared) state: lives here, passed down as props ----
  const [programs, setPrograms] = useState(INITIAL_PROGRAMS);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState('deployed');
  const [reversed, setReversed] = useState(false);
  const [keyMode, setKeyMode] = useState('id'); // 'id' (correct) | 'index' (bug demo)
  const [showDebug, setShowDebug] = useState(false);
  const [formKey, setFormKey] = useState(0);

  logRender('App', `${programs.length} programs`);

  // ---- Updates always create new arrays/objects (never mutate state) ----
  function addProgram(data) {
    setPrograms((prev) => [...prev, { ...data, id: makeId(), status: 'online', resetCount: 0 }]);
    // New key for the form = React mounts a brand-new form = empty fields.
    setFormKey((k) => k + 1);
  }

  function removeProgram(id) {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  }

  function changeStatus(id, status) {
    setPrograms((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  function resetProgram(id) {
    setPrograms((prev) => prev.map((p) => (p.id === id ? { ...p, resetCount: p.resetCount + 1 } : p)));
  }

  function resetAll() {
    setPrograms((prev) => prev.map((p) => ({ ...p, resetCount: p.resetCount + 1 })));
  }

  function updateFilter(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // ---- Derived data: calculated during render, not stored in state ----
  const query = filters.query.trim().toLowerCase();
  const visible = programs.filter(
    (p) =>
      (filters.status === 'all' || p.status === filters.status) &&
      (filters.type === 'all' || p.type === filters.type) &&
      (query === '' || p.name.toLowerCase().includes(query) || p.sector.toLowerCase().includes(query))
  );

  const sorter = SORTERS[sortBy];
  const ordered = sorter ? [...visible].sort(sorter) : [...visible];
  if (reversed) ordered.reverse();

  const statusCounts = programs.reduce(
    (acc, p) => ({ ...acc, [p.status]: acc[p.status] + 1 }),
    { all: programs.length, online: 0, patching: 0, offline: 0 }
  );

  const isFiltered = filters.status !== 'all' || filters.type !== 'all' || query !== '';

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand__logo">🦖</span>
          <div>
            <p className="brand__name">Dino Park</p>
            <p className="brand__tagline">Keeper dashboard</p>
          </div>
        </div>

        <AddProgramForm key={formKey} onAdd={addProgram} />
        <ReactLab
          keyMode={keyMode}
          onKeyModeChange={setKeyMode}
          showDebug={showDebug}
          onShowDebugChange={setShowDebug}
          onResetAll={resetAll}
          hasPrograms={programs.length > 0}
        />
      </aside>

      <main className="content">
        <Header programs={programs} />

        <Toolbar
          filters={filters}
          statusCounts={statusCounts}
          onFilterChange={updateFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          reversed={reversed}
          onReverse={() => setReversed((r) => !r)}
          shownCount={ordered.length}
        />

        <ProgramList
          programs={ordered}
          totalCount={programs.length}
          isFiltered={isFiltered}
          keyMode={keyMode}
          showDebug={showDebug}
          onClearFilters={() => setFilters(EMPTY_FILTERS)}
          onRemove={removeProgram}
          onStatusChange={changeStatus}
          onReset={resetProgram}
        />

        <p className="credits">
          Dinosaur pictures: DBCLS (CC BY 4.0) and Fred Wierum (CC BY-SA 4.0), via Wikimedia Commons.
        </p>
      </main>
    </div>
  );
}
