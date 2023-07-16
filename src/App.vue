<script setup>
import { ref } from "vue";
import { wormholeStore } from "./stores/wormholes";
import { solverStore } from "./stores/solver";

const { wormholes } = wormholeStore();
const { currMassKg, ships, solver, addShip, removeShip } = solverStore();

const selectedWH = ref(wormholes[0]);
</script>

<template>
  <main>
    <h3>{{ selectedWH.type }}</h3>
    <select v-model="selectedWH">
      <option v-for="wh in wormholes" :key="wh.type" :value="wh">
        {{ wh.type }}
      </option>
    </select>
    <!-- interface to add ships w/ buttons to add jumps -->
    <!-- interface to select fast/safe rolling -->
    <h4>Plan</h4>
    <div class="wh-bar">
      <template v-for="ship in ships">
        <div
          class="ship-bar"
          :style="`background-color: ${ship.color}; width: ${
            (ship.cold / selectedWH.totalMass) * 100
          }%`"
        ></div>
      </template>
    </div>
    <h4>Jumps</h4>
    <div class="wh-bar">
      <template v-for="ship in ships">
        <div
          class="ship-bar"
          :style="`background-color: ${ship.color}; width: ${
            (ship.cold / selectedWH.totalMass) * 100
          }%`"
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
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.wh-bar {
  @apply w-full bg-gray-200 h-2.5 dark:bg-gray-700 col-span-full;
}

.ship-bar {
  @apply h-2.5;
}
</style>
