<script setup>
/**
 * This one looks cool, but would be a pain to implement:
 * https://codepen.io/trevanhetzel/pen/rOVrGK
 */
import { getCurrentInstance, computed } from "vue";
const { modelValue = {}, options = [] } = defineProps({
  modelValue: Object,
  options: Array,
});
defineEmits(["update:model-value", "update:modelValue"]);

const uid = computed(() => getCurrentInstance().uid);
</script>

<template>
  <div
    class="radio-group"
    :style="{
      gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
    }"
  >
    <input
      type="range"
      class="slide-selector"
      :min="0"
      :max="options.length - 1"
      :value="options.map((i) => i.name).indexOf(modelValue.name)"
      @change="$emit('update:modelValue', options[$event.target.valueAsNumber])"
      :style="{
        width: `calc(${options.length - 1}/${options.length} * 100%)`,
      }"
    />
    <template v-for="opt in options">
      <label
        :for="`${uid}-${opt.name}`"
        :class="opt.name === modelValue.name ? 'item-selected' : ''"
      >
        {{ opt.name }}
      </label>
    </template>
  </div>
  <div class="sr-only">
    <input
      v-for="opt in options"
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
  </div>
</template>

<style scoped>
div.radio-group {
  @apply grid justify-items-center;
}

input.slide-selector {
  @apply col-span-full;
}

label {
  @apply -mr-8 w-fit h-fit select-none;
  transform-origin: 0% 150%;
  transform: rotate(45deg);
}

.item-selected {
  @apply font-extrabold;
}

input[type="radio"] {
  @apply sr-only;
}
</style>
