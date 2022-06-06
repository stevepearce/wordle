const Cell = ({value = '', showMatch = true, match = null}) => {
  return (
    <div className={`cell ${showMatch ? `match-${match}` : ''}`}>
      {value}
    </div>
  )
}
export default Cell