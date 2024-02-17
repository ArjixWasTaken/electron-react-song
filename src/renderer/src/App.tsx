import { useRef, useState, useCallback } from 'react'

const App = (): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [title, setTitle] = useState('Hello World')

  const openFile = useCallback(async () => {
    if (!audioRef.current) return

    const file = await (window as any).api.openSong()
    if (file === null) return

    setTitle(file.filename)

    const blob = new Blob([file.data as Buffer], { type: 'audio/mp3' })
    audioRef.current.src = URL.createObjectURL(blob)
  }, [setTitle, audioRef])

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={openFile}>Open file</button>
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current!.currentTime)}
        onLoadedMetadata={() => {
          setDuration(audioRef.current!.duration)
        }}
        controls
      />
      <input
        type="range"
        value={currentTime}
        max={duration}
        onChange={(e) => {
          const time = parseInt(e.target.value)

          audioRef.current!.currentTime = time
          setCurrentTime(time)
        }}
      />
    </div>
  )
}

export default App
