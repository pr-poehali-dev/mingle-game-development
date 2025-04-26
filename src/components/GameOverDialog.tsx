
import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GameOverDialogProps {
  open: boolean;
  score: number;
  onRestart: () => void;
  onExit: () => void;
}

const GameOverDialog: FC<GameOverDialogProps> = ({ open, score, onRestart, onExit }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md bg-[#121729] border-[#E5173F] text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center text-[#E5173F]">Игра окончена!</DialogTitle>
          <DialogDescription className="text-center text-gray-300 text-lg">
            Вы стали третьим лишним
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-32 h-32 rounded-full bg-[#111827] border-4 border-[#E5173F] flex items-center justify-center mb-4">
            <span className="text-4xl font-bold">{score}</span>
          </div>
          <p className="text-xl text-gray-300">Ваш результат</p>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="outline" 
            onClick={onExit}
            className="w-full sm:w-auto border-[#E5173F] text-[#E5173F] hover:bg-[#E5173F] hover:text-white"
          >
            Выйти
          </Button>
          <Button 
            onClick={onRestart}
            className="w-full sm:w-auto bg-[#E5173F] hover:bg-[#C01435] text-white"
          >
            Играть снова
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverDialog;
