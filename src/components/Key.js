import { useSelector } from 'react-redux'

const Key = ({onClick, value = ''}) => {
  const match = useSelector(state => state.characterMatches)[value.toUpperCase()]
  return (
    <button onClick={onClick} className={`key match-${match}`}>
      {value}
    </button>
  )
}
export default Key