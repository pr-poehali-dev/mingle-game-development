
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface GameControlsProps {
  onNewGame: () => void;
  remainingDoors: number;
  score: number;
}

const GameControls: FC<GameControlsProps> = ({ onNewGame, remainingDoors, score }) => {
  return (
    <div className="flex justify-between items-center gap-8 mt-6">
      <div className="flex gap-4">
        <div className="bg-[#111827]/80 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
          <span className="text-[#3B82F6] font-bold">Score:</span> {score}
        </div>
        <div className="bg-[#111827]/80 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
          <span className="text-[#3B82F6] font-bold">Doors:</span> {remainingDoors} left
        </div>
      </div>
      
      <Button
        onClick={onNewGame}
        className="bg-[#111827]/80 hover:bg-[#3B82F6] text-white px-4 py-2 rounded-lg border border-[#3B82F6]/50 hover:border-[#3B82F6] transition-all"
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        New Game
      </Button>
    </div>
  );
};

export default GameControls;
