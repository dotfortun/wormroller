<script setup>
import { ref, computed } from "vue";
import { useSolverStore } from "../stores/solver";
import { useShipStore } from "../stores/ship";

const { modelValue, useTons } = defineProps(["modelValue", "useTons"]);
defineEmits(["update:modelValue", "update:ship"]);

const shipStore = useShipStore();
const solverStore = useSolverStore();

const tempShip = ref(structuredClone(shipStore.selectedShip.value));
const idx = computed(() => {
  return shipStore.savedShips.findIndex((item) => {
    return item.name === shipStore.selectedShip.name;
  });
});
</script>

<template>
  <template v-if="modelValue">
    <span
      ><button
        class="w-max"
        @click="
          shipStore.addShip(solverStore.ships);
          solverStore.solver(rollFast);
        "
      >
        Add Ship
      </button>
      <button class="w-max" @click="$emit('update:modelValue', false)">
        Edit Ship
      </button>
      <button
        class="clear w-max"
        @click="
          solverStore.plan.length = 0;
          solverStore.ships.length = 0;
        "
      >
        Clear Ships
      </button></span
    >
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
            tempShip = updateShipProperty(
              'name',
              $event.target.value,
              shipStore.selectedShip
            )
          "
          placeholder="Ship Name"
      /></label>
      <label>
        <input
          type="number"
          :value="
            useTons
              ? Math.floor(shipStore.selectedShip.cold / 1000)
              : shipStore.selectedShip.cold
          "
          @change="
            tempShip = updateShipProperty(
              'cold',
              $event.target.valueAsNumber * (useTons ? 1000 : 1),
              ship
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
            tempShip = updateShipProperty(
              'hot',
              $event.target.valueAsNumber * (useTons ? 1000 : 1),
              shipStore.selectedShip
            )
          "
          placeholder="Hot Mass"
          :min="0"
        />
        {{ useTons ? "tons" : "kg" }}
      </label>
    </div>
  </template>
</template>
