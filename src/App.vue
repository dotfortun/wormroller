<script setup>
import Toggle from "./components/Toggle.vue";
import ColorPicker from "./components/ColorPicker.vue";

import { ref, watch } from "vue";
import { useSolverStore } from "./stores/solver";

const store = useSolverStore();
const { wormholes, ships, jumps, plan, solver, clear, getJumpStyles } = store;

const displayTons = ref(true);
const rollFast = ref(true);

const displayMass = (value) => {
  return (value / (displayTons.value ? 1000 : 1)).toLocaleString();
};

const color = ref({
  r: 0,
  g: 0,
  b: 0,
});
</script>

<template>
  <main>
    <ColorPicker v-model="color" />
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
      <div class="buttons">
        <button @click="() => solver(rollFast)">Solve</button>
        <button class="clear" @click="() => clear()">Clear</button>
      </div>
      <Toggle label-left="kg" label-right="tons" v-model="displayTons" />
      <Toggle label-left="safe" label-right="fast" v-model="rollFast" />
    </div>
    <!-- interface to add ships w/ buttons to add jumps, and color select? -->
    <div class="col-span-full">
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
        {{ jump.ship }} ({{ jump.jumpState.join("/") }})
      </div>
    </div>
    <!-- <h3>Completed Jumps</h3>
    <div class="wh-bar h-10">
      <div
        v-for="jump in store.jumps"
        class="ship-bar"
        :style="getJumpStyles(jump)"
      >
        {{ jump.ship }} ({{ jump.jumpState.join("/") }})
      </div>
    </div> -->
    <!-- <div class="wh-bar h-2"></div> -->
  </main>
</template>

<style scoped>
select {
  @apply col-span-1;
}

.controls {
  @apply self-start grid grid-cols-2 gap-4 row-span-1 justify-around;
}

.buttons {
  @apply flex-1 flex-row w-full;
}

.buttons button {
  @apply mx-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 hover:border-blue-500 rounded col-span-1 place-self-center w-min;
}

.buttons button.clear {
  @apply bg-red-700 hover:bg-red-500 border-red-800 hover:border-red-600;
}

.mass-label {
  @apply font-semibold;
}

.wh-info {
  @apply w-full grid-cols-2;
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
</style>
