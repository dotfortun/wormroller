<script setup>
import ColorPicker from "./ColorPicker.vue";

const { useTons = false, ship = {} } = defineProps({
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
    <ColorPicker
      :color="ship.color"
      @change:color="
        (color) => {
          'change:ship', $emit(updateShipProperty('color', color));
        }
      "
    />
    <div>
      <button
        class="rounded-full font-regular"
        @click="() => $emit('copy:ship')"
      >
        Copy
      </button>
      <button
        class="clear rounded-full font-regular"
        @click="() => $emit('delete:ship')"
      >
        X
      </button>
    </div>
  </div>
</template>

<style scoped>
.ship {
  @apply mx-auto my-2 h-min grid grid-cols-3 gap-4 items-center;
}

.ship-details {
  @apply h-full flex flex-col justify-around;
}

.ship-details input {
  @apply w-1/2;
}
</style>
