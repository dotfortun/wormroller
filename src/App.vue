<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";

import { useSolverStore } from "./stores/solver";
import { useShipStore } from "./stores/ship";

import Toggle from "./components/Toggle.vue";
import RadioGroup from "./components/RadioGroup.vue";
import RollerControls from "./components/RollerControls.vue";
import Ship from "./components/Ship.vue";

const solverStore = useSolverStore();
const { wormholes, stages, solver, getJumpStyles } = solverStore;
const shipStore = useShipStore();

const displayTons = ref(true);
const rollFast = ref(true);
const useText = ref(true);

const showRollerControls = ref(true);

const displayMass = (value) => {
  return (value / (displayTons.value ? 1000 : 1)).toLocaleString();
};

const swapShips = (ev) => {
  if (ev.newIdx >= 0 && ev.newIdx < solverStore.ships.length) {
    let a = solverStore.ships[Math.min(ev.oldIdx, ev.newIdx)];
    let b = solverStore.ships[Math.max(ev.oldIdx, ev.newIdx)];
    solverStore.ships.splice(Math.min(ev.oldIdx, ev.newIdx), 2, b, a);
  }
};

const copyShip = (ship) => {
  let newShip = JSON.parse(JSON.stringify(ship));
  newShip.id = Math.floor(Math.random() * 1000000);
  return newShip;
};

watch(
  [
    solverStore.ships,
    () => solverStore.selectedStage.name,
    () => solverStore.selectedWH.type,
  ],
  () => {
    solver(rollFast);
  }
);
</script>

<template>
  <main class="container">
    <div class="wh-info">
      <select v-model="solverStore.selectedWH" @change="solver(rollFast)">
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
          {{ displayMass(solverStore.selectedWH.totalMass * 0.9) }} —
          {{ displayMass(solverStore.selectedWH.totalMass * 1.1) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Jump Mass:</span>{{ " " }}
        <span>
          {{ displayMass(solverStore.selectedWH.jumpMass) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
      <div class="col-span-all row-span-1">
        <span class="mass-label">Remaining:</span>{{ " " }}
        <span>
          {{ displayMass(solverStore.planMassKg.min) }} —
          {{ displayMass(solverStore.planMassKg.max) }}
          {{ displayTons ? "tons" : "kg" }}
        </span>
      </div>
      <div
        class="col-span-full flex flex-wrap justify-around mt-4 content-center gap-3"
      >
        <select
          class="text-sm mb-0"
          v-model="shipStore.selectedShip"
          @change="solver(rollFast)"
        >
          <option
            v-for="ship in shipStore.savedShips"
            :key="ship.name"
            :value="ship"
          >
            {{ ship.name }}
          </option>
        </select>
        <RollerControls :use-tons="displayTons" v-model="showRollerControls" />
      </div>
    </div>
    <div>
      <div class="controls">
        <Toggle label-left="kg" label-right="tons" v-model="displayTons" />
        <Toggle label-left="icons" label-right="text" v-model="useText" />
        <div class="col-span-full h-24 w-full pr-8">
          <RadioGroup
            v-model:model-value="solverStore.selectedStage"
            :options="stages"
          />
        </div>
      </div>
    </div>
    <hr class="col-span-full my-4" />
    <h3>Plan</h3>
    <div
      :class="`wh-bar h-12 ${solverStore.selectedStage.name.replace(
        /\s/,
        '_'
      )}`"
    >
      <div
        v-for="jump in solverStore.plan"
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
    <hr v-if="solverStore.ships.length" class="col-span-full my-4" />
    <div class="ships-list">
      <h3 v-if="solverStore.ships.length">Ships</h3>
      <draggable
        v-model="solverStore.ships"
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
            @change:ship="solverStore.ships.splice(idx, 1, $event)"
            @change:ship-idx="swapShips($event)"
            @delete:ship="solverStore.ships.splice(idx, 1)"
            @copy:ship="solverStore.ships.push(copyShip(ship))"
          />
        </template>
      </draggable>
    </div>
  </main>
  <footer class="container">
    <div>
      <p>
        Created by
        <a href="https://github.com/dotfortun" target="_blank">dotfortun</a> and
        <a href="https://github.com/israeldail" target="_blank">israeldail</a>.
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
</style>
