import { matchesForWord, correctGuess } from '../selectors'

const expectations = {
  'aaaaa': {
    'aaaaa': [2,2,2,2,2],
    'bbbbb': [0,0,0,0,0],
    'abbbb': [2,0,0,0,0],
    'babbb': [0,2,0,0,0],
    'bbabb': [0,0,2,0,0],
    'bbbab': [0,0,0,2,0],
    'bbbba': [0,0,0,0,2],
  },
  'abbbb': {
    'caccc': [0,1,0,0,0],
    'ccacc': [0,0,1,0,0],
    'cccac': [0,0,0,1,0],
    'cccca': [0,0,0,0,1],
    'accca': [2,0,0,0,0],
    'accaa': [2,0,0,0,0],
    'bbbba': [1,2,2,2,1]
  },
  'aabbb': {
    'accaa': [2,0,0,1,0],
    'aacaa': [2,2,0,0,0],
    'cccaa': [0,0,0,1,1],
    'bbbaa': [1,1,2,1,1]
  },
  'snack': {
    'snack': [2,2,2,2,2],
    'nnack': [0,2,2,2,2],
    'aaack': [0,0,2,2,2],
    'cccck': [0,0,0,2,2],
    'kkkkk': [0,0,0,0,2],
    'snnnn': [2,2,0,0,0],
    'sssss': [2,0,0,0,0]
  },
  'loom': {
    'room': [0,2,2,2],
    'roam': [0,2,0,2],
    'mood': [1,2,2,0],
    'oooo': [0,2,2,0]
  },
  'store': {
    'stoog': [2,2,2,0,0]
  }
}


describe('matchesForWord', () => {

  Object.keys(expectations).forEach((target) => {
    const targetExpectations = expectations[target]
    Object.keys(targetExpectations).forEach((word) => {
      it(`target = ${target} ; word = ${word}`, () => {
        expect(matchesForWord({ target: target }, word)).toStrictEqual(targetExpectations[word])
      })
    })
  })

})

describe('correctGuess', () => {
  const target = 'snack'
  it('should return true for the correct guess', () => {
    expect(correctGuess({ target: target }, target)).toBeTruthy()
  })
  it('should return false for the incorrect guess', () => {
    expect(correctGuess({ target: target }, 'asdaf')).toBeFalsy()
  })
})