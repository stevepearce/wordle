import Key from './Key'

const Keyboard = ({onClick}) => {
  return (
    <div className="keyboard">
      <div className='flex'>
        {"qwertyuiop".split('').map((character, index) =>
          <Key
            value={character}
            key={index}
            onClick={(() => onClick({key: character}))}
          />
        )}
      </div>
      <div className='flex'>
        {"asdfghjkl".split('').map((character, index) =>
          <Key
          value={character}
            key={index}
            onClick={(() => onClick({key: character}))}

          />
        )}
      </div>
      <div className='flex'>
        {['Enter'].concat('zxcvbnm'.split('')).concat('Backspace').map((character, index) =>
          <Key
            value={character}
            key={index}
            onClick={(() => onClick({key: character}))}
          />
        )}
      </div>
    </div>
  )
}

export default Keyboard