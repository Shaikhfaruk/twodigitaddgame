import { useState, useEffect } from "react";

const generateRandomNumbers = () => {
  const num1 = Math.floor(Math.random() * 90 + 10);
  const num2 = Math.floor(Math.random() * (100 - num1) + 10);
  return [num1, num2];
};

const generateOptions = (correctAnswer) => {
  const options = [];
  while (options.length < 3) {
    const option =
      Math.floor(Math.random() * 90 + 10) + Math.floor(Math.random() * 90 + 10);
    if (option !== correctAnswer && !options.includes(option) && option < 100) {
      options.push(option);
    }
  }
  options.push(correctAnswer);
  return options.sort(() => Math.random() - 0.5);
};

export const useGameLogic = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const [num1, num2] = generateRandomNumbers();
    setNum1(num1);
    setNum2(num2);
    setCorrectAnswer(num1 + num2);
    setOptions(generateOptions(num1 + num2));
  }, [questionNumber]);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  const handleAnswer = (option) => {
    const newScore = option === correctAnswer ? score + 1 : score;
    const newLives = option === correctAnswer ? lives : lives - 1;
    const isGameOver = newLives === 0 || questionNumber === 9;
    if (isGameOver) {
      setGameOver(true);
    } else {
      setScore(newScore);
      setLives(newLives);
      setQuestionNumber(questionNumber + 1);
      setUserAnswer("");
    }
  };

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
    time,
  };
};
