import actionTypes from "../actions/actionTypes.js";

import { levels, shipInit } from "../../Levels/levels.js";

const initialState = {
  ship: {
    ...levels[0].ship,
    ...shipInit
  },
  planets: {
    ...levels[0].planets
  }
};

const space = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SHIP:
      return {
        ...state,
        ship: { ...state.ship, ...action.ship }
      };
    case actionTypes.UPDATE_PLANETS:
      return {
        ...state,
        planets: { ...action.planets }
      };
    case actionTypes.UPDATE_PLANET:
      return {
        ...state,
        planets: { 
          ...state.planets,
          [action.index]: {
            ...state.planets[action.index], 
            ...action.planet
          }
        }
      };
    default:
      return state;
  }
};

export default space;
