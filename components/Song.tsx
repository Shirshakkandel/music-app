import React from 'react'
import styled from 'styled-components'

const Song60vhFlexColCenter3 = styled.div`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .rotateSong {
    animation: rotate 20s linear forwards infinite;
  }
`

export default function Song({ currentSong, isPlaying }) {
  return (
    <Song60vhFlexColCenter3 className="min-h-[60vh] flex flex-col justify-center items-center">
      <img
        src={currentSong.cover}
        alt="currentSong"
        style={{ transition: 'all 2s ease' }}
        className={`w-[60%] rounded-full sm:w-[50%] md:w-[25%] ${isPlaying ? 'rotateSong' : ''}`}
      />

      <h2 style={{ padding: '3rem 1rem 1rem 1rem' }} className="text-xl font-bold">
        {currentSong.name}
      </h2>

      <h3 className="text-base">{currentSong.artist}</h3>
    </Song60vhFlexColCenter3>
  )
}
