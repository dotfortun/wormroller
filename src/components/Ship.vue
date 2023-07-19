<script setup>
import { ref } from "vue";
import ColorPicker from "./ColorPicker.vue";

const {
  useTons = false,
  idx = 0,
  ship = {},
} = defineProps({
  useTons: Boolean,
  id: Number,
  ship: Object,
});
defineEmits(["change:ship"]);

const color = ref({
  r: 0,
  g: 0,
  b: 0,
});

const updateShipProperty = (key, val) => {
  let updatedShip = ship;
  updatedShip[key] = val;
  return updatedShip;
};
</script>

<template>
  <div class="ship">
    <div>
      <input
        type="text"
        :value="ship.name"
        @change="
          (ev) =>
            $emit('change:ship', updateShipProperty('name', ev.target.value))
        "
        placeholder="Ship Name"
      />
      <input
        type="number"
        :value="ship.cold"
        @change="
          (ev) =>
            $emit(
              'change:ship',
              updateShipProperty('cold', ev.target.valueAsNumber)
            )
        "
        placeholder="Cold Mass"
        :min="0"
      />
      <input
        type="number"
        :value="ship.hot"
        @change="
          (ev) =>
            $emit(
              'change:ship',
              updateShipProperty('hot', ev.target.valueAsNumber)
            )
        "
        placeholder="Hot Mass"
        :min="0"
      />
    </div>
    <ColorPicker v-model="color" />
  </div>
</template>

<style scoped>
.ship {
  @apply mx-auto my-2 h-min grid grid-cols-2;
}
</style>
