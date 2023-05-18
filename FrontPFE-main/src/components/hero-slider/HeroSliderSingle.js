import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const HeroSliderEighteenSingle = ({ data, sliderClass }) => {
  const backgroundImage = data.images[0] ? encodeURI(`url(${process.env.REACT_APP_ASSETS_URL + "/" + data.images[0]})`) : `url(${process.env.PUBLIC_URL + '/assets/img/slider/slider-16.jpg'})`
  return (
    <div
      className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${sliderClass ? sliderClass : ""
        }`}
      style={{ backgroundImage: backgroundImage, height: "480px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12 ml-auto">
            <div className="slider-content-2 slider-content-2--white slider-animated-1">
              <h3 className="animated no-style">{data.title}</h3>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
              />
              {data.link && <div className="slider-btn btn-hover">
                <Link
                  className="rounden-btn"
                  to={`${process.env.PUBLIC_URL}${data.link}`}
                >
                  SHOP NOW
                </Link>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderEighteenSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default HeroSliderEighteenSingle;
