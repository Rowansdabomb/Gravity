import { combineReducers } from "redux";

import space from "./space.js";
import game from "./game.js";

export default combineReducers({
  game: game,
  space: space
});
