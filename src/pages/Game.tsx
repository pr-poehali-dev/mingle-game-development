
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GameScene from "@/components/GameScene";
import GameControls from "@/components/GameControls";
import GameOverDialog from "@/components/GameOverDialog";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedDoors, setSelectedDoors] = useState<number[]>([]);
  const [selectedDoorId, setSelectedDoorId] = useState<number | null>(null);
  const [fakeDoorId, setFakeDoorId] = useState<number>(0);
  const navigate = useNavigate();
  
  const totalDoors = 30;
  const remainingDoors = totalDoors - selectedDoors.length;

  // Initialize or reset the game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setWon(false);
    setScore(0);
    setSelectedDoors([]);
    setSelectedDoorId(null);
    
    // Randomly select one door to be fake
    const newFakeDoorId = Math.floor(Math.random() * totalDoors);
    setFakeDoorId(newFakeDoorId);
  };

  // Handle door selection
  const handleDoorSelect = (doorId: number) => {
    if (!gameStarted || gameOver || selectedDoors.includes(doorId)) return;
    
    setSelectedDoorId(doorId);
    setSelectedDoors(prev => [...prev, doorId]);
    
    // Check if selected door is the fake one
    if (doorId === fakeDoorId) {
      endGame(false);
    } else {
      // Add points for selecting a real door
      setScore(prev => prev + 10);
      
      // Check if all real doors have been selected
      if (selectedDoors.length + 1 >= totalDoors - 1) {
        endGame(true);
      } else {
        // Continue game, clear selected door after a short delay
        setTimeout(() => {
          setSelectedDoorId(null);
        }, 300);
      }
    }
  };

  // End the game
  const endGame = (hasWon: boolean) => {
    setGameOver(true);
    setWon(hasWon);
    
    // Add bonus points for winning
    if (hasWon) {
      setScore(prev => prev + 50);
    }
  };

  // Initialize game on component mount
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121729] to-[#090B13] overflow-hidden">
      <div className="container mx-auto py-6 px-4 relative">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            className="bg-[#111827]/80 hover:bg-[#111827] text-white border-[#3B82F6]/50"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </div>

        <div className="w-full h-[70vh] relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)]">
          {!gameStarted ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#090B13]/90 backdrop-blur-sm">
              <h1 className="text-5xl font-bold text-white mb-8">The Third Floor</h1>
              <p className="text-xl text-gray-300 max-w-md text-center mb-8">
                Navigate through the mysterious doors on the third floor. 
                Avoid the fake door or face the consequences!
              </p>
              <Button
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xl py-6 px-8"
                onClick={startGame}
              >
                Start Game
              </Button>
            </div>
          ) : null}
          
          <GameScene 
            selectedDoorId={selectedDoorId}
            gameStarted={gameStarted}
            gameOver={gameOver}
            fakeDoorId={fakeDoorId}
            onDoorSelect={handleDoorSelect}
          />
        </div>

        {gameStarted && !gameOver && (
          <GameControls 
            onNewGame={startGame}
            remainingDoors={remainingDoors}
            score={score}
          />
        )}
      </div>
      
      <GameOverDialog 
        open={gameOver}
        score={score}
        won={won}
        fakeDoorNumber={fakeDoorId}
        selectedDoorNumber={selectedDoorId}
        onRestart={startGame}
        onExit={() => navigate("/")}
      />
    </div>
  );
};

export default Game;
