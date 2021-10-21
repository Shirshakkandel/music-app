import React from 'react'
import styled from 'styled-components'
import { playAudio } from '../util'
const Library__FixedW320translateX = styled.div`
  /* The emerging W3C standard
   that is currently Firefox-only */
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.7) transparent;

  /* Works on Chrome/Edge/Safari */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.7);
    border-radius: 20px;
    border: transparent;
  }
`
const Song__FlexYcenter = styled.div``

const LibrarySong__ = styled.div``

export default function Library({
  songs,
  setCurrentSong,
  libraryStatus,
  audioRef,
  isPlaying,
  setSongs,
}) {
  return (
    <Library__FixedW320translateX
      style={{
        transition: 'all 0.5s ease',
        transform: `${libraryStatus ? 'translateX(0%)' : 'translateX(-100%)'}`,
      }}
      className={`fixed rounded-[4] top-0 left-0 overflow-scroll bg-white w-full  md:w-80 h-full`}
    >
      <h2 className="p-8 text-2xl font-bold">Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            key={song.id}
            setCurrentSong={setCurrentSong}
            songs={songs}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </Library__FixedW320translateX>
  )
}

function LibrarySong({ song, setCurrentSong, songs, audioRef, isPlaying, setSongs }) {
  async function songSelectHandler() {
    const selectedSong = songs.filter((state) => state.id === song.id)
    // return array of objects so we take 0 index object cause currentSong is object not array
    setCurrentSong({ ...selectedSong[0] })
    //play only if isPlaying is true

    // if (isPlaying) {
    //   await audioRef.current.play()
    //   audioRef.current.play()
    // }
    playAudio(isPlaying, audioRef)

    //Add Active state to click song
    const newSongs = songs.map((item) => {
      if (item.id === song.id) {
        return { ...item, active: true }
      } else {
        return { ...item, active: false }
      }
    })
    setSongs(newSongs)
  }

  return (
    <Song__FlexYcenter
      className={`flex items-center cursor-pointer hover:bg-[rgb(235,235,235)] ${
        song.active ? 'bg-[rgba(155,155,155,0.7)]' : ''
      }`}
      style={{ padding: '1rem 2rem 1rem 2rem ', transition: 'all 0.75s ease-out' }}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt="Cover" className="w-[30%] bg-[rgb(235,235,235)] " />

      <div className="pl-4">
        <h3 className="text-base">{song.name}</h3>
        <h4 className="text-sm">{song.artist}</h4>
      </div>
    </Song__FlexYcenter>
  )
}
