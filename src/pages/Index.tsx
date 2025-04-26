
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#121729] to-[#090B13] overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-40 h-40 rounded-full bg-[#3B82F6]/20 blur-[80px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-60 h-60 rounded-full bg-[#3B82F6]/10 blur-[100px]"></div>
        <div className="absolute top-[40%] right-[20%] w-20 h-20 rounded-full bg-[#3B82F6]/30 blur-[50px]"></div>
      </div>
      
      {/* Building silhouette in the background */}
      <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 opacity-10 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 100 100">
          <rect x="20" y="10" width="60" height="80" fill="#3B82F6" />
          <rect x="30" y="30" width="10" height="15" fill="#000" />
          <rect x="60" y="30" width="10" height="15" fill="#000" />
          <rect x="45" y="60" width="10" height="20" fill="#000" />
        </svg>
      </div>
      
      <div className="relative z-10 text-center max-w-2xl px-4">
        <h1 className="text-6xl font-bold text-white mb-4">
          The Third <span className="text-[#3B82F6]">Floor</span>
        </h1>
        <h2 className="text-2xl text-gray-300 mb-12">
          Can you find the real doors?
        </h2>
        
        <div className="relative w-full h-64 mb-12">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621972350187-d9ae8439665a?q=80&w=1200')] bg-cover bg-center rounded-xl opacity-70 shadow-[0_0_30px_rgba(59,130,246,0.3)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#090B13] to-transparent"></div>
          
          <div className="absolute bottom-6 left-0 w-full flex justify-center">
            <div className="bg-[#111827]/80 backdrop-blur-sm rounded-lg px-6 py-3 text-white max-w-md">
              <p className="text-sm">
                Avoid the fake door! Navigate through 30 doors on the mysterious third floor 
                and choose wisely - one wrong choice could be your last.
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xl py-8 px-12 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all"
          onClick={() => navigate("/game")}
        >
          Start Game
        </Button>
        
        <p className="mt-6 text-gray-500 text-sm">
          A game of doors and deception | 2025
        </p>
      </div>
    </div>
  );
};

export default Index;
