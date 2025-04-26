
import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GameOverDialogProps {
  open: boolean;
  score: number;
  won: boolean;
  fakeDoorNumber: number;
  selectedDoorNumber: number | null;
  onRestart: () => void;
  onExit: () => void;
}

const GameOverDialog: FC<GameOverDialogProps> = ({
  open,
  score,
  won,
  fakeDoorNumber,
  selectedDoorNumber,
  onRestart,
  onExit,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="bg-[#121729] border border-[#3B82F6]/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {won ? 'Victory!' : 'Game Over'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {won 
              ? "Congratulations! You successfully avoided the fake door."
              : `You chose door #${selectedDoorNumber !== null ? selectedDoorNumber + 1 : '?'}, but door #${fakeDoorNumber + 1} was the fake one!`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-[#1E3A8A]/30 p-4 rounded-lg mb-4">
            <p className="text-lg">Final Score: <span className="font-bold text-[#3B82F6]">{score}</span></p>
            {won && (
              <p className="text-sm text-gray-400 mt-2">
                You successfully navigated the entire third floor!
              </p>
            )}
            {!won && (
              <p className="text-sm text-gray-400 mt-2">
                Better luck next time. The third floor is tricky.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            onClick={onRestart}
          >
            Play Again
          </Button>
          <Button 
            variant="outline" 
            className="border-[#3B82F6]/50 text-white hover:bg-[#3B82F6]/20"
            onClick={onExit}
          >
            Exit Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverDialog;
