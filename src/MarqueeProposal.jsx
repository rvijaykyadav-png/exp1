import React, { useState, useEffect } from "react";

const MarqueeProposal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sentences = [
    "You're my sunshine ☀️",
    "Every moment with you is magic ✨",
    "My love begins and ends with you",
    "You're the reason my heart beats faster 💓",
    "Life feels complete when you're around",
    "I can't imagine a future without you",
    "You're my light on the darkest days",
    "With you, every day is a blessing",
    "You're the one who filled the emptiness in my heart",
    "You make ordinary moments extraordinary",
    "You make my world brighter",
    "You're my sweetest dream 💭",
    "Will you be my laddu forever? 💍",
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
