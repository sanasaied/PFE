import PropTypes from "prop-types";
import React from "react";
import { changeLanguage } from "redux-multilanguage";

const LanguageCurrencyChanger = ({
  currentLanguageCode,
  dispatch
}) => {
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span>
          {currentLanguageCode === "en"
            ? "English"
            : currentLanguageCode === "fn"
              ? "French"
              : ""}{" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="en" onClick={e => changeLanguageTrigger(e)}>
                English
              </button>
            </li>
            {/* <li>
              <button value="fn" onClick={e => changeLanguageTrigger(e)}>
                French
              </button>
            </li> */}
          </ul>
        </div>
      </div>

    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

export default LanguageCurrencyChanger;
