import React, { Component } from "react";
import { connect } from "react-redux";
import {
  incrementClock,
  resetGame,
  unsetGame,
  selectLevel,
  startGame,
  stopGame,
  updateShip,
  updatePlanets,
  createMode,
  gameMode
} from "../Redux/actions/actions.js";

import "./Game.css";
import "../Styles/colors.css"
import Space from "./Space/Space.jsx";
import { shipInit, levels } from "../Levels/levels.js";

class Game extends Component {
  constructor(props) {
    super(props);
    this.timer = -1;
  }

  componentDidUpdate() {
    if (this.props.reset) {
      this.props.unsetGame()
      this.props.updateShip({ ...shipInit, ...levels[this.props.level].ship});
      this.props.updatePlanets(levels[this.props.level].planets);
      if (this.props.gameActive) {
        this.props.stopGame();
        clearInterval(this.timer);
      }
    }

    if (this.props.gameActive && this.timer === -1) {
      this.timer = setInterval(() => {
        this.props.incrementClock();
      }, this.props.interval);
    }
    if (!this.props.gameActive && this.timer !== -1) {
      clearInterval(this.timer);
      this.timer = -1;
    }
  }

  shouldComponentUpdate() {
    if(this.props.message) return true
    if(this.props.gameActive) return false
    return true
  }

  toggleGame() {
    if (this.props.gameActive) {
      this.props.stopGame();
    } else {
      this.props.startGame();
    }
  }
  toggleCreateMode() {
    if (this.props.creatorMode) {
      this.props.gameMode();
    } else {
      this.props.createMode();
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

        <Space />

        {this.props.message !== null && <div className={`game-prompt ${this.props.message === "Fail" ? "red-font" : "green-font"}`}>{this.props.message}</div>}
        {!this.props.creatorMode && 
          <div className="controls">
            <div className="button" onClick={() => this.toggleGame()}>
              {this.props.gameActive ? "Pause" : "Start"}{" "}
            </div>
            <div className="button" onClick={() => this.props.resetGame()}>
              reset
            </div>
          </div>
        }

        {!this.props.creatorMode && 
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
        }
        <div className="button" onClick={() => this.toggleCreateMode()}>
          {this.props.creatorMode && "Game Mode"}
          {!this.props.creatorMode && "Create Mode"}
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
  interval: state.game.interval,
  creatorMode: state.game.creatorMode
});

const mapDispatchToProps = dispatch => ({
  incrementClock: () => dispatch(incrementClock()),
  resetGame: () => dispatch(resetGame()),
  unsetGame: () => dispatch(unsetGame()),
  startGame: () => dispatch(startGame()),
  stopGame: () => dispatch(stopGame()),
  selectLevel: level => dispatch(selectLevel(level)),
  updateShip: data => dispatch(updateShip(data)),
  updatePlanets: data => dispatch(updatePlanets(data)),
  createMode: () => dispatch(createMode()),
  gameMode: () => dispatch(gameMode())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
