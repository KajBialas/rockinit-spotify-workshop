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
    <div className="min-h-screen bg-gray-900 text-white justify-center items-center flex-col m-auto">
        <section className="bg-black text-white p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">
                Spotify
            </h1>
            <img src={songs[selectedSong].cover} className="mx-auto my-4 w-64 object-cover shadow-lg"/>
            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full cursor-pointer" onClick={() => audioRef.current.play()}>
                Play
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full cursor-pointer" onClick={() => audioRef.current.pause()}>
                Pause
            </button>
            <audio ref={audioRef}>
                <source src={songs[selectedSong].audio} />
            </audio>
        </section>
      <section>
          <h1 className="text-2xl font-semibold mb-4 text-center custom">
              Songs:
          </h1>
          <ul className="flex flex-col space-y-2">
              {songs.map((song, index) => (
                  <li key={song.id} onClick={() => setSelectedSong(index)} className={`text-center py-2 px-4 cursor-pointer rounded-lg ${songs[selectedSong].id === song.id ? 'bg-gray-700' : 'bg-gray-800'}`}>
                      {song.title} by {song.author}
                  </li>
              ))}
          </ul>
      </section>
    </div>
  )
}

export default App
