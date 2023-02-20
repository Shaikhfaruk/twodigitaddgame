import { useGameLogic } from "./LogicFile";
import "./App.css";

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
    gameTime,
  } = useGameLogic();

  const handleOptionClick = (option) => {
    handleAnswer(option);
  };

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleAnswer(parseInt(userAnswer));
    setUserAnswer("");
  };

  const handleNewGame = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <h1 className="title">Addition Game</h1>
      {!gameOver && (
        <div>
          <p className="question">
            Question {num1} + {num2} = ?
          </p>
          {/* <form onSubmit={handleFormSubmit} className="form-group">
            <input
              type="number"
              value={userAnswer}
              onChange={handleInputChange}
              className="answer-input"
              min="10"
              max="99"
              required
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form> */}
          <div className="game-stats">
            <p className="score">Score: {score}</p>
            <p className="lives">Lives: {lives}</p>
            <p className="timer">Time: {gameTime}</p>
          </div>
          <ul className="options">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className={
                  userAnswer === option ? "option selected" : "option-box"
                }
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
      {gameOver && (
        <div>
          <p className="game-over-msg">Game Over!</p>
          <p className="final-score">Score: {score}</p>
          <p className="final-time">Time: {gameTime}</p>
          <button className="new-game-btn" onClick={handleNewGame}>
            Start New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Render;
