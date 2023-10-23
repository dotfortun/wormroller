import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useShipStore = defineStore("ships", () => {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const savedShips = ref([
    {
      name: "174/274 Praxis",
      cold: 174_000_000,
      hot: 274_000_000,
      isThreader: false,
    }, {
      name: "196/296 Megathron",
      cold: 196_000_000,
      hot: 296_000_000,
      isThreader: false,
    },
  ]);
  const selectedShip = ref(savedShips.value[0]);

  const addShip = (shipsList) => {
    shipsList.push({
      ...selectedShip.value,
      id: randomInt(0, 100_000_000),
      color: {
        h: randomInt(0, 360),
        s: randomInt(42, 98),
        l: randomInt(40, 90),
      },
    });
  }

  const saveShip = (ship) => {
    savedShips.value.push({
      name: ship.name,
      cold: ship.cold,
      hot: ship.hot,
      isThreader: ship.isThreader
    })
  }

  const updateShipProperty = (key, val, ship, useTons) => {
    let updatedShip = ship;
    if (["hot", "cold"].includes(key)) {
      updatedShip[key] = val * (useTons ? 1 : 1000);
    } else {
      updatedShip[key] = val;
    }
    return updatedShip;
  };

  return {
    savedShips,
    selectedShip,
    addShip,
    saveShip,
    updateShipProperty
  }
}, {
  persist: true
})