<script setup>
import { ref, watch, computed } from "vue";
import { useInterval } from "@vueuse/core";

const { counter, reset, pause, resume } = useInterval(500, { controls: true });
const timer = ref();
const percentage = computed(() => Math.floor(counter / 100))

// watch(counter, () => {
//   timer.value.style["--value"] = Math.floor(counter / 300);
// })
</script>

<template>
  <h1>Welp.</h1>
  <div class="timer-container">
    <div ref="timer" class="radial-progress bg-primary text-primary-content border-4 border-primary" role="progressbar">
      {{ Math.floor(counter / 2) }}
    </div>
  </div>
</template>

<style scoped>
.timer-container {
  @apply aspect-square;
}

.timer {
  --value: v-bind(percentage);
}
</style>
