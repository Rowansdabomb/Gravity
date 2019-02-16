import React from "react";
import {radiusFromMass} from "../../helpers.js"
import "./MassiveObject.css";
import "../../Styles/colors.css";

class MassiveObject extends React.Component {
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
    return <div className={`massive-object ${this.props.data.type === "goal" ? "green": ""}`} style={style} />;
  }
}

export default MassiveObject;
