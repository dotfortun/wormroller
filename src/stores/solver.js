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

  const getTextColor = (h, s, l) => {
    const hslToRgb = (h, s, l) => {
      s /= 100;
      l /= 100;
      const k = n => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [255 * f(0), 255 * f(8), 255 * f(4)];
    };

    const [r, g, b] = hslToRgb(h, s, l);
    console.log({
      hsl: [h, s, l],
      rgb: [r, g, b]
    })

    if ((r * 0.299 + g * 0.587 + b * 0.114) > 186) {
      return "#000000"
    }
    return "#ffffff"
  }

  function getJumpStyles(jump) {
    const ship = ships.value.filter((i) => i.id === jump.shipId)[0];

    return {
      background: ship ? `hsl(${ship.color.h}, ${ship.color.s}%, ${ship.color.l}%)` : `hsl(180, 50%, 50%)`,
      color: getTextColor(ship.color.h, ship.color.s, ship.color.l),
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
