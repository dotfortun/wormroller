<script setup>
import Toggle from "./components/Toggle.vue";

import { ref, watch } from "vue";
import { useSolverStore } from "./stores/solver";

const store = useSolverStore();
const {
  currMassKg,
  selectedWH,
  wormholes,
  ships,
  jumps,
  allJumpsMass,
  solver,
} = store;

const displayTons = ref(true);
const rollSafe = ref(true);
const useEmoji = ref(false);

const displayMass = (value) => {
  return (value / (displayTons.value ? 1000 : 1)).toLocaleString();
};

const getJumpMassPercent = (jump) => {
  return (jump.mass / store.selectedWH.totalMass) * 100;
};

console.log(
  jumps.reduce((prevTotal, jump) => {
    return prevTotal + jump.mass;
  }, 0)
);
</script>

<template>
  <main>
    <div class="wh-info">
      <h2 class="col-span-full">{{ store.selectedWH.type }}</h2>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Total Mass:</span>{{ " " }}
        <span>
          {{ displayMass(store.selectedWH.totalMass) }}
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
          {{ displayMass(store.currMassKg.min) }} -
          {{ displayMass(store.currMassKg.max) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
    </div>
    <div class="controls">
      <select v-model="store.selectedWH">
        <option v-for="wh in wormholes" :key="wh.type" :value="wh">
          {{ wh.type }}
        </option>
      </select>
      <Toggle label-left="kg" label-right="tons" v-model="displayTons" />
      <Toggle label-left="fast" label-right="safe" v-model="rollSafe" />
      <!-- <Toggle label-left="no" label-right="✅" v-model="useEmoji" /> -->
    </div>
    <!-- interface to add ships w/ buttons to add jumps, and color select? -->
    <div class="col-span-full">
      <!-- {{ JSON.stringify(ships) }} -->
    </div>
    <!-- interface to select fast/safe rolling -->
    <hr class="col-span-full" />
    <h4>Plan</h4>
    <div class="wh-bar"></div>
    <h4>Jumps</h4>
    <div class="wh-bar">
      <div
        v-for="jump in jumps"
        class="ship-bar"
        :style="`background-color: ${
          ships.filter((i) => i.name === jump.ship)[0].color
        }; width: ${getJumpMassPercent(jump)}%`"
      >
        {{ jump.ship }} ({{ jump.jumpState.join(", ") }})
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  @apply grid grid-cols-2 gap-1 m-5;
}

select {
  @apply col-span-2 self-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.controls {
  @apply self-start grid grid-cols-2 gap-4 row-span-2;
}

.mass-label {
  @apply font-semibold;
}

.wh-info {
  @apply w-full grid-cols-2;
}

.wh-bar {
  @apply w-full rounded-lg flex justify-start bg-gray-200 h-8 dark:bg-gray-700 col-span-full;
}

.ship-bar {
  @apply h-8 p-1 border-r-white border-solid border-r-2;
}
.ship-bar:first-child {
  @apply rounded-l-lg;
}

.ship-bar:last-child {
  @apply rounded-r-lg border-r-0;
}
</style>
