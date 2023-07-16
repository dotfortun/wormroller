import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

/*
  GUI
    - Way to add ships (each has a name, a hot mass, a cold mass.)
    - Way to select a wormhole (https://wiki.eveuniversity.org/Wormhole_attributes)
 */

export const solverStore = defineStore('solver', () => {
  const currMassKg = ref(0);
  const ships = ref({
    praxis_a: {
      cold: 174_000_000,
      hot: 174_000_000,
      color: "#ffffff",
    },
  })

  const solver = (currentMass, medMassKg, origMassKg) => {
    // This needs to solve the mass problem.
  }

  return { currMassKg, ships, solver }
})