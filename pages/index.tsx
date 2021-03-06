import Head from 'next/head'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import Library from '../components/Library'
import Nav from '../components/Nav'
import Player from '../components/Player'
import Song from '../components/Song'
import chillHop from '../data'

const AppActiveMl30 = styled.div``

export default function Home() {
  const audioRef = useRef(null)
  const [libraryStatus, setLibraryStatus] = useState(false)
  const [songs, setSongs] = useState(chillHop())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  })

  function timeUpdateHandler(e) {
    const { currentTime, duration } = e.target
    // console.log(`${currentTime} ${duration}`)
    const roundedCurrent = Math.round(currentTime)
    const roundedDuration = Math.round(duration)
    const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100)
    // console.log(animationPercentage)

    setSongInfo({
      ...songInfo,
      currentTime: currentTime,
      duration: duration,
      animationPercentage,
      volume: e.target.volume,
    })
  }

  async function songEndHandler() {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    if (isPlaying) audioRef.current.play()
  }

  //useEffect Update List
  function activeLibraryHandler(nextPrev) {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return { ...song, active: true }
      } else {
        return { ...song, active: false }
      }
    })
    setSongs(newSongs)
  }

  return (
    <>
      <Head>
        <title>Music App</title>
      </Head>

      <AppActiveMl30
        className={`transition ease-in duration-300 ${libraryStatus ? 'ml-[30%]' : ''} `}
      >
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        <Song currentSong={currentSong} isPlaying={isPlaying} />

        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setSongs={setSongs}
        />

        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          libraryStatus={libraryStatus}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
        />

        <audio
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler}
          src={currentSong.audio}
          ref={audioRef}
          onEnded={songEndHandler}
        ></audio>
      </AppActiveMl30>
    </>
  )
}
