import React from "react";
import { Link } from "react-router-dom";

const GoldAdsList = ({ items }) => {
  return <div className="list">
    {
      items.map(item => <Link
        key={item._id}
        to="#"
        //  to={process.env.PUBLIC_URL + data.link}
        className="golden-ad">
        <img
          src={
            item.images[0] ? process.env.REACT_APP_ASSETS_URL + "/" + item.images[0] : `${process.env.PUBLIC_URL + '/assets/img/image-slider/image-slider-5.jpg'}`

          }
          alt="" />
      </Link>)

    }
  </div>;
};
export default GoldAdsList;
