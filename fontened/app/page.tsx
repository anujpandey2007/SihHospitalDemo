"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  useEffect(() => {
    // Attempt to autoplay immediately on load
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        // Browser blocked autoplay, requires user interaction
        console.log("Autoplay blocked by browser. Waiting for user interaction.");
      });
    }
  }, []);

  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center p-24 relative cursor-pointer"
      onClick={handlePlay}
    >
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50 text-white">
          <h2 className="text-4xl font-bold animate-pulse">Click anywhere to enter</h2>
        </div>
      )}
      
      <h1 className="text-4xl font-bold">KAAM KAR LO CHUTIYO</h1>
      
      <audio ref={audioRef} src="/videoplayback.weba" loop className="hidden" />
    </div>
  );
}
