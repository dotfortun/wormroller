<script setup>
import { getCurrentInstance, computed } from "vue";
const { modelValue = {}, options = [] } = defineProps({
  modelValue: Object,
  options: Array,
});
defineEmits(["update:modelValue"]);

const uid = computed(() => getCurrentInstance().uid);
</script>

<template>
  <div
    class="grid"
    :style="{
      gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
    }"
  >
    <input
      type="range"
      class="col-span-full"
      :min="0"
      :max="options.length - 1"
      :value="options.map((i) => i.name).indexOf(modelValue.name)"
      @change="$emit('update:modelValue', options[$event.target.valueAsNumber])"
    />
    <template v-for="opt in options">
      <label
        :for="`${uid}-${opt.name}`"
        :class="opt.name === modelValue.name ? 'item-selected' : ''"
      >
        {{ opt.name }}
      </label>
      <input
        type="radio"
        :id="`${uid}-${opt.name}`"
        :name="opt.name"
        :checked="opt.name === modelValue.name"
        @change="
          $emit(
            'update:modelValue',
            options.filter((i) => i.name === $event.target.name).pop()
          )
        "
      />
    </template>
  </div>
</template>

<style scoped>
label {
  @apply pr-4 -mr-8 w-fit h-fit select-none;
  transform-origin: 100% 10%;
  transform: rotate(-45deg);
}

.item-selected {
  @apply font-extrabold;
}

input[type="radio"] {
  @apply sr-only;
}
</style>
