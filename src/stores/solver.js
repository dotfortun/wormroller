import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue';

import { wormholes, stages } from "../wormholes"

export const useSolverStore = defineStore('solver', () => {

  const selectedWH = ref(wormholes[0]);
  const selectedStage = ref(stages[0]);

  const url = computed(() => new URL(window.location));
  if (url.value.search) {
    const params = new URLSearchParams(url.value.search);
    selectedWH.value = wormholes.find((elem) => {
      return elem.type.toLowerCase() === params.get("sig").toLowerCase()
    });
  }

  const planMassKg = computed(() => ({
    med: (selectedStage.value.mass(selectedWH.value.totalMass * 1) - totalPlanMass.value),
    min: ((selectedStage.value.mass(selectedWH.value.totalMass) * 0.9) - totalPlanMass.value),
    max: ((selectedStage.value.mass(selectedWH.value.totalMass) * 1.1) - totalPlanMass.value),
  }));

  const ships = ref([]);
  const plan = ref([]);

  const totalPlanMass = computed(() => plan.value.reduce((prevTotal, jump) => {
    return prevTotal + jump.mass
  }, 0));

  function getJumpStyles(jump) {
    const ship = ships.value.filter((i) => i.id === jump.shipId)[0];

    return {
      background: ship ? `hsl(${ship.color.h}, ${ship.color.s}%, ${ship.color.l}%)` : `hsl(180, 50%, 50%)`,
      color: ship ? `hsl(0, 0%, ${Math.abs((99 - ship.color.l) % 100)}%)` : `hsl(180, 50%, 50%)`,
      width: `${(jump.mass / (selectedStage.value.mass(selectedWH.value.totalMass) * 1.1)) * 100}%`,
    };
  }

  function solver(fast = false) {
    plan.value.splice(0, plan.value.length);
    if (ships.value.length === 0) {
      return
    }
    let limit = 0;
    while (planMassKg.value.min > 0) {
      for (let s of ships.value.filter(s => !s.isThreader)) {
        if (s.cold < selectedWH.value.jumpMass) {
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
      }

      limit++;
      if (limit > 10) {
        limit = 0;
        break;
      }
    }
    limit = 0;
    while (planMassKg.value.max > 0) {
      for (let s of ships.value.filter(s => s.isThreader)) {
        if (s.hot < selectedWH.value.jumpMass) {
          if (planMassKg.value.max > s.cold) {
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
      }

      limit++;
      if (limit > 10) {
        limit = 0;
        break;
      }
    }
  }

  const resetApp = () => {
    plan.value.splice(0, plan.value.length);
  }

  return {
    planMassKg,
    selectedWH,
    selectedStage,
    ships,
    wormholes,
    stages,
    plan,
    solver,
    resetApp,
    getJumpStyles
  }
})
