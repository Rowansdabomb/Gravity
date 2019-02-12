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
      relY: 0
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

  onMouseDown(e) {
    // left or right mouse button
    if (e.button !== 0) return;
    const posLeft = document.getElementById("ship").offsetLeft;
    const posTop = document.getElementById("ship").offsetTop;
    this.setState({
      dragging: true,
      button: e.button,
      relX: e.pageX - posLeft,
      relY: e.pageY - posTop
    });
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
    this.setState(
      {
        posX:
          e.pageX - this.state.relX + this.state.iX + this.props.ship.radius,
        posY: e.pageY - this.state.relY + this.state.iY + this.props.ship.radius
      },
      () => {
        this.props.updateShip({ posX: this.state.posX, posY: this.state.posY });
      }
    );
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    const position = {
      transform: `translate3d(${this.props.ship.posX}px, ${
        this.props.ship.posY
      }px, 0)`
    };

    const size = {
      marginLeft: -this.props.ship.radius,
      marginTop: -this.props.ship.radius,
      width: 2 * this.props.ship.radius,
      height: 2 * this.props.ship.radius,
      borderRadius: 2 * this.props.ship.radius
    };

    const style = { ...size, ...position };

    return (
      <div
        id="ship"
        className="ship"
        style={style}
        onMouseDown={e => {
          this.onMouseDown(e);
        }}
      />
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
