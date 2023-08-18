<script setup>
import ColorPicker from "./ColorPicker.vue";
import Toggle from "./Toggle.vue";

import { useSolverStore } from "../stores/solver";

const store = useSolverStore();

const {
  useTons = false,
  ship = {},
  idx = 0,
} = defineProps({
  idx: Number,
  useTons: Boolean,
  ship: Object,
});
defineEmits([
  "change:ship",
  "change:shipIdx",
  "delete:ship",
  "copy:ship",
  "save:ship",
]);

const updateShipProperty = (key, val) => {
  let updatedShip = ship;
  if (["hot", "cold"].includes(key)) {
    updatedShip[key] = val * (useTons ? 1 : 1000);
  } else {
    updatedShip[key] = val;
  }
  return updatedShip;
};
</script>

<template>
  <div class="ship">
    <div class="handle">
      <font-awesome-icon class="max-sm:hidden" icon="arrows-up-down" />
    </div>
    <div class="ship-details">
      <input
        type="text"
        :value="ship.name"
        @change="
          $emit('change:ship', updateShipProperty('name', $event.target.value))
        "
        placeholder="Ship Name"
      />
      <label>
        <input
          type="number"
          :value="useTons ? Math.floor(ship.cold / 1000) : ship.cold"
          @change="
            $emit(
              'change:ship',
              updateShipProperty(
                'cold',
                $event.target.valueAsNumber * (useTons ? 1000 : 1)
              )
            )
          "
          placeholder="Cold Mass"
          :min="0"
        />
        {{ useTons ? "tons" : "kg" }}
      </label>
      <label>
        <input
          type="number"
          :value="useTons ? Math.floor(ship.hot / 1000) : ship.hot"
          @change="
            $emit(
              'change:ship',
              updateShipProperty(
                'hot',
                $event.target.valueAsNumber * (useTons ? 1000 : 1)
              )
            )
          "
          placeholder="Hot Mass"
          :min="0"
        />
        {{ useTons ? "tons" : "kg" }}
      </label>
    </div>
    <ColorPicker :ship-id="ship.id" :ship-idx="idx" />
    <Toggle
      label-left="roller"
      label-right="threader"
      v-model="ship.isThreader"
    />
    <div class="buttons max-lg:col-span-full">
      <button
        class="rounded-full font-regular w-1/4"
        @click="$emit('copy:ship')"
      >
        <font-awesome-icon icon="copy" />
      </button>
      <button
        class="save rounded-full font-regular w-1/4"
        @click="$emit('save:ship')"
      >
        <font-awesome-icon icon="floppy-disk" />
      </button>
      <button
        class="clear rounded-full font-regular w-1/4"
        @click="$emit('delete:ship')"
      >
        <font-awesome-icon icon="x" />
      </button>
    </div>
    <div class="buttons sm:hidden">
      <button
        class="rounded-full font-regular w-1/4 sm:hidden"
        @click="$emit('change:shipIdx', { oldIdx: idx, newIdx: idx - 1 })"
        :disabled="idx === 0"
      >
        <font-awesome-icon icon="arrow-up" />
      </button>
      <button
        class="rounded-full font-regular w-1/4 sm:hidden"
        @click="$emit('change:shipIdx', { oldIdx: idx, newIdx: idx + 1 })"
        :disabled="idx === store.ships.length - 1"
      >
        <font-awesome-icon icon="arrow-down" />
      </button>
    </div>
  </div>
</template>

<style scoped>
input {
  @apply bg-gray-700 p-0.5 pl-1.5 m-0.5 rounded-md;
}

.ship {
  @apply mx-auto my-4 h-min;
  @apply flex flex-col items-center;
  @apply sm:grid sm:gap-4 sm:justify-items-center;
  @apply sm:grid-cols-[2rem_1fr] md:grid-cols-[2rem_1fr_1fr_1fr_1fr];

  column-gap: 1rem;
  row-gap: 0;
  grid-template-rows: 1fr 0;
}

.handle {
  @apply max-sm:hidden; /* Don't show on mobile. */
  @apply h-full w-10 flex flex-col justify-center select-none;
  @apply row-span-3 md:row-span-1;
}

.ship-details {
  @apply h-full flex flex-col justify-around;
}

.ship-details input {
  @apply w-1/2;
}

.buttons {
  @apply flex flex-row justify-around w-full mt-3 gap-2;
  @apply sm:justify-around;
}
</style>
