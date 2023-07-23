<script setup>
import ColorPicker from "./ColorPicker.vue";
import Toggle from "./Toggle.vue";

const {
  useTons = false,
  ship = {},
  idx = 0,
} = defineProps({
  idx: Number,
  useTons: Boolean,
  ship: Object,
});
defineEmits(["change:ship", "delete:ship", "copy:ship"]);

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
      <font-awesome-icon icon="arrows-up-down" />
    </div>
    <div class="ship-details">
      <input
        type="text"
        :value="ship.name"
        @change="
          (ev) =>
            $emit('change:ship', updateShipProperty('name', ev.target.value))
        "
        placeholder="Ship Name"
      />
      <label>
        <input
          type="number"
          :value="useTons ? Math.floor(ship.cold / 1000) : ship.cold"
          @change="
            (ev) =>
              $emit(
                'change:ship',
                updateShipProperty(
                  'cold',
                  ev.target.valueAsNumber * (useTons ? 1000 : 1)
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
            (ev) =>
              $emit(
                'change:ship',
                updateShipProperty(
                  'hot',
                  ev.target.valueAsNumber * (useTons ? 1000 : 1)
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
    <div class="buttons">
      <Toggle
        label-left="roller"
        label-right="threader"
        v-model="ship.isThreader"
      />
    <section class="mobile-buttons flex flex-col">
      <button
        class="rounded-full font-regular w-1/4"
        @click="() => $emit('copy:ship')"
      >
        Copy
      </button>
      <button
        class="clear rounded-full font-regular w-1/4"
        @click="() => $emit('delete:ship')"
      >
        X
      </button>
    </section>
    </div>
  </div>
</template>

<style scoped>
.handle {
  @apply h-full w-4 flex flex-col justify-center select-none;
}

.ship {
  @apply mx-auto my-2 h-min grid gap-4 items-center;
  grid-template-columns: 2rem 1fr 1fr 1fr;
}

.ship-details {
  @apply h-full flex flex-col justify-around;
}

.ship-details input {
  @apply w-1/2;
}

.buttons {
  @apply flex flex-auto justify-center md:flex flex-col w-full justify-between mt-3 sm:flex flex-col;
}
</style>
