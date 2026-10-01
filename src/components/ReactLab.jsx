import { logRender } from '../debug.js';

// Controls used to demonstrate keys and state preservation during the defense.
export default function ReactLab({ keyMode, onKeyModeChange, showDebug, onShowDebugChange, onResetAll, hasPrograms }) {
  logRender('ReactLab', `keyMode=${keyMode}`);

  return (
    <section className="panel">
      <h2 className="panel__title">Keys experiment</h2>
      <p className="panel__text">Feed a dinosaur or write a note on its card, then filter or sort the list.</p>

      <div className="switcher" role="group" aria-label="Key used for each card">
        <button
          type="button"
          className={`switcher__btn ${keyMode === 'id' ? 'is-active' : ''}`}
          aria-pressed={keyMode === 'id'}
          onClick={() => onKeyModeChange('id')}
        >
          key = id
        </button>
        <button
          type="button"
          className={`switcher__btn ${keyMode === 'index' ? 'is-active' : ''}`}
          aria-pressed={keyMode === 'index'}
          onClick={() => onKeyModeChange('index')}
        >
          key = index
        </button>
      </div>

      {keyMode === 'id' ? (
        <p className="lab-note lab-note--ok">Local state moves together with its dinosaur.</p>
      ) : (
        <p className="lab-note lab-note--warn">
          Local state stays at the position, so after filtering it shows up on the wrong dinosaur.
        </p>
      )}

      <label className="checkbox">
        <input type="checkbox" checked={showDebug} onChange={(e) => onShowDebugChange(e.target.checked)} />
        <span>Show keys and render counts</span>
      </label>

      <button type="button" className="btn btn--light btn--full" onClick={onResetAll} disabled={!hasPrograms}>
        Reset all cards
      </button>
    </section>
  );
}
