import React, { useState, useEffect } from "react";

const MarqueeProposal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sentences = [
    "Nuvvu naa sunshine, no cap ☀️",
    "Every second with you is chala magic ✨",
    "Naa prema starts and ends with nuvvu",
    "Nuvvu the reason naa heart beats faster 💓",
    "Life feels complete tho nuvvu around",
    "Can't imagine naa future without nuvvu",
    "Nuvvu naa sunshine on the darkest days",
    "With nuvvu, every day feels chala bagundi",
    "Nuvvu the missing piece in naa manasu",
    "Nuvvu make ordinary moments feel adirindi",
    "Nuvvu make naa world brighter, bangaram",
    "Nuvvu the dream I never want to wake up from",
    "Will nuvvu be naa laddu forever? 💍",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 9000); // Change sentence every 9 seconds
    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        margin: "36px auto 8px",
        borderRadius: "999px",
        overflow: "hidden",
        position: "relative",
        background: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        border: "2px solid rgba(255, 176, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          position: "absolute",
          animation: "marquee 10s linear infinite",
        }}
        key={currentIndex}
      >
        <span
          style={{
            fontSize: "1.5rem",
            fontFamily: "'Baloo 2', system-ui, sans-serif",
            fontStyle: "normal",
            fontWeight: "700",
            background: "linear-gradient(90deg, #FFB100, #FF3CAC, #784BA0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {sentences[currentIndex]}
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%); /* Start fully off-screen to the right */
          }
          100% {
            transform: translateX(-100%); /* End fully off-screen to the left */
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeProposal;
