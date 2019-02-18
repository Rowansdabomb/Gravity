import React from "react";

import { connect } from "react-redux";
import {G, spaceSize, promptDuration, maxVelocity} from "../../Constants.js"
import { radiusFromMass } from "../../helpers.js";

import {
  clearLevel,
  prompt,
  updateShip,
  updatePlanets,
  resetGame,
  unsetGame
} from "../../Redux/actions/actions.js";

import "./Ship.css";

class Ship extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      button: 0,
      iX: this.props.ship.posX,
      iY: this.props.ship.posY,
      posX: this.props.ship.posX,
      posY: this.props.ship.posY,
      relX: 0,
      relY: 0,
      iVX: 0,
      iVY: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dragging && !prevState.dragging) {
      document.addEventListener("mousemove", e => this.onMouseMove(e));
      document.addEventListener("mouseup", e => this.onMouseUp(e));
    } else if (!this.state.dragging && prevState.dragging) {
      document.removeEventListener("mousemove", e => this.onMouseMove(e));
      document.removeEventListener("mouseup", e => this.onMouseUp(e));
    }

    if (prevProps.reset) {
      this.setState({
        iX: this.props.ship.posX,
        iY: this.props.ship.posY,
        posX: this.props.ship.posX,
        posY: this.props.ship.posY
      });
    }
    if (this.props.clock > prevProps.clock) {
      this.calculateShipAcceleration();
    }
  }

  promptMessage(success) {
    if (this.props.message === null) {
      if (success) {
        this.props.prompt("Success");
        setTimeout(() => {
          this.props.clearLevel(this.props.level);
          this.props.resetGame();
        }, promptDuration);
      } else {
        this.props.prompt("Fail");
        setTimeout(() => {
          this.props.resetGame();
        }, promptDuration);
      }
    }
  }

  calculateShipAcceleration() {
    const t = this.props.interval / 1000; // convert to seconds from milliseconds
    let dX = 0;
    let dY = 0;
    let vX = this.props.ship.vX;
    let vY = this.props.ship.vY;
    let aX = 0;
    let aY = 0;
    if (this.props.ship.posX < 0 || this.props.ship.posX > spaceSize || this.props.ship.posY < 0 || this.props.ship.posY > spaceSize) {
      this.promptMessage(false)
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
        if (planet.type === "goal") this.promptMessage(true)
        else this.promptMessage(false)

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
    let tail = this.props.ship.tail
    if (this.props.clock % 5 === 0) {
      tail = tail.concat([[this.props.ship.posX + dX, this.props.ship.posY + dY]])
      if (tail.length > 50) tail.shift();
    }

    this.props.updateShip({
      aX: aX,
      aY: aY,
      vX: vX,
      vY: vY,
      posX: this.props.ship.posX + dX,
      posY: this.props.ship.posY + dY,
      tail: tail
    });
  }

  onMouseDown(e) {
    // left or right mouse button
    const posLeft = document.getElementById("ship").offsetLeft;
    const posTop = document.getElementById("ship").offsetTop;
    if (e.button === 0 || e.button === 1) {
      this.setState({
        dragging: true,
        button: e.button,
        relX: e.pageX - posLeft,
        relY: e.pageY - posTop
      });
    } 

    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e) {
    this.setState({
      dragging: false,
      iX: this.state.posX,
      iY: this.state.posY
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e) {
    if (!this.state.dragging || this.props.gameActive) return;
    const relX = this.state.relX;
    const relY = this.state.relY;
    if (this.state.button === 1) {
      let vX = e.pageX - relX + this.props.ship.radius
      let vY = e.pageY - relY + this.props.ship.radius
      const velocity = Math.sqrt(vX*vX + vY*vY)
      
      if (velocity > maxVelocity) {
        vX *= maxVelocity / velocity
        vY *= maxVelocity / velocity
      }
      this.setState(
        {
          vX: vX,
          vY: vY
        },
        () => {
          this.props.updateShip({ vX: this.state.vX, vY: this.state.vY });
        }
      );
    }
    if (this.state.button === 0) {
      this.setState(
        {
          posX: e.pageX - relX + this.state.iX + this.props.ship.radius,
          posY: e.pageY - relY + this.state.iY + this.props.ship.radius
        },
        () => {
          this.props.updateShip({ posX: this.state.posX, posY: this.state.posY });
        }
      );
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    const radius = Math.sqrt(Math.pow(this.props.ship.vX, 2) + Math.pow(this.props.ship.vY, 2))
    const theta = -Math.atan2(this.props.ship.vX, this.props.ship.vY)*180 / Math.PI - 270

    const velocity = {width: radius, transform: `rotate(${theta}deg)`}

    const position = {
      transform: `translate3d(${this.props.ship.posX}px, ${
        this.props.ship.posY
      }px, 0)`
    };

    const rotation = {transform: `rotate(${theta + 90}deg)` }

    return (
      <div>
        <div
          id="ship"
          className="ship"
          style={position}
          onMouseDown={e => {
            this.onMouseDown(e);
          }}
        > 
        <div className="ship-image" style={rotation}></div>
          {!this.props.gameActive && <div className="velocity-vector"  style={velocity}/> }

        </div>
        {this.props.ship.tail.map((coords, index) => {
          return(
            <div key={'ship-tail-point' + index } className="ship-tail" style={{position: 'absolute', left: coords[0] - 1, top: coords[1] + 5}}></div> 
          )
        })}
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    interval: state.game.interval,
    ship: state.space.ship,
    planets: state.space.planets,
    gameActive: state.game.gameActive,
    clock: state.game.clock,
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
)(Ship);
