import React, { useState, useEffect } from 'react';

const ProposalWebsite = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ left: null, top: null });
  const [hearts, setHearts] = useState([]);

  const moveButton = () => {
    // Calculate random position within viewport
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    
    // Keep the button within the visible area
    const safeX = Math.min(Math.max(x, 50), window.innerWidth - 150);
    const safeY = Math.min(Math.max(y, 50), window.innerHeight - 80);
    
    setNoButtonPosition({ left: safeX, top: safeY });
  };

  const celebration = () => {
    setShowCelebration(true);
    createHearts();
  };

  const createHearts = () => {
    const newHearts = [];
    for (let i = 0; i < 50; i++) {
      const delay = i * 100;
      const duration = Math.random() * 3 + 2;
      const size = Math.random() * 20 + 10;
      const startPosition = Math.random() * 100;
      const hue = Math.random() * 60 + 330;
      const opacity = Math.random() * 0.5 + 0.5;
      const rotation = Math.random() * 360;
      
      newHearts.push({
        id: i,
        delay,
        duration,
        size,
        startPosition,
        hue,
        opacity,
        rotation
      });
    }
    
    setHearts(newHearts);
  };

  // Clean up hearts after animation
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts([]);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 overflow-hidden">
      {/* Main container */}
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-11/12 text-center relative">
        <h1 className="text-2xl font-bold text-pink-500 mb-4">Will You Be Mine?</h1>
        <img 
          src="love.jpg" 
          alt="Couple photo placeholder" 
          className="w-4/5 mx-auto rounded-lg shadow-md border-4 border-pink-200 mb-4"
        />
        <p className="text-gray-700 text-lg mb-8">I've been wanting to ask you something special...</p>
        
        <div className="flex justify-around mt-8">
          <button 
            className="bg-green-500 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-transform"
            onClick={celebration}
          >
            Yes
          </button>
          
          <button 
            className="bg-red-500 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-md"
            onMouseOver={moveButton}
            style={noButtonPosition.left ? {
              position: 'fixed',
              left: `${noButtonPosition.left}px`,
              top: `${noButtonPosition.top}px`
            } : {}}
          >
            No
          </button>
        </div>
      </div>
      
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
          <div className="text-8xl animate-pulse text-pink-500">❤️</div>
          <div className="text-3xl font-bold text-pink-500 mt-4">Yaay! I love you too!</div>
          <img 
            src="love.jpg" 
            alt="Happy couple" 
            className="mt-8 max-w-xs rounded-lg shadow-md"
          />
        </div>
      )}
      
      {/* Falling hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed z-50"
          style={{
            fontSize: `${heart.size}px`,
            left: `${heart.startPosition}vw`,
            top: '-20px',
            opacity: heart.opacity,
            color: `hsl(${heart.hue}, 100%, 65%)`,
            animation: `fall ${heart.duration}s linear forwards ${heart.delay}ms`
          }}
        >
          ❤️
        </div>
      ))}
      
      <style jsx global>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
          }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }
        .animate-pulse {
          animation: pulse 1s infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default ProposalWebsite;
