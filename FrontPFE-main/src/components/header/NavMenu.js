import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  const category = useSelector((state) => state.category.category)

  return (
    <div
      className={` ${sidebarMenu
        ? "sidebar-menu"
        : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
        } `}
      style={{ width: '100% !important' }}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["home"]}
            </Link>
            {/* <ul className="mega-menu mega-menu-padding">
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      {strings["home_group_one"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-fashion"}>
                      {strings["home_fashion"]}
                    </Link>
                  </li>
                 
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-kids-fashion"}>
                      {strings["home_kids_fashion"]}
                    </Link>
                  </li>
                 
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture"}>
                      {strings["home_furniture"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-two"}>
                      {strings["home_furniture_two"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-five"}>
                      {strings["home_furniture_five"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-six"}>
                      {strings["home_furniture_six"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-electronics-two"}>
                      {strings["home_electronics_two"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-organic-food"}>
                      {strings["home_organic_food"]}
                    </Link>
                  </li>
                </ul>
              </li>
             
            </ul> */}
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/about"}>
              {" "}
              {strings["about_us"]}

            </Link>

          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop"}>
              {" "}
              {strings["shop"]}

            </Link>

          </li>
          <li>
            <Link to='#'>
              {strings["categories"]}
              <i className="fa fa-angle-down" />
            </Link>
            <ul className="submenu">
              {category && category?.map((el) => (
                <li key={el._id}>
                  <Link to={process.env.PUBLIC_URL + `/shop/${el.name}/${el._id}`}>
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {/**    <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["pages"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/cart"}>
                  {strings["cart"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/checkout"}>
                  {strings["checkout"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                  {strings["wishlist"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/compare"}>
                  {strings["compare"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  {strings["my_account"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  {strings["login_register"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/about"}>
                  {strings["about_us"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/contact"}>
                  {strings["contact_us"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/not-found"}>
                  {strings["404_page"]}
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
              {strings["blog"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                  {strings["blog_standard"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-no-sidebar"}>
                  {strings["blog_no_sidebar"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-right-sidebar"}>
                  {strings["blog_right_sidebar"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  {strings["blog_details_standard"]}
                </Link>
              </li>
            </ul>
          </li>
          <li> */}
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {strings["contact_us"]}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default multilanguage(NavMenu);
