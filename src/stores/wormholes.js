import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

export const wormholeStore = defineStore('wormholes', () => {
  const wormholes = ref([
    {
      "type": "A009",
      "totalMass": 500000000,
      "jumpMass": 5000000
    },
    {
      "type": "A239",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "A641",
      "totalMass": 2000000000,
      "jumpMass": 1000000000
    },
    {
      "type": "A982",
      "totalMass": 3000000000,
      "jumpMass": 375000000
    },
    {
      "type": "B041",
      "totalMass": 5000000000,
      "jumpMass": 375000000
    },
    {
      "type": "B274",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "B449",
      "totalMass": 2000000000,
      "jumpMass": 1000000000
    },
    {
      "type": "B520",
      "totalMass": 5000000000,
      "jumpMass": 375000000
    },
    {
      "type": "B735",
      "totalMass": 750000000,
      "jumpMass": 375000000
    },
    {
      "type": "C008",
      "totalMass": 1000000000,
      "jumpMass": 5000000
    },
    {
      "type": "C125",
      "totalMass": 1000000000,
      "jumpMass": 62000000
    },
    {
      "type": "C140",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "C247",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "C248",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "C391",
      "totalMass": 5000000000,
      "jumpMass": 2000000000
    },
    {
      "type": "C414",
      "totalMass": 750000000,
      "jumpMass": 375000000
    },
    {
      "type": "D364",
      "totalMass": 1000000000,
      "jumpMass": 375000000
    },
    {
      "type": "D382",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "D792",
      "totalMass": 3000000000,
      "jumpMass": 1000000000
    },
    {
      "type": "D845",
      "totalMass": 5000000000,
      "jumpMass": 375000000
    },
    {
      "type": "E004",
      "totalMass": 1000000000,
      "jumpMass": 5000000
    },
    {
      "type": "E175",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "E545",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "E587",
      "totalMass": 3000000000,
      "jumpMass": 1000000000
    },
    {
      "type": "F135",
      "totalMass": 750000000,
      "jumpMass": 375000000
    },
    {
      "type": "F353",
      "totalMass": 100000000,
      "jumpMass": 62000000
    },
    {
      "type": "F355",
      "totalMass": 100000000,
      "jumpMass": 62000000
    },
    {
      "type": "G008",
      "totalMass": 1000000000,
      "jumpMass": 5000000
    },
    {
      "type": "G024",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "H121",
      "totalMass": 500000000,
      "jumpMass": 62000000
    },
    {
      "type": "H296",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "H900",
      "totalMass": 3000000000,
      "jumpMass": 375000000
    },
    {
      "type": "I182",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "J244",
      "totalMass": 1000000000,
      "jumpMass": 62000000
    },
    {
      "type": "K329",
      "totalMass": 5000000000,
      "jumpMass": 2000000000
    },
    {
      "type": "K346",
      "totalMass": 3000000000,
      "jumpMass": 375000000
    },
    {
      "type": "L005",
      "totalMass": 1000000000,
      "jumpMass": 5000000
    },
    {
      "type": "L031",
      "totalMass": 3000000000,
      "jumpMass": 1000000000
    },
    {
      "type": "L477",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "L614",
      "totalMass": 1000000000,
      "jumpMass": 62000000
    },
    {
      "type": "M001",
      "totalMass": 1000000000,
      "jumpMass": 5000000
    },
    {
      "type": "M164",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "M267",
      "totalMass": 1000000000,
      "jumpMass": 375000000
    },
    {
      "type": "M555",
      "totalMass": 3000000000,
      "jumpMass": 1000000000
    },
    {
      "type": "M609",
      "totalMass": 1000000000,
      "jumpMass": 62000000
    },
    {
      "type": "N062",
      "totalMass": 3000000000,
      "jumpMass": 375000000
    },
    {
      "type": "N110",
      "totalMass": 1000000000,
      "jumpMass": 62000000
    },
    {
      "type": "N290",
      "totalMass": 5000000000,
      "jumpMass": 2000000000
    },
    {
      "type": "N432",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "N766",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "N770",
      "totalMass": 3000000000,
      "jumpMass": 375000000
    },
    {
      "type": "N944",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "N968",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "O128",
      "totalMass": 1000000000,
      "jumpMass": 375000000
    },
    {
      "type": "O477",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "O883",
      "totalMass": 1000000000,
      "jumpMass": 62000000
    },
    {
      "type": "P060",
      "totalMass": 500000000,
      "jumpMass": 62000000
    },
    {
      "type": "Q003",
      "totalMass": 1000000000,
      "jumpMass": 5000000
    },
    {
      "type": "Q063",
      "totalMass": 500000000,
      "jumpMass": 62000000
    },
    {
      "type": "Q317",
      "totalMass": 500000000,
      "jumpMass": 62000000
    },
    {
      "type": "R051",
      "totalMass": 3000000000,
      "jumpMass": 1000000000
    },
    {
      "type": "R259",
      "totalMass": 750000000,
      "jumpMass": 375000000
    },
    {
      "type": "R474",
      "totalMass": 3000000000,
      "jumpMass": 375000000
    },
    {
      "type": "R943",
      "totalMass": 750000000,
      "jumpMass": 375000000
    },
    {
      "type": "S047",
      "totalMass": 3000000000,
      "jumpMass": 375000000
    },
    {
      "type": "S199",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "S804",
      "totalMass": 1000000000,
      "jumpMass": 62000000
    },
    {
      "type": "S877",
      "totalMass": 750000000,
      "jumpMass": 375000000
    },
    {
      "type": "T405",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "T458",
      "totalMass": 500000000,
      "jumpMass": 62000000
    },
    {
      "type": "U210",
      "totalMass": 3000000000,
      "jumpMass": 375000000
    },
    {
      "type": "U319",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "U574",
      "totalMass": 3000000000,
      "jumpMass": 375000000
    },
    {
      "type": "V283",
      "totalMass": 3000000000,
      "jumpMass": 1000000000
    },
    {
      "type": "V301",
      "totalMass": 500000000,
      "jumpMass": 62000000
    },
    {
      "type": "V753",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "V898",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "V911",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "V928",
      "totalMass": 750000000,
      "jumpMass": 375000000
    },
    {
      "type": "W237",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "X702",
      "totalMass": 1000000000,
      "jumpMass": 375000000
    },
    {
      "type": "X877",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "Y683",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "Y790",
      "totalMass": 500000000,
      "jumpMass": 62000000
    },
    {
      "type": "Z006",
      "totalMass": 1000000000,
      "jumpMass": 5000000
    },
    {
      "type": "Z060",
      "totalMass": 1000000000,
      "jumpMass": 62000000
    },
    {
      "type": "Z142",
      "totalMass": 3300000000,
      "jumpMass": 2000000000
    },
    {
      "type": "Z457",
      "totalMass": 2000000000,
      "jumpMass": 375000000
    },
    {
      "type": "Z647",
      "totalMass": 500000000,
      "jumpMass": 62000000
    },
    {
      "type": "Z971",
      "totalMass": 100000000,
      "jumpMass": 62000000
    },
    {
      "type": "U372",
      "totalMass": 1000000000,
      "jumpMass": 375000000
    },
    {
      "type": "F216",
      "totalMass": 1000000000,
      "jumpMass": 375000000
    },
    {
      "type": "C729",
      "totalMass": 1000000000,
      "jumpMass": 375000000
    },
    {
      "type": "R081",
      "totalMass": 1000000000,
      "jumpMass": 450000000
    },
    {
      "type": "X450",
      "totalMass": 1000000000,
      "jumpMass": 375000000
    }
  ])

  return { wormholes }
})
