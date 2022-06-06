import { matchesForWord } from './selectors'
import { randomWord } from './utils'

const initialState = {
  guesses: [],
  target: randomWord(),
  characterMatches: {},
  gameInProgress: true,
  currentGuess: '',
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'removeCharacterFromGuess':
      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, -1)
      }
    case 'addCharacterToGuess':
      return {
        ...state,
        currentGuess: `${state.currentGuess}${action.payload}`.toUpperCase()
      }
    case 'addGuess':
      const guess = action.payload
      let guesses = [...state.guesses]
      guesses.push(guess)

      // Update match value for each character in the guess
      let characterMatches = { ...state.characterMatches }
      const matches = matchesForWord(state, guess)
      guess.split('').forEach((character, index) => {
        const match = matches[index]
        if (match > characterMatches[character] || !characterMatches[character]) {
          characterMatches[character] = match
        }
      })

      return {
        ...state,
        guesses: guesses,
        characterMatches: characterMatches,
        currentGuess: ''
      }
    case 'newGame':
      return { ...initialState, target: randomWord() }
    case 'setGameInProgress':
      return {
        ...state,
        gameInProgress: action.payload
      }
    default:
      return state
  }
}