export const shipInit = {
  mass: 1,
  radius: 5,
  rotation: -270,
  aX: 0,
  aY: 0,
  vX: 0,
  vY: 0,
  tail: []
}

export const levels = [
  {
    level: 1,
    ship: {
      posX: 250,
      posY: 150
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
      posX: 250,
      posY: 150,
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
        mass: 20000,
        posX: 250,
        posY: 250
      }
    ]
  },
  {
    level: 3,
    ship: {
      posX: 250,
      posY: 150,
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
  },
  {
    level: 4,
    ship: {
      posX: 50,
      posY: 50,
    },
    planets: [
      {
        type: "void",
        mass: 10000,
        posX: 400,
        posY: 200
      },
      {
        type: "void",
        mass: 15000,
        posX: 150,
        posY: 100
      },
      {
        type: "goal",
        mass: 10000,
        posX: 450,
        posY: 450
      },
      {
        type: "void",
        mass: 40000,
        posX: 325,
        posY: 400
      },
    ]
  },
  {
    level: 5,
    ship: {
      posX: 470,
      posY: 300,
    },
    planets: [
      {
        type: "void",
        mass: 100000,
        posX: 250,
        posY: 300
      },
      {
        type: "goal",
        mass: 15000,
        posX: 250,
        posY: 70
      }
    ]
  },
  {
    level: 6,
    ship: {
      posX: 470,
      posY: 300,
    },
    planets: [
      {
        type: "void",
        mass: 100000,
        posX: 250,
        posY: 300
      },
      {
        type: "void",
        mass: 10000,
        posX: 150,
        posY: 300
      },
      {
        type: "void",
        mass: 10000,
        posX: 350,
        posY: 300
      },
      
      {
        type: "goal",
        mass: 15000,
        posX: 250,
        posY: 70
      }
    ]
  }
];
