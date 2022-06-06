import Cell from './Cell'
import { matchesForWord } from '../selectors'
import { useSelector } from 'react-redux'

const Row = ({numCols = 5, word = '', showMatches = true}) => {
  const matches = showMatches ? useSelector(state => matchesForWord(state, word)) : []
  return (
    <div className='row'>
      {
        Array.apply(null, Array(numCols)).map((_, index) =>
          <Cell
            key={index}
            value={word[index]}
            showMatch={showMatches}
            match={matches[index]}
          />
        )
      }
    </div>
  )
}
export default Row
