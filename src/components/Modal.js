import { useSelector } from 'react-redux'

const Modal = ({isActive = false, handleNewGame, correctWordFound}) => {
  const target = useSelector(state => state.target)
  return (
    <div>
      <div className={`modal-overlay ${isActive ? 'isActive' : ''}`}></div>
      <div className={`modal ${isActive ? 'isActive' : ''}`}>
        <div className='modal-content'>
          <h1>{ correctWordFound ? 'Congratulations!' : 'Too bad!' }</h1>
          <div>The correct word was <strong>{target}</strong></div>
          <button onClick={handleNewGame} className='button'>Play again</button>
        </div>
      </div>
    </div>

  )
}

export default Modal
