import React, { useEffect, useRef } from 'react';

const BackgroundSystem: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force video to play
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play prevented, but video is ready");
        });
      }
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
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          controls={false}
          preload="auto"
          poster="/IMAGE/WhatsApp%20Image%202026-02-06%20at%202.40.42%20PM.jpeg"
        >
          {/* Main video path - no spaces */}
          <source src="/sam-video/Crazy_Photo_Animation_for_Website.mp4" type="video/mp4" />
          <source src="./sam-video/Crazy_Photo_Animation_for_Website.mp4" type="video/mp4" />
          
          {/* Fallback paths with spaces (if needed) */}
          <source src="/sam%20vedio/Crazy_Photo_Animation_for_Website.mp4" type="video/mp4" />
          <source src="/sam vedio/Crazy_Photo_Animation_for_Website.mp4" type="video/mp4" />
          
          {/* Fallback message */}
          Your browser does not support the video tag.
        </video>
        
        {/* Fallback image if video fails */}
        <div 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{
            backgroundImage: "url('/IMAGE/WhatsApp%20Image%202026-02-06%20at%202.40.42%20PM.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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