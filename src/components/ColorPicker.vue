<script setup>
const { color = { r: 0, g: 0, b: 0 } } = defineProps({
  color: Object,
});
defineEmits(["change:color"]);
</script>

<template>
  <div>
    {{ `rgb(${Object.values(color).join(", ")})` }}
    <label>
      <input
        type="range"
        :min="0"
        :max="255"
        :step="1"
        :value="color.r"
        @change="
          $emit('change:color', {
            r: $event.target.valueAsNumber,
            g: color.g,
            b: color.b,
          })
        "
      />
      red
    </label>
    <label>
      <input
        type="range"
        :min="0"
        :max="255"
        :step="1"
        :value="color.g"
        @change="
          $emit('change:color', {
            r: color.r,
            g: $event.target.valueAsNumber,
            b: color.b,
          })
        "
      />
      green
    </label>
    <label>
      <input
        type="range"
        :min="0"
        :max="255"
        :step="1"
        :value="color.b"
        @change="
          $emit('change:color', {
            r: color.r,
            g: color.g,
            b: $event.target.valueAsNumber,
          })
        "
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
