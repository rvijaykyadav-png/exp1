import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

import MouseStealing from './MouseStealer.jsx';
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import WordMareque from './MarqueeProposal.jsx';
import purposerose from './assets/GifData/RoseCute.gif';
import swalbg from './assets/Lovingbg2_main.jpg';
import loveu from './assets/GifData/cutieSwal4.gif';

//! yes - Gifs Importing
import yesgif0 from "./assets/GifData/Yes/lovecutie0.gif";
import yesgif1 from "./assets/GifData/Yes/love2.gif";
import yesgif2 from "./assets/GifData/Yes/love3.gif";
import yesgif3 from "./assets/GifData/Yes/love1.gif";
import yesgif4 from "./assets/GifData/Yes/lovecutie1.gif";
import yesgif5 from "./assets/GifData/Yes/lovecutie5.gif";
import yesgif6 from "./assets/GifData/Yes/lovecutie7.gif";
import yesgif7 from "./assets/GifData/Yes/lovecutie8.gif";
import yesgif8 from "./assets/GifData/Yes/lovecutie3.gif";
import yesgif9 from "./assets/GifData/Yes/lovecutie9.gif";
import yesgif10 from "./assets/GifData/Yes/lovecutie6.gif";
import yesgif11 from "./assets/GifData/Yes/lovecutie4.gif";
//! no - Gifs Importing
import nogif0 from "./assets/GifData/No/breakRej0.gif";
import nogif0_1 from "./assets/GifData/No/breakRej0_1.gif";
import nogif1 from "./assets/GifData/No/breakRej1.gif";
import nogif2 from "./assets/GifData/No/breakRej2.gif";
import nogif3 from "./assets/GifData/No/breakRej3.gif";
import nogif4 from "./assets/GifData/No/breakRej4.gif";
import nogif5 from "./assets/GifData/No/breakRej5.gif";
import nogif6 from "./assets/GifData/No/breakRej6.gif";
import nogif7 from "./assets/GifData/No/RejectNo.gif";
import nogif8 from "./assets/GifData/No/breakRej7.gif";

//! yes - Music Importing
import yesmusic1 from "./assets/AudioTracks/Love_LoveMeLikeYouDo.mp3";
import yesmusic2 from "./assets/AudioTracks/Love_EDPerfect.mp3";
//! no - Music Importing
import withoutMe from "./assets/AudioTracks/Reject_withoutMe.mp3";

const YesGifs = [yesgif0, yesgif1, yesgif2, yesgif3, yesgif4, yesgif5, yesgif6, yesgif7, yesgif8, yesgif9, yesgif10, yesgif11];
const NoGifs = [nogif0, nogif0_1, nogif1, nogif2, nogif3, nogif4, nogif5, nogif6, nogif7, nogif8];
const YesMusic = [yesmusic1, yesmusic2];
const NoMusic = [withoutMe];

