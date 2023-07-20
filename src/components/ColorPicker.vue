<script setup>
import { ref } from "vue";
import { useSolverStore } from "../stores/solver";

const store = useSolverStore();

const { shipId = 0, shipIdx = 0 } = defineProps({
  shipId: Number,
  shipIdx: Number,
});
// defineEmits(["change:color"]);

const colors = ref(store.ships[shipIdx].color);
</script>

<template>
  <div>
    {{ `rgb(${Object.values(store.ships[shipIdx].color).join(", ")})` }}
    <label>
      <input
        type="range"
        :min="0"
        :max="255"
        :step="1"
        :value="colors.r"
        @change="store.ships[shipIdx].color.r = $event.target.valueAsNumber"
      />
      red
    </label>
    <label>
      <input
        type="range"
        :min="0"
        :max="255"
        :step="1"
        :value="colors.g"
        @change="store.ships[shipIdx].color.g = $event.target.valueAsNumber"
      />
      green
    </label>
    <label>
      <input
        type="range"
        :min="0"
        :max="255"
        :step="1"
        :value="colors.b"
        @change="store.ships[shipIdx].color.b = $event.target.valueAsNumber"
      />
      blue
    </label>
  </div>
</template>

<style scoped>
input {
  @apply w-3/4;
}
</style>
