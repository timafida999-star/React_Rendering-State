import { useRef, useState } from 'react';
import HeatBar from './HeatBar.jsx';
import { STATUSES, getType } from '../data.js';
import { logMount, logRender } from '../debug.js';

export default function ProgramCard({ program, debugKey, showDebug, onRemove, onStatusChange, onReset }) {
  const { id, name, type, status, damage, range, cost, sector } = program;

  // ---- LOCAL state: belongs to this card instance only ----
  // The lazy initializer runs once per mount, so it tells us exactly
  // when React creates a new instance (first render or key change).
  const [heat, setHeat] = useState(() => {
    logMount('ProgramCard', name);
    return 0;
  });
  const [dealt, setDealt] = useState(0);
  const [overclock, setOverclock] = useState(false);
  const [note, setNote] = useState('');

  // Render counter (only for the debug view). useRef survives re-renders
  // but is wiped on remount, just like useState.
  const renders = useRef(0);
  renders.current += 1;

  logRender('ProgramCard', `${name} (heat ${heat}%, render #${renders.current})`);

  const typeInfo = getType(type);
  const effectiveDamage = overclock ? damage * 2 : damage;
  const heatPerShot = overclock ? 25 : 10;
  const overheated = heat >= 100;
  const canFire = status === 'online' && !overheated;

  function fire() {
    setHeat((h) => Math.min(100, h + heatPerShot));
    setDealt((d) => d + effectiveDamage);
  }

  let fireLabel = 'Feed';
  if (status === 'offline') fireLabel = 'Sick';
  else if (status === 'patching') fireLabel = 'Resting…';
  else if (overheated) fireLabel = 'Full';

  let cardClass = `card card--${status}`;
  if (overheated) cardClass += ' card--hot';

  return (
    <li className={cardClass}>
      <div className="card__top">
        {/* Picture of the species. If it fails to load, it hides itself
            and the colored badge with letters stays visible underneath. */}
        <span className={`card__badge card__badge--${typeInfo.code.toLowerCase()}`}>
          {typeInfo.code}
          <img
            className="card__avatar"
            src={typeInfo.image}
            alt={type}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </span>
        <div className="card__title">
          <h3>{name}</h3>
          <p className="card__meta">{type} · {sector}</p>
        </div>
        <button
          type="button"
          className="icon-btn"
          aria-label={`Remove ${name}`}
          title="Remove"
          onClick={() => onRemove(id)}
        >
          ×
        </button>
      </div>

      {/* Data owned by the parent (App), received as props */}
      <div className="card__stats">
        <div className="card__stat">
          <span>Appetite</span>
          <strong>{effectiveDamage}</strong>
          {overclock && <small className="card__boost"> ×2</small>}
        </div>
        <div className="card__stat">
          <span>Speed</span>
          <strong>{range}</strong>
        </div>
        <div className="card__stat">
          <span>Cost</span>
          <strong>{cost}</strong>
        </div>
      </div>

      <select
        className="card__status"
        aria-label={`Status of ${name}`}
        value={status}
        onChange={(e) => onStatusChange(id, e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {/* Local state of this card instance */}
      <div className="card__session">
        <HeatBar heat={heat} programName={name} />

        <div className="card__row">
          <span>
            Food eaten: <strong>{dealt} kg</strong>
          </span>
          <label className="checkbox">
            <input type="checkbox" checked={overclock} onChange={(e) => setOverclock(e.target.checked)} />
            <span>Double portion</span>
          </label>
        </div>

        <input
          type="text"
          className="card__note"
          placeholder="Keeper note"
          aria-label={`Note for ${name}`}
          value={note}
          maxLength={60}
          onChange={(e) => setNote(e.target.value)}
        />

        {overheated && <p className="card__warning">Full! Press Reset to start a new day.</p>}

        <div className="card__actions">
          <button type="button" className="btn btn--dark" onClick={fire} disabled={!canFire}>
            {fireLabel}
          </button>
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => onReset(id)}
            disabled={heat === 0 && dealt === 0 && !overclock && note === ''}
          >
            Reset
          </button>
        </div>
      </div>

      {showDebug && (
        <p className="card__debug">
          <span>key=&quot;{debugKey}&quot;</span>
          <span>renders: {renders.current}</span>
        </p>
      )}
    </li>
  );
}
