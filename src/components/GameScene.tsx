
import { FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GameSceneProps {
  selectedDoorId: number | null;
  gameStarted: boolean;
  gameOver: boolean;
  fakeDoorId: number;
  onDoorSelect: (doorId: number) => void;
}

const GameScene: FC<GameSceneProps> = ({ 
  selectedDoorId, 
  gameStarted, 
  gameOver, 
  fakeDoorId,
  onDoorSelect
}) => {
  const [doorHighlight, setDoorHighlight] = useState<number | null>(null);
  
  // Generate doors layout (5 rows x 6 columns = 30 doors)
  const doorRows = 5;
  const doorColumns = 6;
  
  useEffect(() => {
    if (gameOver) {
      // Highlight the fake door when game is over
      setDoorHighlight(fakeDoorId);
    } else {
      setDoorHighlight(null);
    }
  }, [gameOver, fakeDoorId]);

  return (
    <div 
      className={cn(
        "relative w-full h-full bg-[url('https://images.unsplash.com/photo-1564005213682-502e5d2c700b?q=80&w=2000')] bg-cover bg-center",
        gameOver && "opacity-70 transition-opacity duration-500"
      )}
    >
      {/* Corridor overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090B13]/70 to-[#090B13]/30"></div>
      
      {/* Floor texture */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-[url('https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=2000')] bg-cover opacity-60">
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B13] to-transparent"></div>
      </div>
      
      {/* Room number sign */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#111827]/80 backdrop-blur-sm px-6 py-3 rounded-lg text-white border border-[#3B82F6]/50">
        <h2 className="text-2xl font-bold">Floor 3</h2>
      </div>
      
      {/* Door grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-6 gap-3 p-4 max-w-5xl w-full">
          {Array.from({ length: doorRows * doorColumns }).map((_, index) => {
            const isDoorSelected = selectedDoorId === index;
            const isFakeDoor = fakeDoorId === index;
            const isHighlighted = doorHighlight === index;
            
            return (
              <button
                key={index}
                disabled={gameOver || !gameStarted || isDoorSelected}
                onClick={() => onDoorSelect(index)}
                className={cn(
                  "relative h-24 transition-all duration-300 transform hover:scale-105 focus:outline-none",
                  isDoorSelected && !gameOver && "scale-110 z-10",
                  isHighlighted && isFakeDoor && "ring-4 ring-red-500 scale-110 z-10",
                  isHighlighted && !isFakeDoor && "ring-4 ring-green-500 scale-110 z-10"
                )}
              >
                {/* Door frame */}
                <div className={cn(
                  "absolute inset-0 rounded-lg border-2",
                  isDoorSelected || isHighlighted ? "border-white" : "border-[#3B82F6]/50",
                  isHighlighted && isFakeDoor && "border-red-500",
                  isHighlighted && !isFakeDoor && "border-green-500"
                )}></div>
                
                {/* Door */}
                <div className={cn(
                  "absolute inset-0 bg-[#1E3A8A] rounded-lg shadow-md flex items-center justify-center transition-colors",
                  isDoorSelected && !gameOver && "bg-[#3B82F6]",
                  isHighlighted && isFakeDoor && "bg-red-900",
                  isHighlighted && !isFakeDoor && "bg-green-800"
                )}>
                  {/* Door number */}
                  <span className="text-white font-bold">{index + 1}</span>
                  
                  {/* Door handle */}
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-[#FCD34D] rounded-sm"></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Instructions overlay when not started */}
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090B13]/80 backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-white mb-6">The Third Floor</h1>
          <p className="text-xl text-gray-300 max-w-md text-center mb-8">
            Choose carefully among the 30 doors. One of them is fake and will end your game!
          </p>
        </div>
      )}
    </div>
  );
};

export default GameScene;
