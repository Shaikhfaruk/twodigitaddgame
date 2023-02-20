import React from "react";
import { useGameLogic } from "./LogicFile";

const Render = () => {
  const {
    num1,
    num2,
    options,
    userAnswer,
    setUserAnswer,
    handleAnswer,
    score,
    lives,
    gameOver,
    time,
  } = useGameLogic();

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <button key={index} onClick={() => handleAnswer(option)}>
        {option}
      </button>
    ));
  };

  const renderGameOverDialog = () => {
    return (
      <div className="game-over-dialog">
        <h2>Game Over!</h2>
        <p>Your score: {score}</p>
        <p>Time taken: {time} seconds</p>
        <button onClick={() => window.location.reload()}>Start New Game</button>
      </div>
    );
  };

  return (
    <div className="game-container">
      <h1>Addition Game</h1>
      {!gameOver && (
        <>
          <div className="question">
            <p>Question {num1 + num2}</p>
            <p>
              {num1} + {num2} =
            </p>
          </div>
          <div className="options">{renderOptions()}</div>
          <div className="scoreboard">
            <p>Score: {score}</p>
            <p>Lives: {lives}</p>
            <p>Time: {time} seconds</p>
          </div>
          <div className="answer-input">
            <label htmlFor="answer">Your Answer:</label>
            <input
              type="number"
              id="answer"
              name="answer"
              value={userAnswer}
              onChange={handleInputChange}
            />
            <button onClick={() => handleAnswer(parseInt(userAnswer))}>
              Submit
            </button>
          </div>
        </>
      )}
      {gameOver && renderGameOverDialog()}
    </div>
  );
};

export default Render;
