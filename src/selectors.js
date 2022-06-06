import { createSelector } from "@reduxjs/toolkit";
import { CHARACTER_EXACT_MATCH, CHARACTER_PARTIAL_MATCH, CHARACTER_NO_MATCH } from './constants'
import { indicesOf, intersection, occurrences } from './utils'

// Usage: useSelector(state => matchesForWord(state, word))
// Returns array of match values from 0-2 for the corresponding indices in word.
export const matchesForWord = createSelector(
  [
    state => state.target,
    (state, word) => word
  ],
  (target, word = '') => {
    word = word.split('')
    target = target.split('')
    let timesCharacterHasBeenSeenInWord = {}
    let targetOccurrences = occurrences(target)
    
    return word.map((character, index) => {
      const targetIndices = indicesOf(target, character)
      const wordIndices = indicesOf(word, character)
      timesCharacterHasBeenSeenInWord[character] ||= 0
      timesCharacterHasBeenSeenInWord[character]++

      if (targetIndices.length == 0) {
        // Easy case. Character is not in the target.
        return CHARACTER_NO_MATCH
      } else if (timesCharacterHasBeenSeenInWord[character] > targetOccurrences[character]) {
        // Character appears more often in the word.
        // e.g. this is the second appearance of C, but C only appears once in the target.
        return CHARACTER_NO_MATCH
      } else if (targetIndices.indexOf(index) != -1) {
        // Character is in the target, in the same location.
        return CHARACTER_EXACT_MATCH
      } else {
        // Character is in the target, in another location

        const indicesOfUpcomingExactMatches = intersection(wordIndices,targetIndices.filter(i => i > index))
        if (indicesOfUpcomingExactMatches.length == targetOccurrences[character]) {
          // There is a later occurrence of the character that is an exact match
          timesCharacterHasBeenSeenInWord[character]-- // Forget about this character being seen, because we want to include the exact match
          return CHARACTER_NO_MATCH
        } else {
          return CHARACTER_PARTIAL_MATCH
        }
      }

    })

  }
)

// Usage: useSelector(state => correctGuess(state, word))
// Returns true just in case the word is identical to the target
export const correctGuess = createSelector(
  [
    state => state.target,
    (state, word) => word
  ],
  (target, word = []) => {
    if (target.length == 0) return false
    return target == word

  }
)
