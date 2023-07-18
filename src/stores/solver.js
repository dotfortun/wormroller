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

  const planMassKg = computed(() => ({
    med: (selectedWH.value.totalMass - totalPlanMass.value),
    min: ((selectedWH.value.totalMass * 0.9) - totalPlanMass.value),
    max: ((selectedWH.value.totalMass * 1.1) - totalPlanMass.value),
  }));

  const ships = ref([
    {
      name: "praxis",
      cold: 174_000_000,
      hot: 274_000_000,
      color: "#0099cc",
    },
    // {
    //   name: "praxis 2",
    //   cold: 174_000_000,
    //   hot: 274_000_000,
    //   color: "#cc9900",
    // },
    {
      name: "mega",
      cold: 196_000_000,
      hot: 296_000_000,
      color: "rgb(65, 108, 79)",
    },
  ])

  const jumps = ref([
  ])

  const plan = ref([]);

  const totalJumpMass = computed(() => jumps.value.reduce((prevTotal, jump) => {
    return prevTotal + jump.mass
  }, 0));

  const totalPlanMass = computed(() => plan.value.reduce((prevTotal, jump) => {
    return prevTotal + jump.mass
  }, 0));

  const totalShipMass = (isHot = true) => ships.value.reduce((prevTotal, ship) => {
    return prevTotal + ship[isHot ? "hot" : "cold"]
  }, 0)

  const getJumpStyles = (jump) => {
    return {
      background: ships.value.filter((i) => i.name === jump.ship)[0].color,
      width: `${(jump.mass / (selectedWH.value.totalMass * 1.1)) * 100}%`,
    };
  };

  const solver = (fast = false) => {
    plan.value = [];
    let limit = 0;
    while (planMassKg.value.min > 0) {
      if (planMassKg.value.med > 0) {
        plan.value.push(...ships.value.map(s => ({
          ship: s.name,
          jumpState: ["hot", "hot"],
          mass: s.hot + s.hot
        })));
      }
      limit++
      if (limit > 10) {
        limit = 0;
        break;
      }
    }
    while (planMassKg.value.med > 0) {
      plan.value.push(...ships.value.map(s => ({
        ship: s.name,
        jumpState: ["cold", "hot"],
        mass: s.cold + s.hot
      })));
      limit++
      if (limit > 10) {
        limit = 0;
        break;
      }
    }
    jumps.value = plan.value;
  }

  return {
    currMassKg,
    selectedWH,
    ships,
    wormholes,
    jumps,
    plan,
    solver,
    getJumpStyles
  }
})
