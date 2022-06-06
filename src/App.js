import Grid from './components/Grid'
import Keyboard from './components/Keyboard'
import Modal  from './components/Modal';

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux'
import { correctGuess } from './selectors'
import { isValidWord } from './utils'

const App = () => {
  const target = useSelector((state) => state.target)
  const guesses = useSelector((state) => state.guesses)
  const gameInProgress = useSelector(state => state.gameInProgress)
  const currentGuess = useSelector(state => state.currentGuess)
  const lastGuess = useSelector(state => state.guesses[state.guesses.length - 1])
  const correctWordFound = useSelector(state => correctGuess(state, lastGuess))

  const [wordLength] = useState(5)
  const [numAllowedGuesses] = useState(5)
  const [modalActive, setModalActive] = useState(false)

  const dispatch = useDispatch()

  const handleInvalidWord = () => {
    alert('The word you entered cannot be found in the word list.')
  }

  const handleNewGame = async () => {
    dispatch({type: 'newGame'})
    setModalActive(false)
  }

  const handleKeyDown = useCallback((event) => {    
    const key = event.key
    
    if (key.match(/^[\w]{1}$/)) {
      if (currentGuess.length < wordLength) {
        dispatch({type: 'addCharacterToGuess', payload: key})
      }
    } else if (key == "Backspace") {
      dispatch({type: 'removeCharacterFromGuess', payload: key})
    } else if (key == "Enter") {
      if (currentGuess.length != wordLength) {
        //Pass
      } else if (!isValidWord(currentGuess)) {
        handleInvalidWord()
      } else {
        dispatch({type: 'addGuess', payload: currentGuess})
      }
    }
  }, [currentGuess])

  useEffect(() => {
    if (correctWordFound || guesses.length == numAllowedGuesses) {
      dispatch({type: 'setGameInProgress', payload: false})
      setModalActive(true)
    }
  }, [correctWordFound, guesses.length])

  useEffect(() => {
    if (gameInProgress) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, gameInProgress])


  return (
    <div>
      <Grid
        numRows={numAllowedGuesses}
        numCols={wordLength}
        guesses={guesses}
        currentGuess={currentGuess}
      />
      <Keyboard
        onClick={handleKeyDown}
      />
      <Modal
        isActive={modalActive}
        handleNewGame={handleNewGame}
        correctWordFound={correctWordFound}
      />
    </div>
  )
}

export default App