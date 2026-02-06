import React, { useState } from 'react';
import { AppState } from '../types';
import { submitGuessToSupabase } from '../services/supabaseService';
import { Loader2, Terminal } from 'lucide-react';

interface GuessFormProps {
  setAppState: (state: AppState) => void;
}

const GuessForm: React.FC<GuessFormProps> = ({ setAppState }) => {
  const [email, setEmail] = useState('');
  const [guess, setGuess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !guess) return;

    setLoading(true);

    try {
      await submitGuessToSupabase({
        email,
        guess,
        timestamp: Date.now()
      });
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      alert("SYSTEM ERROR: TRANSMISSION FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6 relative z-20 backdrop-blur-sm bg-black/40 p-8 border border-green-500/30 rounded-lg shadow-[0_0_30px_rgba(0,255,0,0.1)]">
      <div className="flex items-center space-x-2 text-[#00FF00] mb-4 border-b border-[#00FF00]/30 pb-2">
        <Terminal size={20} />
        <span className="font-mono text-sm tracking-widest">RESPONSE BOX</span>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs font-mono text-[#00FFFF] tracking-wider uppercase">
          Agent Identity (Email)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black/60 border-b-2 border-[#333] focus:border-[#00FF00] text-[#00FF00] font-mono py-3 px-4 outline-none transition-colors duration-300 placeholder-green-900/50"
          placeholder="hacker@tedx.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="guess" className="block text-xs font-mono text-[#FF00FF] tracking-wider uppercase">
          Decrypted Theme Code
        </label>
        <input
          id="guess"
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-full bg-black/60 border-b-2 border-[#333] focus:border-[#FF00FF] text-[#FF00FF] font-mono py-3 px-4 outline-none transition-colors duration-300 placeholder-purple-900/50"
          placeholder="ENTER_THEME_GUESS"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full group relative overflow-hidden bg-transparent border border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:text-black font-bold font-['Orbitron'] py-4 px-6 mt-8 transition-all duration-300 uppercase tracking-widest"
      >
        <span className="relative z-10 flex items-center justify-center">
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> 
              UPLOADING...
            </>
          ) : (
            "TRANSMIT DATA"
          )}
        </span>
        {/* Neon Glow Effect on Button */}
        <div className="absolute inset-0 bg-[#00FF00] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
      </button>
    </form>
  );
};

export default GuessForm;