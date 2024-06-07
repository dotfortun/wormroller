<script setup>
import { ref, watch, computed } from "vue";
import draggable from "vuedraggable";

import { useSolverStore } from "./stores/solver";

import Toggle from "./components/Toggle.vue";
import RadioGroup from "./components/RadioGroup.vue";
import Ship from "./components/Ship.vue";
import PolarTimer from "./components/PolarTimer.vue";

const store = useSolverStore();
const { wormholes, stages, solver, getJumpStyles } = store;

const displayTons = ref(true);
const rollFast = ref(true);
const useText = ref(true);

const displayMass = (value) => {
  return (value / (displayTons.value ? 1000 : 1)).toLocaleString();
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const swapShips = (ev) => {
  if (ev.newIdx >= 0 && ev.newIdx < store.ships.length) {
    let a = store.ships[Math.min(ev.oldIdx, ev.newIdx)];
    let b = store.ships[Math.max(ev.oldIdx, ev.newIdx)];
    store.ships.splice(Math.min(ev.oldIdx, ev.newIdx), 2, b, a);
  }
};

const copyShip = (ship) => {
  let newShip = JSON.parse(JSON.stringify(ship));
  newShip.id = Math.floor(Math.random() * 1000000);
  return newShip;
};

watch(
  [store.ships, () => store.selectedStage.name, () => store.selectedWH.type],
  () => {
    solver(rollFast);
  }
);
</script>

<template>
  <main class="container">
    <PolarTimer />
  </main>
  <footer class="container">
    <div>
      <p>
        <small>
          <ul>
            <li class="list-none">
              Created by
              <a href="https://github.com/dotfortun">dotfortun</a> and
              <a href="https://github.com/israeldail" target="_blank"
                >israeldail</a
              >.
            </li>
            <li class="list-none">
              Donations to Peter Dostoevsky in Eve Online will be turned into
              lossmails.
            </li>
            <li class="list-none">
              <a
                href="https://www.eveonline.com/signup?invc=5d52b821-87c0-4c81-bd0a-2cd88e9001b6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try Eve Online
              </a>
              or
              <a
                href="https://www.buymeacoffee.com/shanebelldev"
                target="_blank"
                rel="noopener noreferrer"
                >buy me a coffee</a
              >
            </li>
          </ul>
        </small>
      </p>
    </div>

    <div>
      <p>
        <a
          href="https://github.com/dotfortun/wormroller/labels/bug"
          target="_blank"
        >
          Found a bug? Tell us here!
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.controls {
  @apply grid grid-cols-2 justify-items-center gap-6 mt-2;
}

option:disabled {
  @apply text-slate-400 font-bold bg-slate-800;
}

.ghost {
  @apply rounded-md border-dashed border-slate-100 border-2 opacity-10;
}

.wh-bar {
  --slate-500: rgba(100 116 139 / 1);
  --danger-red: rgba(194 31 37 / 1);
  --warn-yellow: rgba(220 220 10 / 1);
  --safe-green: rgba(50 175 50 / 1);

  @apply bg-slate-500;
}

.wh-bar.wh-bar.stage_1 {
  background: linear-gradient(
    90deg,
    var(--slate-500) 0%,
    var(--slate-500) calc(9 / 11 * 100%),
    var(--safe-green) calc(9 / 11 * 100%),
    var(--warn-yellow) calc(10 / 11 * 100%),
    var(--danger-red) 100%
  );
}

.wh-bar.stage_2 {
  background: linear-gradient(
    90deg,
    var(--slate-500) 0%,
    var(--slate-500) calc(9 / 11 / 2 * 100%),
    var(--safe-green) calc(9 / 11 / 2 * 100%),
    var(--warn-yellow) calc(10 / 11 / 2 * 100%),
    var(--danger-red) 100%
  );
}

.wh-bar.stage_3 {
  background: linear-gradient(
    90deg,
    var(--safe-green) 0%,
    var(--warn-yellow) 50%,
    var(--danger-red) 100%
  );
}

footer ul {
  @apply pl-0;
}
</style>
