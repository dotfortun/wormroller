<script setup>
import { ref, watch, computed } from "vue";
import draggable from "vuedraggable";

import { useSolverStore } from "./stores/solver";

import Toggle from "./components/Toggle.vue";
import RadioGroup from "./components/RadioGroup.vue";
import Ship from "./components/Ship.vue";

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
    <div class="wh-info">
      <select v-model="store.selectedWH" @change="solver(rollFast)">
        <option disabled>Static</option>
        <option
          v-for="wh in wormholes.filter((elem) =>
            elem.link_types.includes('static')
          )"
          :key="wh.type"
          :value="wh"
        >
          {{ wh.type }}
        </option>
        <option disabled>Pochven</option>
        <option
          v-for="wh in wormholes.filter((elem) =>
            elem.link_types.includes('pochven')
          )"
          :key="wh.type"
          :value="wh"
        >
          {{ wh.type }}
        </option>
        <option disabled>Wandering</option>
        <option
          v-for="wh in wormholes.filter((elem) =>
            elem.link_types.includes('wandering')
          )"
          :key="wh.type"
          :value="wh"
        >
          {{ wh.type }}
        </option>
      </select>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Total Mass:</span>{{ " " }}
        <span>
          {{ displayMass(store.selectedWH.totalMass * 0.9) }} —
          {{ displayMass(store.selectedWH.totalMass * 1.1) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Jump Mass:</span>{{ " " }}
        <span>
          {{ displayMass(store.selectedWH.jumpMass) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Remaining:</span>{{ " " }}
        <span>
          {{ displayMass(store.planMassKg.min) }} —
          {{ displayMass(store.planMassKg.max) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
      <div class="col-span-full flex justify-around mt-4">
        <button
          class="w-max"
          @click="
            store.ships.push({
              id: Math.floor(Math.random() * 1000000),
              name: 'roller',
              cold: 174_000_000,
              hot: 274_000_000,
              isThreader: false,
              color: {
                h: randomInt(0, 360),
                s: randomInt(42, 98),
                l: randomInt(40, 90),
              },
            });
            solver(rollFast);
          "
        >
          Add Ship
        </button>
        <button
          class="clear w-max"
          @click="
            store.plan.length = 0;
            store.ships.length = 0;
          "
        >
          Clear Ships
        </button>
      </div>
    </div>
    <div>
      <div class="controls">
        <Toggle label-left="kg" label-right="tons" v-model="displayTons" />
        <Toggle label-left="icons" label-right="text" v-model="useText" />
        <div class="col-span-full h-24 w-full pr-8">
          <RadioGroup
            v-model:model-value="store.selectedStage"
            :options="stages"
          />
        </div>
      </div>
    </div>
    <hr class="col-span-full my-4" />
    <h3>Plan</h3>
    <div :class="`wh-bar h-12 ${store.selectedStage.name.replace(/\s/, '_')}`">
      <div
        v-for="jump in store.plan"
        class="ship-bar"
        :style="getJumpStyles(jump)"
      >
        <template v-if="useText">
          {{ jump.jumpState }}
        </template>
        <template v-else>
          <font-awesome-icon v-if="jump.jumpState === 'hot'" icon="fire" />
          <font-awesome-icon v-else icon="snowflake" />
        </template>
      </div>
    </div>
    <hr v-if="store.ships.length" class="col-span-full my-4" />
    <div class="ships-list">
      <h3 v-if="store.ships.length">Ships</h3>
      <draggable
        v-model="store.ships"
        item-key="id"
        @end="solver(rollFast)"
        :on-remove="(ev) => console.log(ev)"
        handle=".handle"
        ghost-class="ghost"
      >
        <template #item="{ element: ship, index: idx }">
          <Ship
            :idx="idx"
            :ship="ship"
            :use-tons="displayTons"
            @change:ship="store.ships.splice(idx, 1, $event)"
            @change:ship-idx="swapShips($event)"
            @delete:ship="store.ships.splice(idx, 1)"
            @copy:ship="store.ships.push(copyShip(ship))"
          />
        </template>
      </draggable>
    </div>
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
