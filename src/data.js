// Pictures come from Wikimedia Commons (free licenses, see README → Image credits).
// Special:FilePath + ?width= returns a small thumbnail instead of the full file.
const commons = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=240`;

export const PROGRAM_TYPES = [
  {
    value: 'T-Rex',
    code: 'TR',
    role: 'Top predator. Needs a strong fence and a lot of meat.',
    image: commons('202007_Tyrannosaurus_rex.svg'),
  },
  {
    value: 'Triceratops',
    code: 'TC',
    role: 'Calm plant eater that defends itself with three horns.',
    image: commons('202007_Triceratops_horridus.svg'),
  },
  {
    value: 'Velociraptor',
    code: 'VR',
    role: 'Small, fast and clever. Hunts in packs.',
    image: commons('Velociraptor_Restoration.png'),
  },
  {
    value: 'Stegosaurus',
    code: 'SG',
    role: 'Slow plant eater with plates on its back and a spiked tail.',
    image: commons('202009_Stegosaurus_stenops.png'),
  },
  {
    value: 'Brachiosaurus',
    code: 'BR',
    role: 'Long-necked giant that eats leaves from the tallest trees.',
    image: commons('202009_Brachiosaurus_altithorax.svg'),
  },
];

export const STATUSES = [
  { value: 'online', label: 'Active' },
  { value: 'patching', label: 'Resting' },
  { value: 'offline', label: 'Sick' },
];

export const SECTORS = ['Jungle', 'Volcano valley', 'River delta', 'Fern meadow', 'Rocky cliffs'];

export const SORT_OPTIONS = [
  { value: 'deployed', label: 'Arrival order' },
  { value: 'name', label: 'Name' },
  { value: 'damage', label: 'Appetite' },
  { value: 'cost', label: 'Cost' },
];

export function getType(value) {
  return PROGRAM_TYPES.find((t) => t.value === value) ?? PROGRAM_TYPES[0];
}

// Every item has a stable `id` (used as the React key) and a `resetCount`.
// Bumping resetCount changes the key, which makes React throw away the old
// card instance and mount a fresh one: an intentional local-state reset.
//
// damage = appetite (kg per meal), range = speed (1-6), cost = coins
export const INITIAL_PROGRAMS = [
  { id: 'prg-1', name: 'Bruno', type: 'T-Rex', status: 'online', damage: 60, range: 4, cost: 900, sector: 'Volcano valley', resetCount: 0 },
  { id: 'prg-2', name: 'Tricia', type: 'Triceratops', status: 'patching', damage: 35, range: 2, cost: 450, sector: 'Fern meadow', resetCount: 0 },
  { id: 'prg-3', name: 'Dash', type: 'Velociraptor', status: 'online', damage: 12, range: 6, cost: 300, sector: 'Jungle', resetCount: 0 },
  { id: 'prg-4', name: 'Plates', type: 'Stegosaurus', status: 'offline', damage: 28, range: 1, cost: 380, sector: 'Rocky cliffs', resetCount: 0 },
  { id: 'prg-5', name: 'Lou', type: 'Brachiosaurus', status: 'online', damage: 95, range: 2, cost: 800, sector: 'River delta', resetCount: 0 },
  { id: 'prg-6', name: 'Nibbles', type: 'Velociraptor', status: 'online', damage: 10, range: 5, cost: 280, sector: 'Jungle', resetCount: 0 },
];
