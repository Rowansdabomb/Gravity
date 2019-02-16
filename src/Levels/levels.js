export const levels = [
  {
    level: 1,
    ship: {
      mass: 1,
      radius: 5,
      rotation: -270,
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
      rotation: -270,
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
        posX: 200,
        posY: 100
      },
      {
        type: "void",
        mass: 15000,
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
      rotation: -270,
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
        posX: 200,
        posY: 100
      },
      {
        type: "void",
        mass: 15000,
        posX: 250,
        posY: 250
      },
      {
        type: "goal",
        mass: 25000,
        posX: 250,
        posY: 350
      }
    ]
  }
];
