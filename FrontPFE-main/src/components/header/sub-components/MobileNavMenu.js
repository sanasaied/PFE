import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { multilanguage } from "redux-multilanguage";
import { removeToken } from "../../../helpers/token";
import { LOGOUT } from "../../../redux/actions/authActions";

const MobileNavMenu = ({ strings }) => {
  const category = useSelector((state) => state.category.category);
  const isLoggedIn = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogout = async () => {
    removeToken()
    await dispatch({ type: LOGOUT });
    history.push('/login-register')
  }
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>
        </li>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/about"}>
            {strings["about_us"]}
          </Link>
        </li>

        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/shop"}>{strings["shop"]}</Link>
        </li>
        <li className="menu-item-has-children">
          <Link to="#">{strings["categories"]}</Link>
          <ul className="sub-menu">
            {category &&
              category?.map((el) => (
                <li key={el._id}>
                  <Link to={process.env.PUBLIC_URL + `/shop/${el.name}/${el._id}`}>
                    {el.name}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {strings["contact_us"]}
          </Link>
        </li>
        <li>
          {isLoggedIn && <Link to={process.env.PUBLIC_URL + "/my-account"}>
            {strings["my_account"]}
          </Link>}
        </li>
        <li>
          {isLoggedIn ? <Link to="#" onClick={handleLogout}>
            logout
          </Link> : <Link to={process.env.PUBLIC_URL + "/login-register"}>
            {strings["login_register"]}
          </Link>}

        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
};

export default multilanguage(MobileNavMenu);
