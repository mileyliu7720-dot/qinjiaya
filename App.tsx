import React, { useState } from 'react';
import { EmojiFace } from './components/EmojiFace';
import { Mood } from './types';

const App: React.FC = () => {
  const [mood, setMood] = useState<Mood>('neutral');
  const [rejectCount, setRejectCount] = useState<number>(0);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const handleRejectHover = () => setMood('sad');
  const handleAgreeHover = () => setMood('happy');
  const handleResetMood = () => setMood('neutral');

  const handleRejectClick = () => {
    setRejectCount((prev) => prev + 1);
  };

  const handleAgreeClick = () => {
    setIsAccepted(true);
  };

  // Font Size Mappings based on Chinese "Hao" system approx values
  // Size 3 (三号) ≈ 22px
  // Size 4 (四号) ≈ 18px
  // Size 5 (五号) ≈ 14px
  
  // Calculate scale for the Agree button based on reject clicks
  // We use a logarithmic or linear scale to make it grow noticeably but usable
  const agreeScale = 1 + rejectCount * 0.5;

  if (isAccepted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50 font-song">
        <div className="text-center p-8 animate-fade-in">
          <p className="text-[22px] font-bold text-green-800 leading-loose">
            感谢导员的辛苦付出，祝导员永远18：）
          </p>
          <div className="mt-8 flex justify-center">
             <EmojiFace mood="happy" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfbf7] font-song relative overflow-hidden p-4">
      
      {/* Titles */}
      <div className="flex flex-col items-center mb-10 z-10 text-center">
        <h1 className="text-[18px] font-bold text-gray-800 mb-4 tracking-wider">
          脆皮大学生向你发送了请假条
        </h1>
        <h2 className="text-[14px] text-gray-600">
          希望导员能够批假，是否接受？
        </h2>
      </div>

      {/* Emoji Centerpiece */}
      <div className="z-10 mb-20">
        <EmojiFace mood={mood} />
      </div>

      {/* Buttons Area */}
      {/* We use a fixed width container to position buttons relative to the center, 
          but allow the Agree button to break out of layout if it gets huge */}
      <div className="w-full max-w-md flex justify-between px-8 relative h-20 items-center">
        
        {/* Agree Button (Left Bottom relative to emoji concept, effectively left side of container) */}
        {/* We use absolute positioning style transform to prevent layout shift jumping */}
        <div 
            style={{ 
                transform: `scale(${agreeScale})`,
                transformOrigin: 'center center',
            }}
            className="transition-transform duration-200 ease-out z-20"
        >
            <button
            onMouseEnter={handleAgreeHover}
            onMouseLeave={handleResetMood}
            onClick={handleAgreeClick}
            className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-6 py-2 shadow-lg transition-colors duration-200 whitespace-nowrap"
            style={{ fontSize: '18px' }} // Size 4
            >
            同意
            </button>
        </div>

        {/* Reject Button (Right Bottom) */}
        <div className="z-20">
            <button
            onMouseEnter={handleRejectHover}
            onMouseLeave={handleResetMood}
            onClick={handleRejectClick}
            className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-6 py-2 shadow-lg transition-colors duration-200"
            style={{ fontSize: '18px' }} // Size 4
            >
            拒绝
            </button>
        </div>
      </div>

      {/* Decorative Background Elements (Optional, to fill space) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 z-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-100 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-50 rounded-full blur-xl"></div>
      </div>

    </div>
  );
};

export default App;