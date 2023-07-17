<script setup>
import Toggle from "./components/Toggle.vue";

import { ref, watch } from "vue";
import { wormholeStore } from "./stores/wormholes";
import { solverStore } from "./stores/solver";

const { wormholes } = wormholeStore();
const { currMassKg, ships, jumps, allJumpsMass, solver } = solverStore();

const selectedWH = ref(wormholes[12]);
const displayTons = ref(true);
const rollSafe = ref(true);

const displayMass = (value) => {
  return (value / (displayTons.value ? 1000 : 1)).toLocaleString();
};

const getJumpMassPercent = (ships, jump) => {
  const shipMass = jump.isHot ? ships[jump.ship].hot : ships[jump.ship].cold;
  return (shipMass / selectedWH.value.totalMass) * 100;
};
</script>

<template>
  <main>
    <div class="wh-info">
      <h2 class="col-span-full">{{ selectedWH.type }}</h2>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Total Mass:</span>{{ " " }}
        <span>
          {{ displayMass(selectedWH.totalMass) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Jump Mass:</span>{{ " " }}
        <span>
          {{ displayMass(selectedWH.jumpMass) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Remaining Mass:</span>{{ " " }}
        <span>
          {{ displayMass(selectedWH.totalMass * 0.9 - allJumpsMass) }} -
          {{ displayMass(selectedWH.totalMass * 1.1 - allJumpsMass) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
    </div>
    <div class="controls">
      <select v-model="selectedWH">
        <option v-for="wh in wormholes" :key="wh.type" :value="wh">
          {{ wh.type }}
        </option>
      </select>
      <Toggle label-left="kg" label-right="tons" v-model="displayTons" />
      <Toggle label-left="fast" label-right="safe" v-model="rollSafe" />
    </div>
    <!-- interface to add ships w/ buttons to add jumps, and color select? -->
    <div class="col-span-full">
      <!-- {{ JSON.stringify(ships) }} -->
    </div>
    <!-- interface to select fast/safe rolling -->
    <hr class="col-span-full" />
    <h4>Plan</h4>
    <div class="wh-bar">
      <template v-for="jump in jumps">
        <div
          class="ship-bar"
          :style="`background-color: ${
            ships[jump.ship].color
          }; width: ${getJumpMassPercent(ships, jump)}%`"
        ></div>
      </template>
    </div>
    <h4>Jumps</h4>
    <div class="wh-bar">
      <template v-for="ship in ships">
        <div
          class="ship-bar"
          :style="`background-color: ${ship.color}; width: calc(${
            (ship.cold / selectedWH.totalMass) * 100
          }% - 2px)`"
        ></div>
      </template>
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
  @apply w-full flex justify-start bg-gray-200 h-2.5 dark:bg-gray-700 col-span-full;
}

.ship-bar {
  @apply h-2.5 border-r-white border-solid border-r-2;
}
</style>
