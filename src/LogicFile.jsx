import { useState, useEffect } from "react";

export const useGameLogic = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [options, setOptions] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameTime, setGameTime] = useState(0);

  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 100);
    const newNum2 = Math.floor(Math.random() * (100 - newNum1));
    const newAnswer = newNum1 + newNum2;

    if (newAnswer > 100) {
      generateQuestion();
    } else {
      setNum1(newNum1);
      setNum2(newNum2);
      setAnswer(newAnswer);
      generateOptions(newAnswer); // call generateOptions with the newAnswer
    }
  };

  const shuffleArray = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const generateOptions = (newAnswer) => {
    // accept newAnswer as a parameter
    let newOptions = [];
    for (let i = 0; i < 4; i++) {
      let newOption;
      do {
        newOption = Math.floor(Math.random() * 100);
      } while (newOptions.includes(newOption) || newOption === newAnswer); // use newAnswer instead of answer

      newOptions.push(newOption);
    }

    newOptions.push(newAnswer);
    setOptions(shuffleArray(newOptions));
  };

  const handleAnswer = (option) => {
    if (option === answer || option === userAnswer) {
      setScore(score + 1);
      generateQuestion();
    } else {
      setLives(lives - 1);
      if (lives === 1) {
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const timer = setTimeout(() => {
        setGameTime(gameTime + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameTime, gameOver]);

  return {
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
  };
};
