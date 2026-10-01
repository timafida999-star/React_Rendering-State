import { logRender } from '../debug.js';

// Presentational child: no state, only props.
export default function HeatBar({ heat, programName }) {
  logRender('HeatBar', `${programName} ${heat}%`);

  let fillClass = 'heat-bar__fill';
  if (heat >= 100) fillClass += ' heat-bar__fill--max';
  else if (heat >= 60) fillClass += ' heat-bar__fill--high';

  return (
    <div className="heat-bar">
      <div className="heat-bar__label">
        <span>Fullness</span>
        <strong>{heat}%</strong>
      </div>
      <div
        className="heat-bar__track"
        role="progressbar"
        aria-label={`${programName} fullness`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={heat}
      >
        <div className={fillClass} style={{ width: `${heat}%` }} />
      </div>
    </div>
  );
}
