
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "react-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#121729] to-[#090B13] overflow-hidden relative">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-40 h-40 rounded-full bg-[#E5173F]/20 blur-[80px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-60 h-60 rounded-full bg-[#E5173F]/10 blur-[100px]"></div>
        <div className="absolute top-[40%] right-[20%] w-20 h-20 rounded-full bg-[#E5173F]/30 blur-[50px]"></div>
      </div>
      
      {/* Треугольник из игры в кальмара на фоне */}
      <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 opacity-10 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 100 100">
          <circle cx="50" cy="20" r="10" fill="#E5173F" />
          <circle cx="20" cy="70" r="10" fill="#E5173F" />
          <circle cx="80" cy="70" r="10" fill="#E5173F" />
          <line x1="50" y1="20" x2="20" y2="70" stroke="#E5173F" strokeWidth="2" />
          <line x1="50" y1="20" x2="80" y2="70" stroke="#E5173F" strokeWidth="2" />
          <line x1="20" y1="70" x2="80" y2="70" stroke="#E5173F" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="relative z-10 text-center max-w-2xl px-4">
        <h1 className="text-6xl font-bold text-white mb-4">
          Третий <span className="text-[#E5173F]">лишний</span>
        </h1>
        <h2 className="text-2xl text-gray-300 mb-12">
          Игра из сериала "Игра в кальмара"
        </h2>
        
        <div className="relative w-full h-64 mb-12">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635491312649-98c91d18ed45?q=80&w=1200')] bg-cover bg-center rounded-xl opacity-70 shadow-[0_0_30px_rgba(229,23,63,0.3)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#090B13] to-transparent"></div>
          
          <div className="absolute bottom-6 left-0 w-full flex justify-center">
            <div className="bg-[#111827]/80 backdrop-blur-sm rounded-lg px-6 py-3 text-white max-w-md">
              <p className="text-sm">
                Избегайте быть третьим лишним! Быстро займите свою позицию и не попадитесь охранникам. 
                Теперь в потрясающем 3D с реалистичной графикой!
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          className="bg-[#E5173F] hover:bg-[#C01435] text-white text-xl py-8 px-12 rounded-xl shadow-[0_0_30px_rgba(229,23,63,0.3)] hover:shadow-[0_0_50px_rgba(229,23,63,0.5)] transition-all"
          onClick={() => navigate("/game")}
        >
          Начать игру
        </Button>
        
        <p className="mt-6 text-gray-500 text-sm">
          На основе популярной игры из сериала "Игра в кальмара" | 2025
        </p>
      </div>
    </div>
  );
};

export default Index;
