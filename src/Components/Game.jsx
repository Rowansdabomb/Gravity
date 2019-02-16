import React, { Component } from "react";
import { connect } from "react-redux";
import {
  incrementClock,
  resetGame,
  unsetGame,
  selectLevel,
  startGame,
  stopGame
} from "../Redux/actions/actions.js";

import "./Game.css";
import "../Styles/colors.css"
import Space from "./Space/Space.jsx";
import { levels } from "../Levels/levels.js";

const frameRate = 30;

class Game extends Component {
  constructor(props) {
    super(props);
    this.timer = -1;
    this.interval = 1000 / frameRate;
  }

  componentDidUpdate() {
    if (this.props.reset) {
      if (this.props.gameActive) {
        this.props.stopGame();
        clearInterval(this.timer);
      }
    }

    if (this.props.gameActive && this.timer === -1) {
      this.timer = setInterval(() => {
        this.props.incrementClock();
      }, this.interval);
    }
    if (!this.props.gameActive && this.timer !== -1) {
      clearInterval(this.timer);
      this.timer = -1;
    }
  }

  toggleGame() {
    if (this.props.gameActive) {
      this.props.stopGame();
    } else {
      this.props.startGame();
    }
  }

  selectLevel(level) {
    this.props.selectLevel(level);
    this.props.resetGame();
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: Number(e.target.value)
    });
  }

  render() {
    return (
      <div className="page-container">
        <span> Drag with left click to move the spaceship</span>
        <span> Drag with middle click to set initial velocity</span> 
        <span> Press start to simulate orbit </span>

        <Space interval={this.interval} />

        {this.props.message !== null && <div className={`game-prompt ${this.props.message === "Fail" ? "red-font" : "green-font"}`}>{this.props.message}</div>}

        <div className="controls">
          <div className="button" onClick={() => this.toggleGame()}>
            {this.props.gameActive ? "Pause" : "Start"}{" "}
          </div>
          <div className="button" onClick={() => this.props.resetGame()}>
            reset
          </div>
        </div>

        <div className="level-select">
          {levels.map((level, index) => {
            return (
              <div
                key={"level" + index}
                className={`button ${this.props.levelsCleared.includes(index) ? "green": ""}`}
                onClick={() => {
                  this.selectLevel(index);
                }}
              >
                Level {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameActive: state.game.gameActive,
  reset: state.game.reset,
  clock: state.game.clock,
  level: state.game.level,
  levelsCleared: state.game.levelsCleared,
  message: state.game.message,
});

const mapDispatchToProps = dispatch => ({
  incrementClock: () => dispatch(incrementClock()),
  resetGame: () => dispatch(resetGame()),
  unsetGame: () => dispatch(unsetGame()),
  startGame: () => dispatch(startGame()),
  stopGame: () => dispatch(stopGame()),
  selectLevel: level => dispatch(selectLevel(level))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
