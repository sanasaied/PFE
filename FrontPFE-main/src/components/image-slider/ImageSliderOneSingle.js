import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const ImageSliderOneSingle = ({ data, sliderClass }) => {
  return (
    <div className={`single-image ${sliderClass ? sliderClass : ""}`} >
      <Link to={'/shop'}
      //  to={process.env.PUBLIC_URL + data.link}
      >
        <img
          src={
            data.images[0] ? process.env.REACT_APP_ASSETS_URL + "/" + data.images[0] : `${process.env.PUBLIC_URL + '/assets/img/image-slider/image-slider-5.jpg'}`
          }
          alt="" />
      </Link>
    </div>
  );
};

ImageSliderOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default ImageSliderOneSingle;
