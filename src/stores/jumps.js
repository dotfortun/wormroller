import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

/*
  GUI
    - Way to add ships (each has a name, a hot mass, a cold mass.)
    - Way to select a wormhole (https://wiki.eveuniversity.org/Wormhole_attributes)
 */

export const jumpsStore = defineStore('jumps', () => {
  const jumps = ref([
    {
      ships: "praxis_a",
      isHot: true,
    },
    {
      ships: "praxis_a",
      isHot: false,
    },
  ])

  return { jumps }
})