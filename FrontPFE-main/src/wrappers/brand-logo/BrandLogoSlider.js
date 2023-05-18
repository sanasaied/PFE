import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import BrandLogoOneSingle from "../../components/brand-logo/BrandLogoOneSingle";

const BrandLogoSlider = ({ slides, spaceBottomClass, spaceTopClass, noBorder }) => {
  const settings = {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    rebuildOnUpdate: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 5
      },
      768: {
        slidesPerView: 4
      },
      640: {
        slidesPerView: 3
      },
      320: {
        slidesPerView: 2
      }
    }
  };

  return (
    <div
      className={`brand-logo-area ${noBorder ? "" : "border-top border-bottom"
        } ${spaceBottomClass ? spaceBottomClass : ""}  ${spaceTopClass ? spaceTopClass : ""
        }`}
    >
      <div className="container-fluid">
        <div className="brand-logo-active">
          <Swiper {...settings}>
            {slides &&
              slides.map((single, key) => {
                return (
                  <BrandLogoOneSingle
                    data={single}
                    key={key}
                    sliderClassName="swiper-slide"
                  />
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

BrandLogoSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BrandLogoSlider;
