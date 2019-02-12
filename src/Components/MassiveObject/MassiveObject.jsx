import React from "react";
import "./MassiveObject.css";
import "../../Styles/colors.css";

class MassiveObject extends React.Component {
  render() {
    const position = {
      left: this.props.data.posX,
      top: this.props.data.posY
    };
    const size = {
      width: 2 * this.props.data.radius,
      height: 2 * this.props.data.radius,
      borderRadius: 2 * this.props.data.radius
    };
    const style = { ...size, ...position };
    return <div className={`massive-object ${this.props.data.type === "goal" ? "green": ""}`} style={style} />;
  }
}

export default MassiveObject;
