<script setup>
import Toggle from "./components/Toggle.vue";

import { ref, watch } from "vue";
import { useSolverStore } from "./stores/solver";

const store = useSolverStore();
const { wormholes, ships, jumps, plan, solver, getJumpStyles } = store;

const displayTons = ref(true);
const rollFast = ref(true);

const displayMass = (value) => {
  return (value / (displayTons.value ? 1000 : 1)).toLocaleString();
};
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
      <button @click="() => solver(rollFast)">Solve</button>
      <Toggle label-left="kg" label-right="tons" v-model="displayTons" />
      <Toggle label-left="safe" label-right="fast" v-model="rollFast" />
    </div>
    <!-- interface to add ships w/ buttons to add jumps, and color select? -->
    <div class="col-span-full">
      <!-- {{ JSON.stringify(ships) }} -->
    </div>
    <!-- interface to select fast/safe rolling -->
    <hr class="col-span-full" />
    <h4>Plan</h4>
    <div class="wh-bar">
      <div
        v-for="jump in store.plan"
        class="ship-bar"
        :style="getJumpStyles(jump)"
      >
        {{ jump.ship }} ({{ jump.jumpState.join("/") }})
      </div>
    </div>
    <h4>Completed Jumps</h4>
    <div class="wh-bar">
      <div
        v-for="jump in store.jumps"
        class="ship-bar"
        :style="getJumpStyles(jump)"
      >
        {{ jump.ship }} ({{ jump.jumpState.join("/") }})
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  @apply grid grid-cols-2 gap-1 my-5 mx-auto w-8/12 md:max-w-full;
}

select {
  @apply col-span-1 self-start bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-xl dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.controls {
  @apply self-start grid grid-cols-2 gap-4 row-span-1 justify-around;
}

.controls button {
  @apply bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded col-span-1 place-self-center w-min;
}

.mass-label {
  @apply font-semibold;
}

.wh-info {
  @apply w-full grid-cols-2;
}

.wh-bar {
  @apply w-full rounded-lg flex flex-row bg-gray-200 h-8 dark:bg-gray-700 col-span-full;
}

.ship-bar {
  @apply h-8 p-1 self-start flex-shrink-0 flex-grow-0 text-center border-r-slate-400 border-solid border-r-2 overflow-hidden hover:overflow-visible hover:h-min hover:isolate;
}
.ship-bar:first-child {
  @apply rounded-l-lg;
}

.ship-bar:last-child {
  @apply rounded-r-lg border-r-0;
}
</style>
