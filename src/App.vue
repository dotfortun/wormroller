<script setup>
import { ref, watch } from "vue";
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

watch(store.ships, () => {
  solver(rollFast);
});

const massStatus = ref(stages[0]);
</script>

<template>
  <div class="w-full h-92">
    <RadioGroup v-model:model-value="massStatus" :options="stages" />
  </div>
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
            @change:ship-idx="swapShips($event)"
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

<style scoped></style>
