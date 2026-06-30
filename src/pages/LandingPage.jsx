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
    <div className="relative w-screen h-screen bg-[#f3f3f3] overflow-hidden">
      <video
        ref={videoRef}
        src="/landingvideo.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default LandingPage;
