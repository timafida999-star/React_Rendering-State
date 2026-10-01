import { logRender } from '../debug.js';

export default function Header({ programs }) {
  logRender('Header');

  const online = programs.filter((p) => p.status === 'online');
  const onlineDamage = online.reduce((sum, p) => sum + p.damage, 0);
  const budget = programs.reduce((sum, p) => sum + p.cost, 0);

  const stats = [
    { label: 'Dinosaurs', value: programs.length },
    { label: 'Active now', value: online.length },
    { label: 'Food per meal, kg', value: onlineDamage },
    { label: 'Coins spent', value: budget },
  ];

  return (
    <header className="header">
      <div>
        <h1>Dinosaurs in the park</h1>
        <p className="header__subtitle">Look after your dinosaurs: feed them, let them rest and keep them healthy.</p>
      </div>

      <dl className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <dt className="stat__label">{s.label}</dt>
            <dd className="stat__value">{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* Conditional rendering: the alert only exists when nothing is online */}
      {programs.length > 0 && online.length === 0 && (
        <p className="header__alert" role="status">
          No dinosaur is active. Visitors have nothing to see.
        </p>
      )}
    </header>
  );
}
