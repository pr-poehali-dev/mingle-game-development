
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GameScene from "@/components/GameScene";
import GameControls from "@/components/GameControls";
import GameOverDialog from "@/components/GameOverDialog";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [playerPosition, setPlayerPosition] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setPlayerPosition(1);
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const movePlayer = (position: number) => {
    if (gameStarted && !gameOver) {
      setPlayerPosition(position);
      const isCorrectMove = Math.random() > 0.3; // 70% chance to be correct
      
      if (isCorrectMove) {
        setScore((prev) => prev + 10);
      } else {
        endGame();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121729] to-[#090B13] overflow-hidden">
      <div className="container mx-auto py-6 px-4 relative">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            className="bg-[#E5173F]/90 hover:bg-[#E5173F] text-white border-none"
            onClick={() => navigate("/")}
          >
            Назад
          </Button>
          <div className="flex gap-6">
            <div className="bg-[#111827]/80 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              <span className="text-[#E5173F] font-bold">Время:</span> {timeLeft}с
            </div>
            <div className="bg-[#111827]/80 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              <span className="text-[#E5173F] font-bold">Очки:</span> {score}
            </div>
          </div>
        </div>

        <div className="w-full h-[70vh] relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(229,23,63,0.3)]">
          {!gameStarted && !gameOver ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#090B13]/90 backdrop-blur-sm">
              <h1 className="text-5xl font-bold text-white mb-8">Третий лишний</h1>
              <p className="text-xl text-gray-300 max-w-md text-center mb-8">
                Вам нужно быстро занять позицию, чтобы не стать третьим лишним. 
                Будьте быстрее остальных игроков!
              </p>
              <Button
                className="bg-[#E5173F] hover:bg-[#C01435] text-white text-xl py-6 px-8"
                onClick={startGame}
              >
                Начать игру
              </Button>
            </div>
          ) : null}
          
          <GameScene 
            playerPosition={playerPosition} 
            gameStarted={gameStarted}
            gameOver={gameOver}
          />
        </div>

        {gameStarted && !gameOver && (
          <GameControls onMove={movePlayer} />
        )}
      </div>
      
      <GameOverDialog 
        open={gameOver} 
        score={score} 
        onRestart={startGame} 
        onExit={() => navigate("/")} 
      />
    </div>
  );
};

export default Game;
