import ProgramCard from './ProgramCard.jsx';
import { logRender } from '../debug.js';

export default function ProgramList({
  programs,
  totalCount,
  isFiltered,
  keyMode,
  showDebug,
  onClearFilters,
  onRemove,
  onStatusChange,
  onReset,
}) {
  logRender('ProgramList', `${programs.length} cards`);

  // Conditional rendering: two different empty states
  if (totalCount === 0) {
    return (
      <div className="empty">
        <h2>The grid is empty</h2>
        <p>Deploy your first security program with the form on the left.</p>
      </div>
    );
  }

  if (programs.length === 0 && isFiltered) {
    return (
      <div className="empty">
        <h2>No programs match these filters</h2>
        <p>Try another status or type, or clear the search.</p>
        <button type="button" className="btn btn--ghost" onClick={onClearFilters}>Clear filters</button>
      </div>
    );
  }

  return (
    <ul className="card-grid">
      {programs.map((program, index) => {
        // KEY = component identity.
        // 'id' mode: identity follows the program (correct).
        // 'index' mode: identity follows the position (demonstrates the bug).
        // resetCount is part of the key: bumping it forces a remount (reset).
        const key =
          keyMode === 'id'
            ? `${program.id}-r${program.resetCount}`
            : `index-${index}-r${program.resetCount}`;

        return (
          <ProgramCard
            key={key}
            debugKey={key}
            program={program}
            showDebug={showDebug}
            onRemove={onRemove}
            onStatusChange={onStatusChange}
            onReset={onReset}
          />
        );
      })}
    </ul>
  );
}
