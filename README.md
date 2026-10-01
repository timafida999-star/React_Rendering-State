# Dino Park: Keeper Dashboard

A single-page React dashboard for a dinosaur park keeper: add dinosaurs, change their status, feed them, filter and sort the list.

**Live demo:** https://timafida999-star.github.io/kernel-panic-dashboard/

## Features

- Add and remove dinosaurs
- Change a dinosaur's status: Active, Resting, Sick
- Per-card local state: fullness, food eaten, double portion switch, keeper note
- Filter by status, species and search text
- Sort by arrival order, name, appetite or cost, and reverse the order
- Reset one card's local state, or all cards at once
- Keys experiment: switch card keys between id and array index to see state preservation break

## Tech

React 18 with functional components and `useState`. No Redux, no Context, no `useEffect`. Styles are written in SCSS. Built with Vite, deployed to GitHub Pages through GitHub Actions.

## Styles (SCSS)

```
src/styles/
├── main.scss            connects all partials with @use
├── abstracts/
│   ├── _variables.scss  colors, fonts, sizes, breakpoints, color maps
│   ├── _mixins.scss     flex, card, button-color, input, focus-ring, screen
│   └── _index.scss      forwards variables and mixins
├── base/                reset and typography
├── layout/              page layout and sidebar
└── components/          one partial per UI block (card, toolbar, buttons...)
```

Used SCSS features: variables, maps with `@each` loops (status and type colors), mixins with parameters and `@content`, nesting with `&` (BEM: `&__element`, `&--modifier`), partials with `@use` / `@forward`.

## Component tree

```
App                 parent state: dinosaurs list, filters, sort, key mode, debug flag, form key
├── Header          props only: totals, conditional "core undefended" alert
├── AddProgramForm  local state: form fields, validation error (key={formKey})
├── ReactLab        props only: key strategy, debug toggle, reset all
├── Toolbar         props only: search, status tabs, type filter, sort, reverse
└── ProgramList     props only: empty states, .map() with keys
    └── ProgramCard local state: fullness, food eaten, double portion, note (key={id + resetCount})
        └── HeatBar props only
```

## How state preservation and reset work

- Each card is rendered with `key={`${program.id}-r${program.resetCount}`}`. The id is stable, so when the list is filtered or sorted React matches each card to the same component instance and its local state moves with it.
- **Reset:** the Reset button increments `resetCount` in the parent. The key changes, React unmounts the old instance and mounts a new one, and the local state starts from its initial values.
- The add form uses the same trick: after adding a dinosaur the parent increments `formKey`, which remounts the form with empty fields.
- **Bug demo:** in the lab, choose *Key: array index*, feed a dinosaur, then filter or sort. The heat and note stay at the same position and appear on a different dinosaur.

## Watching re-renders

Open DevTools → Console.

- `[render] Component` is logged every time a component function runs.
- `[mount] Component` is logged from a lazy `useState` initializer, which only runs when React creates a new instance. A mount right after pressing Reset proves the key change remounted the card.
- Turn on *Show keys and render counts on cards* to see each card's key and how many times that instance has rendered (the counter restarts on remount).

`StrictMode` is not used, so each render is logged once instead of twice.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the app and publishes `dist` to GitHub Pages (Settings → Pages → Source: GitHub Actions).

## Image credits

Dinosaur pictures are loaded from Wikimedia Commons:

- T-Rex, Triceratops, Stegosaurus, Brachiosaurus: DataBase Center for Life Science (DBCLS), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
  ([T-Rex](https://commons.wikimedia.org/wiki/File:202007_Tyrannosaurus_rex.svg),
  [Triceratops](https://commons.wikimedia.org/wiki/File:202007_Triceratops_horridus.svg),
  [Stegosaurus](https://commons.wikimedia.org/wiki/File:202009_Stegosaurus_stenops.png),
  [Brachiosaurus](https://commons.wikimedia.org/wiki/File:202009_Brachiosaurus_altithorax.svg))
- Velociraptor: Fred Wierum, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
  ([source](https://commons.wikimedia.org/wiki/File:Velociraptor_Restoration.png))
