import React from "react";
import MassiveObject from "../MassiveObject/MassiveObject.jsx";
import Ship from "../Ship/Ship.jsx";

import { connect } from "react-redux";


import "./Space.css";
import { spaceSize } from "../../Constants.js";

class Space extends React.Component {

  shouldComponentUpdate(prevprops, prevstate) {
    if (this.props.gameActive) return false
    return true
  }

  renderPlanets(planet, index) {
    return (
      <MassiveObject
        key={"level_" + String(this.props.level) + "_planet_" + String(index)}
        index={index}
        data={planet}
      />
    );
  }

  render() {
    const size = {  width: spaceSize, height: spaceSize}
    return (
      <div id="space" style={size} className="space-container">
        {Object.values(this.props.planets).map((planet, index) => {
          return this.renderPlanets(planet, index);
        })}
        <Ship />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ship: state.space.ship,
    planets: state.space.planets,
    level: state.game.level,
    reset: state.game.reset,
    clock: state.game.clock,
    gameActive: state.game.gameActive
  };
};



export default connect(
  mapStateToProps,
  null
)(Space);
