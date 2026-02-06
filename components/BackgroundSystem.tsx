import React, { useEffect, useRef, useState } from 'react';

const BackgroundSystem: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      let retryCount = 0;
      const maxRetries = 5;

      const attemptPlay = async () => {
        try {
          await video.play();
          setVideoLoaded(true);
          console.log("✅ Video playing successfully");
        } catch (error) {
          console.log(`❌ Video attempt ${retryCount + 1} failed:`, error);
          retryCount++;
          
          if (retryCount >= maxRetries) {
            console.log("🔄 Switching to animated background");
            setUseFallback(true);
            return;
          }
          
          setTimeout(attemptPlay, 2000);
        }
      };

      // Set up video event listeners
      video.addEventListener('loadeddata', () => {
        console.log("📹 Video data loaded");
        attemptPlay();
      });

      video.addEventListener('canplay', () => {
        console.log("🎬 Video can play");
      });

      video.addEventListener('error', (e) => {
        console.error("💥 Video error:", e);
        setUseFallback(true);
      });

      // Start loading
      video.load();

      return () => {
        video.removeEventListener('loadeddata', attemptPlay);
        video.removeEventListener('canplay', attemptPlay);
        video.removeEventListener('error', () => setUseFallback(true));
      };
    }
  }, []);

  return (
    <>
      {/* Video Background */}
      <div className="fixed inset-0 z-[-1] bg-black">
        {!useFallback ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-70' : 'opacity-0'}`}
            controls={false}
            preload="auto"
            poster="/IMAGE/WhatsApp%20Image%202026-02-06%20at%202.40.42%20PM.jpeg"
            crossOrigin="anonymous"
          >
            {/* Try multiple video sources */}
            <source src="/sam-video/Crazy_Photo_Animation_for_Website.mp4" type="video/mp4" />
            <source src="./sam-video/Crazy_Photo_Animation_for_Website.mp4" type="video/mp4" />
            <source src="/sam-video/Crazy_Photo_Animation_for_Website.mp4?v=1" type="video/mp4" />
            <source src="/sam-video/Crazy_Photo_Animation_for_Website.mp4?v=2" type="video/mp4" />
            
            {/* Fallback message */}
            Your browser does not support the video tag.
          </video>
        ) : null}
        
        {/* Fallback Animated Background */}
        <div 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: "url('/IMAGE/WhatsApp%20Image%202026-02-06%20at%202.40.42%20PM.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'subtleMove 15s ease-in-out infinite, zoomPulse 8s ease-in-out infinite, colorShift 12s linear infinite'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>
    </>
  );
};

export default BackgroundSystem;