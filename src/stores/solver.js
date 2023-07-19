import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

import { wormholes } from "../wormholes"

export const useSolverStore = defineStore('solver', () => {

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

  function getJumpStyles(jump) {
    const ship = ships.value.filter((i) => i.id === jump.shipId)[0];
    return {
      background: ship ? `rgb(${Object.values(ship.color).join(',')})` : `rgb(125, 125, 125)`,
      width: `${(jump.mass / (selectedWH.value.totalMass * 1.1)) * 100}%`,
    };
  }

  function solver(fast = false) {
    plan.value = [];
    let limit = 0;
    while (planMassKg.value.min > 0) {
      for (let s of ships.value) {
        if (planMassKg.value.med > (s.hot + s.hot)) {
          plan.value.push(
            {
              ship: s.name,
              shipId: s.id,
              jumpState: "hot",
              mass: s.hot
            },
            {
              ship: s.name,
              shipId: s.id,
              jumpState: "hot",
              mass: s.hot
            }
          );
        } else if (planMassKg.value.med > s.cold) {
          plan.value.push(
            {
              ship: s.name,
              shipId: s.id,
              jumpState: "cold",
              mass: s.cold
            },
            {
              ship: s.name,
              shipId: s.id,
              jumpState: "hot",
              mass: s.hot
            }
          );
        }
      }
      limit++;
      if (limit > 10) {
        limit = 0;
        break;
      }
    }
    jumps.value = plan.value;
  }

  const clear = () => {
    jumps.value = [];
    plan.value = [];
  }

  return {
    currMassKg,
    selectedWH,
    ships,
    wormholes,
    jumps,
    plan,
    solver,
    clear,
    getJumpStyles
  }
})
