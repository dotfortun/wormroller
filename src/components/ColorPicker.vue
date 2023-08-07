<script setup>
import { ref, watch } from "vue";
import { useSolverStore } from "../stores/solver";

const store = useSolverStore();

const { shipIdx = 0, shipId = 0 } = defineProps({
  shipId: Number,
  shipIdx: Number,
});

const colors = ref(store.ships[shipIdx].color);
</script>

<template>
  <div class="color-picker">
    <div
      class="color-square w-full aspect-square m-auto rounded-md"
      :style="{
        background: `hsl(${colors.h}, ${colors.s}%, ${colors.l}%)`,
      }"
    ></div>
    <div class="sliders">
      <label>
        <input
          class="hue"
          type="range"
          :min="0"
          :max="360"
          :step="1"
          v-model="store.ships[shipIdx].color.h"
          :style="{
            accentColor: `hsl(${colors.h}, 100%, 50%)`,
          }"
          @change="store.ships[shipIdx].color.h = $event.target.valueAsNumber"
        />
        hue
      </label>
      <label>
        <input
          type="range"
          :min="0"
          :max="100"
          :step="1"
          v-model="store.ships[shipIdx].color.s"
          :style="{
            accentColor: `hsl(${colors.h}, ${colors.s}%, 50%)`,
          }"
        />
        sat
      </label>
      <label>
        <input
          type="range"
          :min="0"
          :max="100"
          :step="1"
          v-model="store.ships[shipIdx].color.l"
          :style="{
            accentColor: `hsl(0, 0%, ${colors.l}%)`,
          }"
        />
        lum
      </label>
    </div>
  </div>
</template>

<style scoped>
div.color-picker {
  /* @apply flex flex-col gap-2 justify-center; */
  @apply grid grid-cols-3 gap-2;
}

div.sliders {
  @apply max-sm:flex max-sm:flex-col gap-4 my-4;
  @apply col-span-2;
}

input {
  @apply w-1/2;
}
</style>
