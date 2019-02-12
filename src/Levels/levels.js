export const levels = [
  {
    level: 1,
    ship: {
      mass: 1,
      radius: 5,
      posX: 250,
      posY: 150,
      aX: 0,
      aY: 0,
      vX: 0,
      vY: 0
    },
    planets: [
      {
        type: "goal",
        mass: 20000,
        radius: 25,
        posX: 250,
        posY: 250
      }
    ]
  },
  {
    level: 2,
    ship: {
      mass: 1,
      radius: 5,
      posX: 250,
      posY: 150,
      aX: 0,
      aY: 0,
      vX: 0,
      vY: 0
    },
    planets: [
      {
        type: "goal",
        mass: 10000,
        radius: 25,
        posX: 200,
        posY: 100
      },
      {
        type: "void",
        mass: 15000,
        radius: 35,
        posX: 250,
        posY: 250
      }
    ]
  },
  {
    level: 3,
    ship: {
      mass: 1,
      radius: 5,
      posX: 250,
      posY: 150,
      aX: 0,
      aY: 0,
      vX: 0,
      vY: 0
    },
    planets: [
      {
        type: "void",
        mass: 10000,
        radius: 25,
        posX: 200,
        posY: 100
      },
      {
        type: "void",
        mass: 15000,
        radius: 35,
        posX: 250,
        posY: 250
      },
      {
        type: "goal",
        mass: 25000,
        radius: 20,
        posX: 250,
        posY: 350
      }
    ]
  }
];
