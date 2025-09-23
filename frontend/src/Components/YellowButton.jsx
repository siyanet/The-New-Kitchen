
import PropTypes from 'prop-types'
const YellowButton = ({onClick,word}) => {
    return (
        <button onClick={onClick} className='text-white bg-yellow  p-4'>
            {word}
        </button>
      )
    }
    YellowButton.propTypes={
        onClick: PropTypes.func,
        word: PropTypes.string
    }

export default YellowButton
