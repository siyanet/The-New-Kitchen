
import PropTypes from 'prop-types'
const RedButton = ({onClick,word}) => {
  return (
    <button onClick={onClick} className='text-white bg-red p-4'>
        {word}
    </button>
  )
}
RedButton.propTypes={
    onClick: PropTypes.func,
    word: PropTypes.string
}
export default RedButton;
