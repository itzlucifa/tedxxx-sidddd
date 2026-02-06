import React, { useEffect, useRef, useState } from 'react';

const BackgroundSystem: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Multiple attempts to play video
      const attemptPlay = async () => {
        try {
          await video.play();
          setVideoLoaded(true);
        } catch (error) {
          console.log("Video autoplay prevented, trying again...");
          setTimeout(attemptPlay, 1000);
        }
      };

      // Set up video event listeners
      video.addEventListener('canplay', attemptPlay);
      video.addEventListener('loadeddata', () => {
        console.log("Video loaded successfully");
      });
      video.addEventListener('error', (e) => {
        console.error("Video error:", e);
      });

      return () => {
        video.removeEventListener('canplay', attemptPlay);
      };
    }
  }, []);

  return (
    <>
      {/* Video Background */}
      <div className="fixed inset-0 z-[-1] bg-black">
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
          {/* Try multiple video paths for Netlify compatibility */}
          <source src="/sam-video/Crazy_Photo_Animation_for_Website.mp4" type="video/mp4" />
          <source src="./sam-video/Crazy_Photo_Animation_for_Website.mp4" type="video/mp4" />
          <source src="/sam-video/Crazy_Photo_Animation_for_Website.mp4?cache=1" type="video/mp4" />
          
          {/* Fallback message */}
          Your browser does not support the video tag.
        </video>
        
        {/* Fallback animated background if video fails */}
        <div 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-70'}`}
          style={{
            backgroundImage: "url('/IMAGE/WhatsApp%20Image%202026-02-06%20at%202.40.42%20PM.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'subtleMove 15s ease-in-out infinite, zoomPulse 8s ease-in-out infinite'
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