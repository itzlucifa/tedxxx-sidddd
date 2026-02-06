import React from 'react';

const BackgroundSystem: React.FC = () => {
  return (
    <>
      {/* Video Background */}
      <div className="fixed inset-0 z-[-1] bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="/sam vedio/Crazy_Photo_Animation_for_Website.mp4" type="video/mp4" />
          {/* Fallback message if video doesn't load */}
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>
    </>
  );
};

export default BackgroundSystem;