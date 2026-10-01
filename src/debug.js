// Small helpers so every component logs in the same, easy-to-scan format.
// Open DevTools → Console to watch renders happen.

export function logRender(component, detail = '') {
  console.log(
    `%c[render]%c ${component}${detail ? `: ${detail}` : ''}`,
    'color:#B06A2C;font-weight:600',
    'color:inherit'
  );
}

// Called from a lazy useState initializer, which runs only once:
// when React creates (mounts) a new component instance.
export function logMount(component, detail = '') {
  console.log(
    `%c[mount] %c ${component}${detail ? `: ${detail}` : ''}`,
    'color:#1E7F68;font-weight:600',
    'color:inherit'
  );
}
