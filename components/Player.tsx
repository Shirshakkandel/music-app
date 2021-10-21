import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeDown,
} from '@fortawesome/free-solid-svg-icons'
// import { playAudio } from '../util'

const FlexCol10vhXcenterYbetween = styled.div``

//Top
const TimeControl__W50FlexYcenter3 = styled.div`
  input {
    --webkit-appearance: none;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    /* background: black; */
  }

  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    background: transparent;
    border: none;
    /* background: black; */
  }
`
const Track__RelativeHidden = styled.div``
const AbsoluteAnimateTrack = styled.div``

//buttom
const PlayControl__W40FlexXbetweenYcenter = styled.div`
  svg {
    cursor: pointer;
  }
`

export default function Player({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  currentSong,
  songs,
  setCurrentSong,
  setSongs,
}) {
  const [activeVolume, setActiveVolume] = useState(false)
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

  const changeVolume = (e) => {
    let value = e.target.value
    audioRef.current.volume = value
    setSongInfo({ ...songInfo, volume: value })
  }

  function getTime(time) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  const playSongHandler = () => {
    // console.log(audioRef.current)
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  function dragHandler(e) {
    // console.log(e.target.value)
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }

  async function skipTrackHandler(direction) {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    }

    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1])
        activeLibraryHandler(songs[songs.length - 1])
        if (isPlaying) audioRef.current.play()
        return
      }

      await setCurrentSong(songs[currentIndex - 1])
      activeLibraryHandler(songs[currentIndex - 1])
    }
    if (isPlaying) audioRef.current.play()
  }

  return (
    <FlexCol10vhXcenterYbetween className="min-h-[10vh] flex flex-col justify-between items-center">
      {/* Top */}
      <TimeControl__W50FlexYcenter3 className="flex items-center w-[90%] p-4 space-x-1 md:w-1/2">
        <p>{getTime(songInfo.currentTime)}</p>

        <Track__RelativeHidden
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="relative w-full h-4 overflow-hidden rounded-md"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            className="w-full bg-transparent appearance-none cursor-pointer"
            onChange={dragHandler}
          />

          <AbsoluteAnimateTrack
            style={{ transform: `translateX(${songInfo.animationPercentage}%)` }}
            className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[rgb(204,204,204)]"
          ></AbsoluteAnimateTrack>
        </Track__RelativeHidden>

        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </TimeControl__W50FlexYcenter3>

      {/* Bottom */}
      <PlayControl__W40FlexXbetweenYcenter className="w-[85%] md:w-[45%] flex justify-evenly items-center p-4  md:pl-2">
        <FontAwesomeIcon
          size="2x"
          className="skip-back"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler('skip-back')}
        />

        <FontAwesomeIcon onClick={playSongHandler} size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler('skip-forward')}
        />
        <FontAwesomeIcon
          size="2x"
          onClick={() => setActiveVolume(!activeVolume)}
          icon={faVolumeDown}
        />

        {activeVolume && (
          <input
            onChange={changeVolume}
            value={songInfo.volume}
            max="1"
            min="0"
            step="0.1"
            type="range"
            className="w-1/4 md:w-1/5"
          />
        )}
      </PlayControl__W40FlexXbetweenYcenter>
    </FlexCol10vhXcenterYbetween>
  )
}
