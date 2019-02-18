import React from "react";
import { connect } from "react-redux";
import {radiusFromMass, massFromRadius} from "../../helpers.js"
import "./MassiveObject.css";
import "../../Styles/colors.css";

import {
  updatePlanet,
} from "../../Redux/actions/actions.js";

class MassiveObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      button: 0,
      iX: this.props.planets[this.props.index].posX,
      iY: this.props.planets[this.props.index].posY,
      posX: this.props.planets[this.props.index].posX,
      posY: this.props.planets[this.props.index].posY,
      relX: 0,
      relY: 0,
      mass: 10000,
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
  }

  onMouseDown(e) {
    // left or right mouse button
    if (this.props.creatorMode) {
      if (e.button === 0 || e.button === 1) {
        const posLeft = document.getElementsByClassName("massive-object")[this.props.index].offsetLeft;
        const posTop = document.getElementsByClassName("massive-object")[this.props.index].offsetTop;
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
      let rX = e.pageX - relX - this.state.iX 
      let rY = e.pageY - relY - this.state.iY
      const mass = massFromRadius(Math.sqrt(rX*rX + rY*rY))
      this.props.updatePlanet({ mass: mass }, this.props.index);
    }
    if (this.state.button === 0) {
      this.setState(
        {
          posX: e.pageX - relX + this.state.iX + radiusFromMass(this.props.planets[this.props.index].mass),
          posY: e.pageY - relY + this.state.iY + radiusFromMass(this.props.planets[this.props.index].mass)
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
    const radius = radiusFromMass(this.props.data.mass)

    const position = {
      left: this.props.data.posX,
      top: this.props.data.posY
    };
    const size = {
      width: 2 * radius,
      height: 2 * radius,
      borderRadius: 2 * radius
    };
    const style = { ...size, ...position };
    return <div 
      className={`massive-object ${this.props.data.type === "goal" ? "green": ""}`} 
      style={style}         
      onMouseDown={e => {
        this.onMouseDown(e);
      }}
      />;
  }
}


const mapStateToProps = state => ({
  planets: state.space.planets,
  creatorMode: state.game.creatorMode
});

const mapDispatchToProps = dispatch => ({
  updatePlanet: (data, index) => dispatch(updatePlanet(data, index)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MassiveObject);

// export default MassiveObject;
