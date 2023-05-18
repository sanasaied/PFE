import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ featuredCategories }) => {
  const firstPart = featuredCategories.slice(0, 2)
  const secondPart = featuredCategories.slice(2, 3)
  const thirdPart = featuredCategories.slice(3, 5)
  const remainingCategories = featuredCategories.slice(5)
  return (
    <div className="banner-area hm9-section-padding mt-70">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="row">
              {firstPart.map(category => (
                <div className="col-lg-12" key={category._id}>
                  <div className="single-banner mb-20">
                    <Link to={process.env.PUBLIC_URL + "/shop/" + category.name + '/' + category._id}>
                      <img
                        src={
                          category.images[0] ? process.env.REACT_APP_ASSETS_URL + "/" + category.images[0] : `${process.env.PUBLIC_URL + '/assets/img/banner/banner-23.png'}`
                        }
                        alt=""
                      />
                    </Link>
                    <div className="banner-content-3 banner-position-hm15-1">
                      <h3> {category.name} </h3>

                      <Link to={process.env.PUBLIC_URL + "/shop/" + category.name + '/' + category._id}>
                        <i className="fa fa-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            {secondPart.map(category => (
              <Link
                to={process.env.PUBLIC_URL + "/shop/" + category.name + '/' + category._id}

                className="single-banner mb-20 second-part" key={category._id} style={{
                  background:
                    `url(${category.images[0] ? process.env.REACT_APP_ASSETS_URL + "/" + category.images[0] : `${process.env.PUBLIC_URL + '/assets/img/banner/banner-23.png'}`})`,
                  backgroundSize: 'cover',

                }}>
                <div className="banner-content-4 banner-position-hm15-2">
                  <h3> {category.name} </h3>

                  <Link to={process.env.PUBLIC_URL + "/shop/" + category.name + '/' + category._id}>
                    SHOP NOW
                  </Link>
                </div>
              </Link>
            ))}
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="row">
              {thirdPart.map(category => (
                <div className="col-lg-12 col-md-6" key={category._id}>
                  <div className="single-banner mb-20">
                    <Link
                      to={process.env.PUBLIC_URL + "/shop/" + category.name + '/' + category._id}
                    >
                      <img
                        src={
                          category.images[0] ? process.env.REACT_APP_ASSETS_URL + "/" + category.images[0] : `${process.env.PUBLIC_URL + '/assets/img/banner/banner-23.png'}`
                        }
                        alt=""
                      />
                    </Link>
                    <div className="banner-content-3 banner-position-hm15-2">
                      <h3>{category.name} </h3>
                      <Link
                        to={process.env.PUBLIC_URL + "/shop/" + category.name + '/' + category._id}
                      >
                        <i className="fa fa-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
        <div className="row">
          {remainingCategories.map(category => (
            <div className="col-lg-4 col-md-12" key={category._id}>
              <div className="single-banner mb-20">
                <Link
                  to={process.env.PUBLIC_URL + "/shop/" + category.name + '/' + category._id}
                >
                  <img
                    src={
                      category.images[0] ? process.env.REACT_APP_ASSETS_URL + "/" + category.images[0] : `${process.env.PUBLIC_URL + '/assets/img/banner/banner-23.png'}`
                    }
                    alt=""
                  />
                </Link>
                <div className="banner-content-3 banner-position-hm15-2">
                  <h3>{category.name} </h3>
                  <Link
                    to={process.env.PUBLIC_URL + "/shop/" + category.name + '/' + category._id}
                  >
                    <i className="fa fa-long-arrow-right" />
                  </Link>
                </div>
              </div>

            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
