
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface GameControlsProps {
  onMove: (position: number) => void;
}

const GameControls: FC<GameControlsProps> = ({ onMove }) => {
  return (
    <div className="flex justify-center items-center gap-8 mt-6">
      <div className="grid grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Button
            key={i}
            onClick={() => onMove(i)}
            className="w-16 h-16 bg-[#111827]/80 hover:bg-[#E5173F] text-white text-xl rounded-xl border-2 border-[#E5173F]/50 hover:border-[#E5173F] shadow-[0_0_15px_rgba(229,23,63,0.3)] hover:shadow-[0_0_20px_rgba(229,23,63,0.5)] transition-all"
          >
            {i + 1}
          </Button>
        ))}
      </div>
      
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="w-16 h-16 rounded-full bg-[#111827]/80 border-2 border-[#E5173F]/50 hover:border-[#E5173F] text-white"
          onClick={() => onMove(Math.floor(Math.random() * 6))}
        >
          <ArrowLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          className="w-16 h-16 rounded-full bg-[#111827]/80 border-2 border-[#E5173F]/50 hover:border-[#E5173F] text-white"
          onClick={() => onMove(Math.floor(Math.random() * 6))}
        >
          <ArrowRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
