import React, { useRef, useState } from "react";
import song from "../assets/songs/Un Verano Sin Ti.mp3";

const App = () => {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  async function handleOpenFile() {
    const file = await window.api.openSong();
    const blob = new Blob([file], { type: "audio/mp3" });
    audioRef.current.src = URL.createObjectURL(blob);
  }

  return (
    <div>
      <h1>Hello world</h1>
      <button onClick={handleOpenFile}>Open file</button>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.target.duration);
        }}
        controls
      />
      <input
        type="range"
        value={currentTime}
        max={duration}
        onChange={(e) => {
          setCurrentTime(e.target.value);
          audioRef.current.currentTime = e.target.value;
        }}
      />
    </div>
  );
};

export default App;
