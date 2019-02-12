import actionTypes from "../actions/actionTypes.js";

import { levels } from "../../Levels/levels.js";

const initialState = {
  ship: {
    ...levels[0].ship
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
    default:
      return state;
  }
};

export default space;
