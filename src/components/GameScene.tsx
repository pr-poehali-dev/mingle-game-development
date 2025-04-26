
import { FC, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GameSceneProps {
  playerPosition: number;
  gameStarted: boolean;
  gameOver: boolean;
}

const GameScene: FC<GameSceneProps> = ({ playerPosition, gameStarted, gameOver }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  
  // Характеристики NPC игроков
  const npcs = [
    { id: 1, position: 0, speed: 1.2 },
    { id: 2, position: 2, speed: 0.8 },
    { id: 3, position: 3, speed: 1.5 },
    { id: 4, position: 4, speed: 0.9 },
    { id: 5, position: 5, speed: 1.1 },
  ];
  
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      // Анимация перемещения NPC
      const npcsElements = document.querySelectorAll('.npc');
      npcsElements.forEach((npc) => {
        const randomMove = Math.floor(Math.random() * 6);
        npc.setAttribute('data-position', randomMove.toString());
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  return (
    <div 
      ref={sceneRef}
      className={cn(
        "relative w-full h-full bg-gradient-to-b from-[#121729] to-[#090B13] perspective-1000 overflow-hidden",
        gameOver && "opacity-50 transition-opacity duration-500"
      )}
    >
      {/* 3D пол с сеткой */}
      <div className="absolute bottom-0 left-0 w-full h-[80%] bg-[url('https://images.unsplash.com/photo-1595113316349-9fa4eb10f6b7?q=80&w=2000')] bg-cover bg-center origin-bottom transform-style-3d rotate-x-[70deg] scale-y-[2] opacity-40">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-[#E5173F]/30"></div>
          ))}
        </div>
      </div>
      
      {/* Круглая арена */}
      <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 w-[80vw] h-[40vh] max-w-4xl rounded-full border-4 border-[#E5173F] opacity-60 blur-[1px]"></div>
      
      {/* Позиции для игроков */}
      <div className="absolute bottom-[25%] left-0 w-full flex justify-around">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "w-24 h-24 rounded-full border-2 border-dashed border-white/50",
              playerPosition === i && "border-[#E5173F] border-solid bg-[#E5173F]/20"
            )}
          ></div>
        ))}
      </div>
      
      {/* Персонаж игрока */}
      <div 
        className={cn(
          "absolute bottom-[28%] left-0 w-16 h-40 transition-all duration-300 ease-out transform-gpu z-10",
          `left-[calc(${(playerPosition / 5) * 85 + 7.5}%)]`
        )}
      >
        <div className="w-full h-full relative">
          <div className="absolute bottom-0 w-full h-3/4 bg-[#39FF14] rounded-lg shadow-[0_0_15px_rgba(57,255,20,0.6)]"></div>
          <div className="absolute bottom-[75%] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#39FF14] rounded-full shadow-[0_0_15px_rgba(57,255,20,0.6)]">
            <div className="absolute inset-2 bg-black rounded-full"></div>
          </div>
          <div className="absolute bottom-[30%] w-full text-center text-white text-xs font-bold">ВЫ</div>
        </div>
      </div>
      
      {/* NPC игроки */}
      {npcs.map((npc) => (
        <div 
          key={npc.id}
          className={cn(
            "npc absolute bottom-[28%] left-0 w-16 h-40 transition-all duration-300 ease-out transform-gpu",
            `left-[calc(${(npc.position / 5) * 85 + 7.5}%)]`
          )}
          data-position={npc.position}
          style={{ transitionDuration: `${0.3 / npc.speed}s` }}
        >
          <div className="w-full h-full relative">
            <div className="absolute bottom-0 w-full h-3/4 bg-[#E5173F] rounded-lg shadow-[0_0_15px_rgba(229,23,63,0.6)]"></div>
            <div className="absolute bottom-[75%] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#E5173F] rounded-full shadow-[0_0_15px_rgba(229,23,63,0.6)]">
              <div className="absolute inset-2 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Эффект освещения сверху */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[40%] bg-[#E5173F]/20 blur-[50px] rounded-full"></div>
      
      {/* Передний план - стражники */}
      <div className="absolute bottom-0 left-0 w-full h-[20%] flex justify-between px-10">
        <div className="w-20 h-full bg-[url('https://images.unsplash.com/photo-1590095893307-2b2b10cb7e3b?q=80&w=500')] bg-cover bg-top opacity-70"></div>
        <div className="w-20 h-full bg-[url('https://images.unsplash.com/photo-1590095893307-2b2b10cb7e3b?q=80&w=500')] bg-cover bg-top opacity-70 transform scale-x-[-1]"></div>
      </div>
    </div>
  );
};

export default GameScene;
