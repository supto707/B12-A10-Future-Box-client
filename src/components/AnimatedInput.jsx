const AnimatedInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="glow-effect absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[354px] h-[130px] rounded-xl overflow-hidden opacity-40 blur-[30px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[999px] h-[999px] animate-spin-slow" style={{ backgroundImage: 'conic-gradient(#000, #ea580c 5%, #000 38%, #000 50%, #dc2626 60%, #000 87%)', animationDuration: '4s' }}></div>
        </div>
        
        <div className="dark-border-bg absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[312px] h-[65px] rounded-xl overflow-hidden blur-[3px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rotate-[82deg] transition-transform duration-[2s] hover:rotate-[-98deg]" style={{ backgroundImage: 'conic-gradient(rgba(0, 0, 0, 0), #7c2d12, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 50%, #7f1d1d, rgba(0, 0, 0, 0) 60%)' }}></div>
        </div>
        
        <div className="white-border absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[307px] h-[63px] rounded-[10px] overflow-hidden blur-[2px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rotate-[83deg] brightness-[1.4] transition-transform duration-[2s] hover:rotate-[-97deg]" style={{ backgroundImage: 'conic-gradient(rgba(0, 0, 0, 0) 0%, #fb923c, rgba(0, 0, 0, 0) 8%, rgba(0, 0, 0, 0) 50%, #f87171, rgba(0, 0, 0, 0) 58%)' }}></div>
        </div>
        
        <div className="border-effect absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] h-[59px] rounded-[11px] overflow-hidden blur-[0.5px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rotate-[70deg] brightness-[1.3] transition-transform duration-[2s] hover:rotate-[-110deg]" style={{ backgroundImage: 'conic-gradient(#1c191c, #ea580c 5%, #1c191c 14%, #1c191c 50%, #dc2626 60%, #1c191c 64%)' }}></div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="peer w-[301px] h-[56px] bg-[#010201] border-none rounded-[10px] text-white px-[59px] text-lg focus:outline-none placeholder:text-[#c0b9c0]"
          />
          
          <div className="pointer-events-none absolute top-[18px] left-[70px] w-[100px] h-[20px] bg-gradient-to-r from-transparent to-black peer-focus:hidden"></div>
          
          <div className="pointer-events-none absolute top-[10px] left-[5px] w-[30px] h-[20px] bg-orange-500 blur-[20px] opacity-80 transition-opacity duration-[2s] hover:opacity-0"></div>
          
          <div className="absolute left-5 top-[15px]">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" height={24} fill="none">
              <circle stroke="url(#search)" r={8} cy={11} cx={11} />
              <line stroke="url(#searchl)" y2="16.65" y1={22} x2="16.65" x1={22} />
              <defs>
                <linearGradient gradientTransform="rotate(50)" id="search">
                  <stop stopColor="#fed7aa" offset="0%" />
                  <stop stopColor="#fb923c" offset="50%" />
                </linearGradient>
                <linearGradient id="searchl">
                  <stop stopColor="#fb923c" offset="0%" />
                  <stop stopColor="#ea580c" offset="50%" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedInput;
