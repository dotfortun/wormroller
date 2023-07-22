<script setup>
import { getCurrentInstance, computed } from "vue";

const { modelValue, labelLeft, labelRight } = defineProps({
  modelValue: Boolean,
  labelLeft: String,
  labelRight: String,
});
defineEmits(["update:modelValue", "change:modelValue"]);

const uid = computed(() => getCurrentInstance().uid);
</script>

<template>
  <div class="flex items-center justify-center h-min w-max">
    <label :for="uid" class="flex items-center cursor-pointer">
      <div class="mr-3 font-medium">{{ labelLeft }}</div>
      <div class="relative">
        <input
          type="checkbox"
          class="sr-only"
          :id="uid"
          :checked="modelValue"
          @input="$emit('update:modelValue', $event.target.checked)"
        />
        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
        <div
          class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
        ></div>
      </div>
      <div class="ml-3 font-medium">{{ labelRight }}</div>
    </label>
  </div>
</template>

<style scoped>
/* Toggle A */
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #48bb78;
}

/* Toggle B */
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #48bb78;
}

label {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
