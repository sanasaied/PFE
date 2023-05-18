import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { fetchUser } from "../redux/actions/authActions";
import FooterOne from "../wrappers/footer/FooterOne";
import HeaderOne from "../wrappers/header/HeaderOne";

const LayoutOne = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass
}) => {
  const dispatch = useDispatch()
  const {
    addToast,
  } = useToasts();
  useEffect(() => {

    fetchUser(dispatch)

  }, [])

  return (
    <Fragment>
      <HeaderOne
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
        headerPositionClass={headerPositionClass}
      />
      {children}
      <FooterOne
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
    </Fragment>
  );
};

LayoutOne.propTypes = {
  children: PropTypes.any,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  headerTop: PropTypes.string
};

export default LayoutOne;
