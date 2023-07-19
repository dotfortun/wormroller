<script setup>
const { modelValue = {} } = defineProps({
  modelValue: Object,
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    {{
      `#${[
        modelValue.r.toString(16).padStart(2, "0").toUpperCase(),
        modelValue.g.toString(16).padStart(2, "0").toUpperCase(),
        modelValue.b.toString(16).padStart(2, "0").toUpperCase(),
      ].join("")}`
    }}
    <input
      type="range"
      :min="0"
      :max="255"
      :step="1"
      :value="modelValue.r"
      @input="
        $emit('update:modelValue', {
          r: parseInt($event.target.value),
          g: modelValue.g,
          b: modelValue.b,
        })
      "
    />
    <input
      type="range"
      :min="0"
      :max="255"
      :step="1"
      :value="modelValue.g"
      @input="
        $emit('update:modelValue', {
          r: modelValue.r,
          g: parseInt($event.target.value),
          b: modelValue.b,
        })
      "
    />
    <input
      type="range"
      :min="0"
      :max="255"
      :step="1"
      :value="modelValue.b"
      @input="
        $emit('update:modelValue', {
          r: modelValue.r,
          g: modelValue.g,
          b: parseInt($event.target.value),
        })
      "
    />
  </div>
</template>

<style scoped></style>
