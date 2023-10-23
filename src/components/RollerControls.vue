<script setup>
import { ref, computed } from "vue";

import { useSolverStore } from "../stores/solver";
import { useShipStore } from "../stores/ship";

import Toggle from "./Toggle.vue";

const { modelValue, useTons } = defineProps(["modelValue", "useTons"]);
defineEmits(["update:modelValue"]);

const shipStore = useShipStore();
const solverStore = useSolverStore();

const tempShip = ref(JSON.parse(JSON.stringify(shipStore.selectedShip)));
const idx = computed(() => {
  return shipStore.savedShips.findIndex((item) => {
    return item.name === shipStore.selectedShip.name;
  });
});
</script>

<template>
  <template v-if="modelValue">
    <span>
      <button class="w-max" @click="$emit('update:modelValue', false)">
        Edit Ship
      </button>
      <button
        class="w-max"
        @click="
          shipStore.addShip(solverStore.ships);
          solverStore.solver(rollFast);
        "
      >
        Add Ship
      </button>
      <button
        class="clear w-max"
        @click="
          solverStore.plan.length = 0;
          solverStore.ships.length = 0;
        "
      >
        Clear Ships
      </button>
    </span>
  </template>
  <template v-else>
    <button
      class="save w-max"
      @click="
        shipStore.savedShips.splice(idx, 1, tempShip);
        $emit('update:modelValue', true);
      "
    >
      Save Ship
    </button>
    <button class="clear w-max" @click="$emit('update:modelValue', true)">
      Cancel
    </button>
    <div class="w-full flex flex-col mt-4 gap-2 items-center">
      <label>
        <input
          type="text"
          :value="shipStore.selectedShip.name"
          @change="
            tempShip = shipStore.updateShipProperty(
              'name',
              $event.target.value,
              shipStore.selectedShip,
              useTons
            )
          "
          placeholder="Ship Name"
        />
      </label>
      <label>
        <input
          type="number"
          :value="
            useTons
              ? Math.floor(shipStore.selectedShip.cold / 1000)
              : shipStore.selectedShip.cold
          "
          @change="
            tempShip = shipStore.updateShipProperty(
              'cold',
              $event.target.valueAsNumber * (useTons ? 1000 : 1),
              shipStore.selectedShip,
              useTons
            )
          "
          placeholder="Cold Mass"
          :min="0"
        />
        {{ useTons ? "tons" : "kg" }}
      </label>
      <label>
        <input
          type="number"
          :value="
            useTons
              ? Math.floor(shipStore.selectedShip.hot / 1000)
              : shipStore.selectedShip.hot
          "
          @change="
            tempShip = shipStore.updateShipProperty(
              'hot',
              $event.target.valueAsNumber * (useTons ? 1000 : 1),
              shipStore.selectedShip,
              useTons
            )
          "
          placeholder="Hot Mass"
          :min="0"
        />
        {{ useTons ? "tons" : "kg" }}
      </label>
      <Toggle
        label-left="roller"
        label-right="threader"
        v-model="tempShip.isThreader"
      />
    </div>
  </template>
</template>
