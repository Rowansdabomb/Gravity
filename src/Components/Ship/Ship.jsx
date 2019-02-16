import React from "react";

import { connect } from "react-redux";
import { updateShip } from "../../Redux/actions/actions.js";

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
      iVY: 0
    };
  }

  componentDidUpdate(prevprops, prevstate) {
    if (this.state.dragging && !prevstate.dragging) {
      document.addEventListener("mousemove", e => this.onMouseMove(e));
      document.addEventListener("mouseup", e => this.onMouseUp(e));
    } else if (!this.state.dragging && prevstate.dragging) {
      document.removeEventListener("mousemove", e => this.onMouseMove(e));
      document.removeEventListener("mouseup", e => this.onMouseUp(e));
    }

    if (prevprops.reset) {
      this.setState({
        iX: this.props.ship.posX,
        iY: this.props.ship.posY,
        posX: this.props.ship.posX,
        posY: this.props.ship.posY
      });
    }
  }

  shouldComponentUpdate() {
    
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
      this.setState(
        {
          vX: e.pageX - relX + this.props.ship.radius,
          vY: e.pageY - relY + this.props.ship.radius
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

    const style = { ...position };

    return (
      <div
        id="ship"
        className="ship"
        style={style}
        onMouseDown={e => {
          this.onMouseDown(e);
        }}
      > 
        <div className="ship-image" style={rotation}></div>
        {!this.props.gameActive && <div className="velocity-vector"  style={velocity}/> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ship: state.space.ship,
    planets: state.space.planets,
    gameActive: state.game.gameActive
  };
};

const mapDispatchToProps = dispatch => ({
  updateShip: data => dispatch(updateShip(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ship);

// export default Ship;
