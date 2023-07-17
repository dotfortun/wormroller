import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

import { wormholes } from "../wormholes"

export const useSolverStore = defineStore('solver', () => {

  const states = {
    cold_cold: ["cold", "cold"],
    cold_hot: ["cold", "hot"],
    hot_hot: ["hot", "hot"],
  }

  const selectedWH = ref(wormholes[12]);

  const currMassKg = computed(() => ({
    med: (selectedWH.value.totalMass - totalJumpMass.value),
    min: ((selectedWH.value.totalMass * 0.9) - totalJumpMass.value),
    max: ((selectedWH.value.totalMass * 1.1) - totalJumpMass.value),
  }));

  const ships = ref([
    {
      name: "praxis_a",
      cold: 174_000_000,
      hot: 274_000_000,
      color: "#09c",
    }, {
      name: "mega_a",
      cold: 196_000_000,
      hot: 296_000_000,
      color: "rgb(65, 108, 79)",
    },
  ])

  const jumps = ref([
    {
      ship: "praxis",
      jumpState: ["hot", "hot"],
      mass: 274_000_000 * 2
    },
    {
      ship: "praxis",
      jumpState: ["hot", "hot"],
      mass: 274_000_000 * 2
    },
    {
      ship: "praxis",
      jumpState: ["hot", "hot"],
      mass: 274_000_000 * 2
    },
    {
      ship: "mega",
      jumpState: ["cold", "hot"],
      mass: 294_000_000 + 196_000_000
    },
  ])

  const totalJumpMass = computed(() => jumps.value.reduce((prevTotal, jump) => {
    return prevTotal + jump.mass
  }, 0));

  const solver = (whInfo, isSafe = false, jumps = []) => {
    if (isSafe) {
      for (let ship of ships.value) {
        if (currMass.min < ship.cold) {

        }
      }
      return
    }
  }

  return { currMassKg, selectedWH, ships, wormholes, jumps, solver }
})