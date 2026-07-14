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
        className="w-[75%] h-[75%] max-w-[75vw] max-h-[75dvh] object-contain"
      />
    </div>
  );
};

export default LandingPage;
