import React, { useState, useEffect } from "react";

const MarqueeProposal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sentences = [
    "నువ్వే నా సూర్యకాంతివి ☀️",
    "నీతో ప్రతి క్షణం ఒక మాయాజాలం ✨",
    "నా ప్రేమ నీతోనే మొదలై నీతోనే ముగుస్తుంది",
    "నా గుండె వేగంగా కొట్టుకోవడానికి కారణం నువ్వే 💓",
    "నువ్వుంటే జీవితం సంపూర్ణం అనిపిస్తుంది",
    "నువ్వు లేని భవిష్యత్తును ఊహించలేను",
    "చీకటి రోజుల్లో నువ్వే నా వెలుగు",
    "నువ్వుంటే ప్రతి రోజూ ఒక వరం",
    "నా మనసులో ఖాళీని నింపింది నువ్వే",
    "మామూలు క్షణాలను నువ్వు అద్భుతంగా మారుస్తావు",
    "నా ప్రపంచాన్ని నువ్వే ప్రకాశవంతం చేస్తావు",
    "నువ్వే నా తీపి కల 💭",
    "నువ్వు ఎప్పటికీ నా లడ్డూగా ఉంటావా? 💍",
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
            fontFamily: "'Baloo Tammudu 2', system-ui, sans-serif",
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
