import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { AppState, Hint } from './types';
import { HINTS } from './constants';
import MatrixRain from './components/MatrixRain';
import GlitchText from './components/GlitchText';
import GuessForm from './components/GuessForm';
import BackgroundSystem from './components/BackgroundSystem';
import { CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [activeHints, setActiveHints] = useState<Hint[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintsContainerRef = useRef<HTMLDivElement>(null);

  // Initial Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Entrance
      gsap.from(titleRef.current, {
        duration: 2.5,
        opacity: 0,
        y: 50,
        ease: "power3.out",
        delay: 0.5,
        onComplete: () => {
          setAppState(AppState.HINTS);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Hint Sequence Logic
  useEffect(() => {
    if (appState === AppState.HINTS) {
      let timeouts: ReturnType<typeof setTimeout>[] = [];

      HINTS.forEach((hint, index) => {
        const timeout = setTimeout(() => {
          setActiveHints(prev => [...prev, hint]);
          
          // If last hint, wait then show form
          if (index === HINTS.length - 1) {
            // Reverted to shorter delay (3.5s) for standard hints
            setTimeout(() => {
              setAppState(AppState.FORM);
            }, 3500);
          }
        }, hint.delay);
        timeouts.push(timeout);
      });

      return () => timeouts.forEach(clearTimeout);
    }
  }, [appState]);

  // Success State Particle Burst Simulation (via CSS/DOM)
  useEffect(() => {
    if (appState === AppState.SUCCESS) {
      // Simple celebration effect can be added here
      gsap.to(".success-container", {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });
    }
  }, [appState]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* BACKGROUND SYSTEM (VEO) */}
      <BackgroundSystem />

      {/* MATRIX RAIN LAYER */}
      <MatrixRain />

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center space-y-12">
        
        {/* TITLE */}
        <div ref={titleRef} className="text-center space-y-4">
          <GlitchText 
            as="h1" 
            text="TEDx THEME HUNT" 
            className="text-5xl md:text-8xl font-black text-white font-['Orbitron'] tracking-tighter"
          />
        </div>

        {/* HINTS SECTION */}
        {(appState === AppState.HINTS || appState === AppState.FORM || appState === AppState.SUCCESS) && (
          <div ref={hintsContainerRef} className="w-full space-y-4 px-4">
            {activeHints.map((hint) => (
              <div 
                key={hint.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-black/50 border-l-4 border-[#FF00FF] p-6 backdrop-blur-md shadow-[0_0_15px_rgba(255,0,255,0.1)]"
              >
                <div className="text-[10px] text-[#FF00FF] font-bold mb-2 font-mono">
                  HINT
                </div>
                <div className="text-gray-200 font-mono md:text-xl typewriter whitespace-pre-line leading-relaxed">
                  {`> ${hint.text}`}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FORM SECTION */}
        {appState === AppState.FORM && (
          <div className="w-full animate-in fade-in zoom-in duration-500 delay-200">
             <GuessForm setAppState={setAppState} />
          </div>
        )}

        {/* SUCCESS SECTION */}
        {appState === AppState.SUCCESS && (
          <div className="success-container text-center animate-in zoom-in spin-in-1 duration-500 bg-black/80 p-12 border-2 border-[#00FF00] rounded-xl shadow-[0_0_50px_#00FF00]"
          >
            <CheckCircle2 size={80} className="mx-auto text-[#00FF00] mb-6 drop-shadow-[0_0_10px_#00FF00]" />
            <h2 className="text-4xl md:text-6xl font-['Orbitron'] text-white mb-4">
              GUESS LOGGED
            </h2>
            <p className="text-[#00FFFF] font-mono text-xl">
              Greetings from TEDx.
            </p>
            <div className="mt-8 text-xs text-gray-500 font-mono">
              HASH: {Math.random().toString(36).substring(2).toUpperCase()}
            </div>
          </div>
        )}

      </div>
      
      {/* FOOTER */}
      <div className="fixed bottom-4 left-0 w-full text-center pointer-events-none">
        <p className="text-[10px] text-gray-600 font-mono">
          TEDx SYSTEM v4.2.0 // UNAUTHORIZED ACCESS PROHIBITED
        </p>
      </div>
    </div>
  );
};

export default App;