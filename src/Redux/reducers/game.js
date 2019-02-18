import actionTypes from "../actions/actionTypes.js";
import {frameRate} from "../../Constants.js"


const initialState = {
  interval: 1000 / frameRate,
  gameActive: false,
  reset: false,
  clock: 0,
  level: 0,
  levelsCleared: [],
  message: null,
  creatorMode: false
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_LEVEL:
      let newLevelsCleared = [...state.levelsCleared];
      if (!state.levelsCleared.includes(action.level)) {
        newLevelsCleared = state.levelsCleared.concat([action.level]);
      }
      return {
        ...state,
        levelsCleared: newLevelsCleared
      };
    case actionTypes.PROMPT:
      return {
        ...state,
        message: action.message
      }
    case actionTypes.INCREMENT_CLOCK:
      return {
        ...state,
        clock: state.clock + 1
      };
    case actionTypes.UNSET_GAME:
      return {
        ...state,
        reset: false
      };
    case actionTypes.RESET_GAME:
      return {
        ...state,
        gameActive: false,
        reset: true,
        clock: 0,
        message: null
      };
    case actionTypes.SELECT_LEVEL:
      return {
        ...state,
        level: action.level
      };
    case actionTypes.START_GAME:
      return {
        ...state,
        gameActive: true
      };
    case actionTypes.STOP_GAME:
      return {
        ...state,
        gameActive: false
      };
    case actionTypes.CREATE_MODE:
      return {
        ...state,
        creatorMode: true
      }
    case actionTypes.GAME_MODE:
      return {
        ...state,
        creatorMode: false
      }
    default:
      return state;
  }
};

export default game;
