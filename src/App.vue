<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";

import { useSolverStore } from "./stores/solver";

import Toggle from "./components/Toggle.vue";
import Ship from "./components/Ship.vue";

const store = useSolverStore();
const { wormholes, solver, getJumpStyles } = store;

const displayTons = ref(true);
const rollFast = ref(true);
const useText = ref(true);

const displayMass = (value) => {
  return (value / (displayTons.value ? 1000 : 1)).toLocaleString();
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

watch(store.ships, () => {
  solver(rollFast);
});
</script>

<template>
  <main class="container">
    <div class="wh-info">
      <h2 class="col-span-full">{{ store.selectedWH.type }}</h2>
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
    </div>
    <div>
      <select v-model="store.selectedWH" @change="solver(rollFast)">
        <option v-for="wh in wormholes" :key="wh.type" :value="wh">
          {{ wh.type }}
        </option>
      </select>
      <div class="controls">
        <div class="col-span-full">
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
        <Toggle label-left="kg" label-right="tons" v-model="displayTons" />
        <Toggle label-left="icons" label-right="text" v-model="useText" />
      </div>
    </div>
    <hr class="col-span-full my-4" />
    <h3>Plan</h3>
    <div class="wh-bar h-12">
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
      >
        <template #item="{ element: ship, index: idx }">
          <Ship
            :idx="idx"
            :ship="ship"
            :use-tons="displayTons"
            @change:ship="store.ships.splice(idx, 1, $event)"
            @delete:ship="store.ships.splice(idx, 1)"
            @copy:ship="store.ships.push(JSON.parse(JSON.stringify(ship)))"
          />
        </template>
      </draggable>
    </div>
  </main>
  <footer>
    <div>
      <p>
        Created by <a href="https://github.com/dotfortun">dotfortun</a> and
        <a href="https://github.com/israeldail">israeldail</a>.
      </p>
      <p>
        <small>
          ISK donations to Peter Dostoevsky will be turned into explosions
          somehow.
        </small>
      </p>
    </div>
    <div>
      <p>
        <a href="https://github.com/dotfortun/wormroller/issues">
          Found a bug? Tell us here!
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
select {
  @apply col-span-1;
}

footer {
  @apply flex flex-row content-center justify-between p-4 text-slate-400;
}

footer a {
  @apply text-cyan-400 decoration-solid;
}


.controls {
  @apply grid grid-cols-2 content-center justify-between gap-2 mt-2;
}

.mass-label {
  @apply font-semibold;
}

.wh-info {
  @apply w-full md:flex flex-col w-full;
}

.wh-bar {
  @apply w-full overflow-hidden items-center rounded-lg flex flex-row col-span-full bg-gradient-to-r from-gray-700 from-9/11 via-10/11 via-yellow-500 to-red-600;
}

.ship-bar {
  @apply relative h-8 p-1 flex-shrink-0 flex-grow-0 text-center border-r-slate-400 border-solid border-r-2 overflow-hidden hover:isolate;
}
.ship-bar:first-child {
  @apply rounded-l-lg;
}

.ship-bar:last-child {
  @apply rounded-r-lg border-r-0;
}

.ships-list {
  @apply col-span-2 content-center;
}

.warning-line {
  @apply absolute right-3/11 top-0 h-10 z-10 border-red-700 border-r-2;
}
</style>
