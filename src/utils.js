import words from './words.js'
const wordsArray = words.split("\n")
export const randomWord = () => wordsArray[Math.floor(Math.random()*wordsArray.length)].toUpperCase()

export const isValidWord = (word) => {
  return words.indexOf(word.toLowerCase()) != -1
}

// Returns array of indices for targetElement in array.
// e.g. indicesOf(['a','a','b','a']) => { 'a' => [0, 1, 3], 'b' => [2] }
export const indicesOf = (array, targetElement) => {
  return array.reduce(
    (acc, element, index) => {
      if (element == targetElement) acc.push(index)
      return acc
    },
    []
  )
}

// Returns map of elements in array to number of times they appear in the array.
// e.g. occurrences(['a','a',b']) => { 'a' => 2, 'b' => 1}
export const occurrences = (array) => {
  return array.reduce(
    (acc, element) => {
      acc[element] ||= 0
      acc[element]++
      return acc
    },
    {}
  )
}

export const intersection = (arr1, arr2) => {
  return arr1.filter(value => arr2.includes(value));
}