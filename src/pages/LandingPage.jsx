import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Fallback: navigate after 5s in case video doesn't fire 'ended'
    const timer = setTimeout(() => {
      navigate("/home");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);
 
  const handleEnded = () => {
    navigate("/home");
  };

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] bg-[#f3f3f3] overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        src="/landingvideo.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="w-full h-full max-w-full max-h-full object-contain md:absolute md:inset-0 md:object-cover"
      />
    </div>
  );
};

export default LandingPage;
