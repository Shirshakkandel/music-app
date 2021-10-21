import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Nav10vhXaroundYcenter = styled.div``

export default function Nav({ libraryStatus, setLibraryStatus }) {
  return (
    <Nav10vhXaroundYcenter className="h-[10vh] flex justify-around  items-center">
      <h1 className="text-lg font-bold">Waves</h1>

      <button
        onClick={() => setLibraryStatus(!libraryStatus)}
        className={`z-10 bg-transparent p-2 transition duration-300 ease-in border-2 border-solid border-[rgb(65,65,65)]  hover:bg-[rgb(65,65,65)] hover:text-white ${
          libraryStatus ? 'bg-[rgb(65,65,65)] text-white' : ''
        } `}
      >
        Library <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </button>
    </Nav10vhXaroundYcenter>
  )
}
