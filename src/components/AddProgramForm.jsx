import { useState } from 'react';
import { PROGRAM_TYPES, SECTORS, getType } from '../data.js';
import { logMount, logRender } from '../debug.js';

const EMPTY_FORM = { name: '', type: 'T-Rex', sector: 'Jungle', damage: '20', range: '3', cost: '300' };

// The form owns its input values as LOCAL state. The parent only receives the
// finished program through onAdd. After a successful add the parent changes
// this component's key, so React mounts a fresh form with empty fields.
export default function AddProgramForm({ onAdd }) {
  const [form, setForm] = useState(() => {
    logMount('AddProgramForm');
    return EMPTY_FORM;
  });
  const [error, setError] = useState('');

  logRender('AddProgramForm', form.name ? `typing "${form.name}"` : '');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const damage = Number(form.damage);
    const range = Number(form.range);
    const cost = Number(form.cost);

    if (!name) return setError('Give the dinosaur a name.');
    if (damage < 1 || damage > 99) return setError('Appetite must be between 1 and 99 kg.');
    if (range < 1 || range > 6) return setError('Speed must be between 1 and 6.');
    if (cost < 10 || cost > 999) return setError('Cost must be between 10 and 999.');

    onAdd({ name, type: form.type, sector: form.sector, damage, range, cost });
  }

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2 className="panel__title">New dinosaur</h2>

      <label className="field">
        <span>Name</span>
        <input
          type="text"
          value={form.name}
          maxLength={24}
          placeholder="e.g. Pebbles"
          onChange={(e) => update('name', e.target.value)}
        />
      </label>

      <label className="field">
        <span>Species</span>
        <select value={form.type} onChange={(e) => update('type', e.target.value)}>
          {PROGRAM_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.value}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Enclosure</span>
        <select value={form.sector} onChange={(e) => update('sector', e.target.value)}>
          {SECTORS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <p className="form__role">{getType(form.type).role}</p>

      <div className="field-row">
        <label className="field">
          <span>Appetite, kg</span>
          <input type="number" min="1" max="99" value={form.damage} onChange={(e) => update('damage', e.target.value)} />
        </label>
        <label className="field">
          <span>Speed</span>
          <input type="number" min="1" max="6" value={form.range} onChange={(e) => update('range', e.target.value)} />
        </label>
        <label className="field">
          <span>Cost</span>
          <input type="number" min="10" max="999" step="10" value={form.cost} onChange={(e) => update('cost', e.target.value)} />
        </label>
      </div>

      {error && <p className="form__error" role="alert">{error}</p>}

      <button type="submit" className="btn btn--accent btn--full">Add dinosaur</button>
    </form>
  );
}
