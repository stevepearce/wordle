import Row from './Row'

const Grid = ({numRows = 5, numCols = 5, guesses = [], currentGuess = []}) => {
  const emptyRows = (guesses.length < numRows -1)
      ? Array.from(Array(numRows - 1 - guesses.length))
      : []

  return (
    <div className='grid'>
      {guesses.map((word, index) =>
        <Row
          key={index}
          numCols={numCols}
          word={word}
          showMatches={true}
        />
      )}
      {guesses.length < numRows && (
        <Row
          numCols={numCols}
          word={currentGuess}
          showMatches={false}
        />
      )}
      {emptyRows.map((_, index) => (
        <Row
          key={index}
          numCols={numCols}
          showMatches={false}
        />
      ))}
    </div>
  )
}
export default Grid