<script setup>
import Toggle from "./components/Toggle.vue";
import Ship from "./components/Ship.vue";

import { ref, watch } from "vue";
import { useSolverStore } from "./stores/solver";

const store = useSolverStore();
const { wormholes, solver, getJumpStyles } = store;

const displayTons = ref(true);
const rollFast = ref(true);

const displayMass = (value) => {
  return (value / (displayTons.value ? 1000 : 1)).toLocaleString();
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randColor = () => Math.floor(Math.random() * 100);

watch(store.ships, () => {
  solver(rollFast);
});
</script>

<template>
  <main>
    <div class="wh-info">
      <h2 class="col-span-full">{{ store.selectedWH.type }}</h2>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Total Mass:</span>{{ " " }}
        <span>
          {{ displayMass(store.selectedWH.totalMass * 0.9) }} -
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
          {{ displayMass(store.planMassKg.min) }} -
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
        <button
          class="w-max"
          @click="
            () => {
              store.ships.push({
                id: store.ships.length,
                name: 'roller',
                cold: 174_000_000,
                hot: 274_000_000,
                color: {
                  h: randomInt(0, 360),
                  s: randomInt(42, 98),
                  l: randomInt(40, 90),
                },
              });
              solver(rollFast);
            }
          "
        >
          Add Ship
        </button>
        <button
          class="clear w-max"
          @click="
            store.plan = [];
            store.ships = [];
          "
        >
          Clear Ships
        </button>
        <Toggle label-left="kg" label-right="tons" v-model="displayTons" />
        <Toggle label-left="safe" label-right="fast" v-model="rollFast" />
      </div>
    </div>
    <!-- interface to add ships w/ buttons to add jumps, and color select? -->
    <div class="col-span-full my-2">
      <!-- {{ JSON.stringify(ships) }} -->
    </div>
    <!-- interface to select fast/safe rolling -->
    <hr class="col-span-full" />
    <h3>Plan</h3>
    <div class="wh-bar h-12">
      <div
        v-for="jump in store.plan"
        class="ship-bar"
        :style="getJumpStyles(jump)"
      >
        {{ jump.jumpState }}
      </div>
    </div>
    <div class="ships-list">
      <Ship
        v-for="(ship, idx) in store.ships"
        :idx="idx"
        :ship="ship"
        :key="ship.id"
        :use-tons="displayTons"
        @change:ship="
          (ev) => {
            store.ships.splice(idx, 1, ev);
          }
        "
        @delete:ship="
          () => {
            store.ships.splice(idx, 1);
          }
        "
        @copy:ship="
          () => {
            store.ships.push(Object.assign({}, ship));
          }
        "
      />
    </div>
  </main>
</template>

<style scoped>
select {
  @apply col-span-1;
}

.controls {
  @apply flex flex-row content-center justify-between gap-2 mt-2;
}

.mass-label {
  @apply font-semibold;
}

.wh-info {
  @apply w-full;
}

.wh-bar {
  @apply w-full overflow-hidden items-center rounded-lg flex flex-row col-span-full bg-gradient-to-r from-gray-700 from-9/11 via-10/11 via-yellow-500 to-red-600;
}

.ship-bar {
  @apply h-8 p-1 flex-shrink-0 flex-grow-0 text-center border-r-slate-400 border-solid border-r-2 overflow-hidden hover:isolate;
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
</style>
