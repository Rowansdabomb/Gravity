import actionTypes from "./actionTypes.js";

export const clearLevel = level => ({
  type: actionTypes.CLEAR_LEVEL,
  level: level
});

export const prompt = message => ({
  type: actionTypes.PROMPT,
  message: message
})

export const updateShip = ship => ({
  type: actionTypes.UPDATE_SHIP,
  ship: ship
});

export const updatePlanets = planets => ({
  type: actionTypes.UPDATE_PLANETS,
  planets: planets
});

export const incrementClock = clock => ({
  type: actionTypes.INCREMENT_CLOCK,
  clock: clock
});

export const selectLevel = level => ({
  type: actionTypes.SELECT_LEVEL,
  level: level
});

export const unsetGame = () => ({
  type: actionTypes.UNSET_GAME
});

export const resetGame = () => ({
  type: actionTypes.RESET_GAME
});

export const startGame = () => ({
  type: actionTypes.START_GAME
});

export const stopGame = () => ({
  type: actionTypes.STOP_GAME
});
