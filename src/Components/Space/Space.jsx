import React from "react";
import MassiveObject from "../MassiveObject/MassiveObject.jsx";
import Ship from "../Ship/Ship.jsx";

import { connect } from "react-redux";
import {
  clearLevel,
  prompt,
  updateShip,
  updatePlanets,
  resetGame,
  unsetGame
} from "../../Redux/actions/actions.js";

import "./Space.css";
import { G } from "../../Constants.js";
import { levels } from "../../Levels/levels.js";
import { radiusFromMass } from "../../helpers.js";

const promptDuration = 1500;
const spaceHeight = 500;
const spaceWidth = spaceHeight;

class Space extends React.Component {
  constructor(props) {
    super(props);
    this.removeEvent = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.level !== prevProps.level) {
      this.setState({
        ship: levels[this.props.level].ship,
        planets: levels[this.props.level].planets
      });
    }

    if (this.props.reset) {
      this.props.unsetGame()
      this.props.updateShip(levels[this.props.level].ship);
      this.props.updatePlanets(levels[this.props.level].planets);
    }

    if (this.props.clock > prevProps.clock) {
      this.calculateShipAcceleration();
    }
  }

  

  calculateShipAcceleration() {
    const t = this.props.interval / 1000;
    let dX = 0;
    let dY = 0;
    let vX = this.props.ship.vX;
    let vY = this.props.ship.vY;
    let aX = 0;
    let aY = 0;
    if (this.props.ship.posX < 0 || this.props.ship.posX > spaceWidth || this.props.ship.posY < 0 || this.props.ship.posY > spaceHeight) {
      if (this.props.message === null) this.props.prompt("Fail");
      setTimeout(() => {
        this.props.resetGame();
      }, promptDuration);
    }

    for (const planet of Object.values(this.props.planets)) {
      const rX = planet.posX - this.props.ship.posX;
      const rY = planet.posY - this.props.ship.posY;

      const r = Math.sqrt(rX * rX + rY * rY);
      const planetRadius = radiusFromMass(planet.mass);
      if (r <= planetRadius + 2 * this.props.ship.radius - 2) {
        
        vX = 0;
        vY = 0;
        aX = 0;
        aY = 0;
        if (planet.type === "goal") {
          if (this.props.message === null) this.props.prompt("Success");
          setTimeout(() => {
            this.props.clearLevel(this.props.level);
            this.props.resetGame();
          }, promptDuration);
        } else {
          if (this.props.message === null) this.props.prompt("Fail");
          setTimeout(() => {
            this.props.resetGame();
          }, promptDuration);
        }

        break;
      }

      const a = (G * planet.mass) / (r * r);
      aX += (a * rX) / r;
      aY += (a * rY) / r;
    }

    dX += vX * t + (1 / 2) * aX * t * t;
    dY += vY * t + (1 / 2) * aY * t * t;

    vX += aX * t;
    vY += aY * t;

    this.props.updateShip({
      aX: aX,
      aY: aY,
      vX: vX,
      vY: vY,
      posX: this.props.ship.posX + dX,
      posY: this.props.ship.posY + dY
    });
  }

  updateShipPosition(x, y) {
    this.props.updateShip({
      posX: x,
      posY: y
    });
  }

  renderPlanets(planet, index) {
    return (
      <MassiveObject
        key={"level_" + String(this.props.level) + "_planet_" + String(index)}
        data={planet}
      />
    );
  }

  render() {
    const spaceSize = {  width: spaceWidth, height: spaceHeight}
    return (
      <div id="space" style={spaceSize} className="space-container">
        {Object.values(this.props.planets).map((planet, index) => {
          return this.renderPlanets(planet, index);
        })}

        <Ship
          data={this.props.ship}
          reset={this.props.reset}
          updateInitialVelocity={(x, y) => {
            this.updateInitialVelocity(x, y);
          }}
          updateShipPosition={(x, y) => {
            this.updateShipPosition(x, y);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clock: state.game.clock,
    ship: state.space.ship,
    planets: state.space.planets,
    level: state.game.level,
    reset: state.game.reset,
    message: state.game.message
  };
};

const mapDispatchToProps = dispatch => ({
  clearLevel: level => dispatch(clearLevel(level)),
  prompt: message => dispatch(prompt(message)),
  updateShip: data => dispatch(updateShip(data)),
  updatePlanets: data => dispatch(updatePlanets(data)),
  resetGame: () => dispatch(resetGame()),
  unsetGame: () => dispatch(unsetGame())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Space);
