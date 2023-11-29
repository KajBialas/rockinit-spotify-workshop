import { useState, useEffect, useRef } from 'react'

const API = '/assets/api.json';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(0);
  const audioRef = useRef();


  useEffect(() => {
      if(audioRef.current) {
          audioRef.current.src = songs[selectedSong].audio
          audioRef.current.load();
      }
  }, [selectedSong, songs])

    useEffect(() => {
        fetch(API).then(response => {
            if(response.ok) {
                // response.json().then(setSongs)
                response.json().then(response => setSongs(response))
            }
        })
    }, [])

    if (songs.length < 1) {
        return (<div>Loader...</div>)
    }
  return (
    <div>
        <section>
            <h1 className="text-3xl font-bold mb-4">
                Spotify
            </h1>
            <img src={songs[selectedSong].cover} />
            <button onClick={() => audioRef.current.play()}>
                Play
            </button>
            <button onClick={() => audioRef.current.pause()}>
                Pause
            </button>
            <audio ref={audioRef}>
                <source src={songs[selectedSong].audio} />
            </audio>
        </section>
      <section>
          <h1 className="text-2xl font-semibold mb-4 text-center">
              Songs:
          </h1>
          <ul className="flex flex-col space-y-2">
              {songs.map((song, index) => (
                  <li key={song.id} onClick={() => setSelectedSong(index)}>
                      {song.title} by {song.author}
                  </li>
              ))}
          </ul>
      </section>
    </div>
  )
}

export default App
