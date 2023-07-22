<script setup>
import { ref, watch } from "vue";
import { useSolverStore } from "../stores/solver";
import { faPersonWalkingWithCane } from "@fortawesome/free-solid-svg-icons";

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
      class="w-full aspect-square m-auto rounded-md"
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
  @apply grid grid-cols-3 gap-2;
}

div.sliders {
  @apply col-span-2;
}

/* :root {
  --rainbow: var(
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 1) 0%,
      rgba(255, 154, 0, 1) 10%,
      rgba(208, 222, 33, 1) 20%,
      rgba(79, 220, 74, 1) 30%,
      rgba(63, 218, 216, 1) 40%,
      rgba(47, 201, 226, 1) 50%,
      rgba(28, 127, 238, 1) 60%,
      rgba(95, 21, 242, 1) 70%,
      rgba(186, 12, 248, 1) 80%,
      rgba(251, 7, 217, 1) 90%,
      rgba(255, 0, 0, 1) 100%
    )
  );
} */

input {
  @apply w-1/2;
}
</style>
