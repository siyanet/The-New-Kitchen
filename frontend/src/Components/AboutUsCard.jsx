


import PropTypes from 'prop-types';

const AboutUsCard = ({ img, title, word }) => {
  return (
    <div className="block text-center px-3 md:px-6 w-full h-full">
      <div className="flex  justify-center items-center p-3 w-20 h-20 md:w-40 md:h-40 bg-white shadow-lg rounded-full m-auto">
        <img src={img} alt="About us icon" className="max-w-full max-h-full" />
      </div>
      <p className="font-nunito font-extrabold text-sm md:text-lg text-center mt-3">
        {title}
      </p>
      <p className="font-nunito font-medium text-xs md:text-base text-gray-700">
        {word}
      </p>
    </div>
  );
};

AboutUsCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
};

export default AboutUsCard;
