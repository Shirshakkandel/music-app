import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeDown,
} from '@fortawesome/free-solid-svg-icons'
import { playAudio } from '../util'

const FlexCol10vhXcenterYbetween = styled.div``

//Top
const TimeControl__W50FlexYcenter3 = styled.div``
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
      <TimeControl__W50FlexYcenter3 className="flex items-center w-1/2 p-4 space-x-1">
        <p>{getTime(songInfo.currentTime)}</p>

        <div
          style={
            {
              // background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
            }
          }
          className="relative w-full h-4 rounded-md"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            className="w-full"
            onChange={dragHandler}
          />
          <div></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </TimeControl__W50FlexYcenter3>

      {/* Bottom */}
      <PlayControl__W40FlexXbetweenYcenter className="w-[40%] flex justify-between items-center p-4">
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
      </PlayControl__W40FlexXbetweenYcenter>
    </FlexCol10vhXcenterYbetween>
  )
}
