import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "", as = 'div' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const Component = as as any;

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Random glitch effect loop
    const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    
    glitchTimeline.to(textRef.current, {
      skewX: 20,
      x: -5,
      duration: 0.1,
      opacity: 0.8,
      color: '#00FFFF', // Cyan
      textShadow: '2px 0 #FF1493, -2px 0 #00CED1',
      ease: "power4.inOut"
    })
    .to(textRef.current, {
      skewX: -20,
      x: 5,
      duration: 0.05,
      opacity: 1,
      color: '#FFFFFF',
      textShadow: 'none',
      ease: "power4.inOut"
    })
    .to(textRef.current, {
      skewX: 0,
      x: 0,
      duration: 0.05
    });

    // Hover effect (intensive glitch)
    const onEnter = () => {
      gsap.to(textRef.current, {
        textShadow: "4px 0 #FF1493, -4px 0 #00CED1",
        x: () => Math.random() * 10 - 5,
        y: () => Math.random() * 10 - 5,
        duration: 0.1,
        repeat: -1,
        yoyo: true
      });
    };

    const onLeave = () => {
      gsap.to(textRef.current, {
        textShadow: "none",
        x: 0,
        y: 0,
        duration: 0.2,
        overwrite: true
      });
      // Restart the subtle idle glitch
      glitchTimeline.play();
    };

    const el = containerRef.current;
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      glitchTimeline.kill();
    };
  }, []);

  return (
    <Component ref={containerRef} className={`relative inline-block cursor-default ${className}`}>
      <span ref={textRef} className="relative z-10 block">
        {text}
      </span>
    </Component>
  );
};

export default GlitchText;