import { useBookStore } from "../../store/useBookStore";

export const UIOverlay = () => {
  const { currentPage, goToPage } = useBookStore();
  
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4 bg-black/20 backdrop-blur-md p-4 rounded-full border border-white/10 px-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <button
          key={i}
          className={`w-10 h-10 rounded-full transition-all flex items-center justify-center font-medium border ${
            currentPage === i 
              ? "bg-[#aa3bff] text-white border-[#aa3bff] shadow-[0_0_15px_rgba(170,59,255,0.5)] scale-110" 
              : "bg-white/10 hover:bg-white/30 text-white border-white/10"
          }`}
          onClick={() => goToPage(i)}
        >
          {i === 0 ? "C" : i}
        </button>
      ))}
    </div>
  );
};