const fireConfetti = () => {
  confetti({
    particleCount: 140,
    spread: 90,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors: ["#FFB100", "#FF3CAC", "#784BA0", "#2B86C5"],
  });
};

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null); // Tracks the currently playing song
  const [currentGifIndex, setCurrentGifIndex] = useState(0); // Track the current gif index
  const [isMuted, setIsMuted] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [yespopupShown, setYesPopupShown] = useState(false);

  const gifRef = useRef(null); // Ref to ensure gif plays infinitely
  const yesButtonSize = noCount * 16 + 16;

  const [floatingGifs, setFloatingGifs] = useState([]); // Array to store active floating GIFs
  const generateRandomPositionWithSpacing = (existingPositions) => {
    let position;
    let tooClose;
    const minDistance = 15; // Minimum distance in 'vw' or 'vh'

    do {
      position = {
        top: `${Math.random() * 90}vh`, // Keep within 90% of viewport height
        left: `${Math.random() * 90}vw`, // Keep within 90% of viewport width
      };

      tooClose = existingPositions.some((p) => {
        const dx = Math.abs(parseFloat(p.left) - parseFloat(position.left));
        const dy = Math.abs(parseFloat(p.top) - parseFloat(position.top));
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
    } while (tooClose);

    return position;
  };

  const handleMouseEnterYes = () => {
    const gifs = [];
    const positions = [];

    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);

      gifs.push({
        id: `heart-${i}`,
        src: heartGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }

    setFloatingGifs(gifs);
  };

  const handleMouseEnterNo = () => {
    const gifs = [];
    const positions = [];

    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);

      gifs.push({
        id: `sad-${i}`,
        src: sadGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }

    setFloatingGifs(gifs);
  };

  const handleMouseLeave = () => {
    setFloatingGifs([]); // floating GIFs on mouse leave
  };

  // This ensures the "Yes" gif keeps restarting and playing infinitely
  useEffect(() => {
    if (gifRef.current && yesPressed && noCount > 3) {
      gifRef.current.src = YesGifs[currentGifIndex];
    }
  }, [yesPressed, currentGifIndex]);

  // Use effect to change the Yes gif every 5 seconds
  useEffect(() => {
    if (yesPressed && noCount > 3) {
      const intervalId = setInterval(() => {
        setCurrentGifIndex((prevIndex) => (prevIndex + 1) % YesGifs.length);
      }, 5000); // Change gif every 5 seconds

      // Clear the interval
      return () => clearInterval(intervalId);
    }
  }, [yesPressed]);

  useEffect(() => {
    if (gifRef.current) {
      gifRef.current.src = gifRef.current.src; // Reset gif to ensure it loops infinitely
    }
  }, [noCount]);

  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 4) {
      const nextGifIndex = (nextCount - 4) % NoGifs.length; // Start cycling through NoGifs
      if (gifRef.current) {
        gifRef.current.src = NoGifs[nextGifIndex];
      }
    }

    // Play song on first press or every 7th press after
    if (nextCount === 1 || (nextCount - 1) % 7 === 0) {
      const nextSongIndex = Math.floor(nextCount / 7) % NoMusic.length;
      playMusic(NoMusic[nextSongIndex], NoMusic);
    }
  };

  const handleYesClick = () => {
    fireConfetti();
    if (!popupShown) { // Only for Swal Fire Popup
      setYesPressed(true);
    }
    if (noCount > 3) {
      setYesPressed(true);
      playMusic(YesMusic[0], YesMusic); // Play the first "Yes" music by default
    }
  };

  const playMusic = (url, musicArray) => {
    if (currentAudio) {
      currentAudio.pause(); // Stop the currently playing song
      currentAudio.currentTime = 0; // Reset to the start
    }
    const audio = new Audio(url);
    audio.muted = isMuted;
    setCurrentAudio(audio); // Set the new audio as the current one
    audio.addEventListener('ended', () => {
      const currentIndex = musicArray.indexOf(url);
      const nextIndex = (currentIndex + 1) % musicArray.length;
      playMusic(musicArray[nextIndex], musicArray); // Play the next song in the correct array
    });
    audio.play();
  };

  const toggleMute = () => {
    if (currentAudio) {
      currentAudio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const noPhrases = [
    "No 🙅",
    "Really?",
    "Think about it once more!",
    "This is your last chance!",
    "Are you sure?",
    "Change your mind, laddu!",
    "Is this correct? Tell me! 👀",
    "I'm not feeling good at all! 😢",
    "I want your love!",
    "Laddu, please! 🥺",
    "Is this really real?",
    "Tell me what's in your heart!",
    "Will you leave me? 😭",
    "My heart is breaking! 💔",
    "What's happening right now?",
    "Feeling so sad, sweetie",
    "Nothing feels right without you! 📉",
    "Think once more, sweetie!",
    "Is this your final word?",
    "Just once, please 🙏",
    "What does your heart say? 💭",
    "Are you hurting me?",
    "Please laddu, give me one more chance! 🙏",
    "Don't say no, laddu!",
    "This is the last one — just say yes! 🥺✨",
  ];

  const getNoButtonText = () => {
    return noPhrases[Math.min(noCount, noPhrases.length - 1)];
  };

  useEffect(() => {
    if (yesPressed && noCount < 4 && !popupShown) {
      Swal.fire({
        title: "Laddu, just seeing you already makes my heart race so fast 🥰💖 You've completely stolen my heart! Saying yes this quickly? Make me wait a little longer, tease me a bit more! 🥰✨",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        width: 700,
        padding: "2em",
        background: `linear-gradient(135deg, rgba(255,60,172,0.92), rgba(120,75,160,0.92)) url(${swalbg})`,
        backdrop: `
          rgba(20,10,40,0.6)
          url(${loveu})
          right
          no-repeat
        `,
        confirmButtonText: "OK",
        customClass: {
          popup: "laddu-swal-popup",
          title: "laddu-swal-title",
          confirmButton: "laddu-swal-confirm",
        },
      });
      setPopupShown(true);
      setYesPressed(false);
    }
  }, [yesPressed, noCount, popupShown]);

  useEffect(() => {
    if (yesPressed && noCount > 3 && !yespopupShown) {
      Swal.fire({
        title: "You're my love, my sunshine, my forever laddu ❤️ Every second with you feels like magic. Will you be my laddu, forever and always? 🥰✨",
        width: 800,
        padding: "2em",
        background: `linear-gradient(135deg, rgba(255,60,172,0.92), rgba(120,75,160,0.92)) url(${swalbg})`,
        backdrop: `
          rgba(20,10,40,0.75)
          url(${purposerose})
          right
          no-repeat
        `,
        confirmButtonText: "OK",
        customClass: {
          popup: "laddu-swal-popup",
          title: "laddu-swal-title",
          confirmButton: "laddu-swal-confirm",
        },
      });
      setYesPopupShown(true);
      setYesPressed(true);
    }
  }, [yesPressed, noCount, yespopupShown]);

  useEffect(() => {
    if (noCount == 25) {
      Swal.fire({
        title: "My love for you has no end — shining like stars every night, even if you don't notice 🌟 I'll wait patiently, laddu, because true love never stops. Please press 'Yes' and let's make this a forever story 🥰✨<br/><i>True love never gives up — it only grows stronger with time.</i>",
        width: 850,
        padding: "2em",
        background: `linear-gradient(135deg, rgba(255,60,172,0.92), rgba(120,75,160,0.92)) url(${swalbg})`,
        backdrop: `
          rgba(20,10,40,0.75)
          url(${nogif1})
          right
          no-repeat
        `,
        confirmButtonText: "OK",
        customClass: {
          popup: "laddu-swal-popup",
          title: "laddu-swal-title",
          confirmButton: "laddu-swal-confirm",
        },
      });
    }
  }, [noCount]);

  return (
    <>
      {/* Animated Gen-Z gradient blob background */}
      <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#3b1666] to-[#0f0524]">
        <div className="absolute -top-20 -left-20 w-[28rem] h-[28rem] bg-laddu-pink/50 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-24 w-[26rem] h-[26rem] bg-laddu-indigo/50 rounded-full mix-blend-screen filter blur-3xl animate-blob [animation-delay:3s]" />
        <div className="absolute bottom-0 left-1/4 w-[24rem] h-[24rem] bg-laddu-gold/40 rounded-full mix-blend-screen filter blur-3xl animate-blob [animation-delay:6s]" />
        <div className="absolute bottom-10 right-1/4 w-[22rem] h-[22rem] bg-laddu-purple/50 rounded-full mix-blend-screen filter blur-3xl animate-blob [animation-delay:1.5s]" />
      </div>

      {noCount > 16 && noCount < 25 && yesPressed == false && <MouseStealing />}

      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-4 selection:bg-laddu-pink selection:text-white text-white px-4">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-[0_8px_60px_rgba(255,60,172,0.15)] px-6 py-8 md:px-10 md:py-10 flex flex-col items-center animate-popIn">
          {yesPressed && noCount > 3 ? (
            <>
              <img
                ref={gifRef}
                className="h-[200px] md:h-[230px] rounded-2xl shadow-lg border border-white/20"
                src={YesGifs[currentGifIndex]}
                alt="Yes Response"
              />
              <div
                className="text-4xl md:text-6xl font-extrabold my-3 text-center bg-gradient-to-r from-laddu-gold via-laddu-pink to-laddu-purple bg-clip-text text-transparent bg-[length:200%_200%] animate-shimmer"
                style={{ fontFamily: "'Baloo 2', system-ui, sans-serif" }}
              >
                It's Official, Laddu! 🥳❤️
              </div>
              <div
                className="text-3xl md:text-4xl font-normal my-1 text-center text-laddu-gold"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                You're my love, my laddu, forever 💫
              </div>
              <WordMareque />
            </>
          ) : (
            <>
              <img
                ref={gifRef}
                className="h-[190px] md:h-[220px] rounded-2xl shadow-lg border border-white/20"
                src={Lovegif}
                alt="Love Animation"
              />
              <h1
                className="text-3xl md:text-5xl my-5 text-center font-extrabold bg-gradient-to-r from-laddu-gold via-laddu-pink to-laddu-purple bg-clip-text text-transparent bg-[length:200%_200%] animate-shimmer leading-tight"
                style={{ fontFamily: "'Baloo 2', system-ui, sans-serif" }}
              >
                Will You Be My Laddu? 🥰🍯
              </h1>
              <p className="text-sm md:text-base text-white/70 -mt-3 mb-5 text-center font-body">
                You're my forever treasure 💫
              </p>
              <div className="flex flex-wrap justify-center gap-3 items-center">
                <button
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeave}
                  className="font-heading font-bold text-white py-2.5 px-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-[0_0_25px_rgba(52,211,153,0.55)] hover:shadow-[0_0_40px_rgba(52,211,153,0.85)] hover:scale-105 active:scale-95 transition-all duration-200"
                  style={{ fontSize: yesButtonSize }}
                  onClick={handleYesClick}
                >
                  Yes! 😍
                </button>
                <button
                  onMouseEnter={handleMouseEnterNo}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleNoClick}
                  className="font-heading font-bold text-white py-2.5 px-6 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 shadow-[0_0_20px_rgba(244,63,94,0.5)] hover:shadow-[0_0_35px_rgba(244,63,94,0.8)] hover:animate-wiggle transition-all duration-200 text-sm md:text-base"
                >
                  {noCount === 0 ? "No 🙅" : getNoButtonText()}
                </button>
              </div>
              {floatingGifs.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.src}
                  alt="Floating Animation"
                  className="absolute w-12 h-12 animate-bounce"
                  style={gif.style}
                />
              ))}
            </>
          )}
        </div>
        <button
          className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-full hover:bg-white/20 transition-colors"
          onClick={toggleMute}
        >
          {isMuted ? <BsVolumeMuteFill size={22} className="text-white" /> : <BsVolumeUpFill size={22} className="text-white" />}
        </button>
        <Footer />
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <div className="fixed bottom-6 left-6 backdrop-blur-md bg-white/10 border border-white/20 text-white/80 text-xs md:text-sm px-3 py-1.5 rounded-full">
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
      {" "}in Hyderabad 🍯
    </div>
  );
};
