import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useForm } from "react-hook-form";
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import { login, register } from "../../redux/actions/authActions";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState({})
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const isLoggedIn = useSelector((state) => state.auth.user)

  const history = useHistory()
  const dispatch = useDispatch()
  const { register: registerForm1, handleSubmit: handleSubmitLogin
  } = useForm();
  const { register: registerForm2, handleSubmit: handleSubmitRegister } = useForm();

  const onSubmitLogin = (data) => {
    setLoginLoading(true)
    setLoginError("")
    dispatch(login(data, setLoginError, setLoginLoading, history))
  }
  const onSubmitRegister = (data) => {
    setRegisterLoading(true)
    setRegisterError({})
    const registerData = { ...data }
    if (!data.referredBy) delete registerData.referredBy
    dispatch(register(registerData, setRegisterError, setRegisterLoading, history))
  }
  useEffect(() => {
    if (isLoggedIn) return history.push('/')
    setActiveTab("login");

  }, [location, isLoggedIn])

  return (
    <Fragment>
      <MetaTags>
        <title>Test | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey={"login"} activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login" >
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                {...registerForm1("email")}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...registerForm1("password")}
                              />
                              {loginError && <Alert variant={'danger'}>
                                {loginError}  </Alert>}
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  {/* <input type="checkbox" />
                                  <label className="ml-10">Remember me</label> */}
                                  <Link to={process.env.PUBLIC_URL + "/reset-password"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit" disabled={loginLoading}>
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
                              <input
                                type="text"
                                name="fullName"
                                placeholder="Full name"
                                {...registerForm2("fullName")}

                              />
                              <p className="form-error">{registerError['fullName']} </p>
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                {...registerForm2("email")}
                              />
                              <p className="form-error">{registerError['email']} </p>

                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...registerForm2("password")}
                              />
                              <p className="form-error">{registerError['password']} </p>

                              <input
                                type="phone"
                                name="text"
                                placeholder="Phone"
                                {...registerForm2("phoneNumber")}
                              />
                              <p className="form-error">{registerError['phoneNumber']} </p>

                              <input
                                type="date"
                                name="birthday"
                                placeholder="Birthday"
                                {...registerForm2("birthday")}
                              />
                              <input
                                type="text"
                                name="referredBy"
                                placeholder="Referral code"
                                {...registerForm2("referredBy")}
                              />
                              <p className="form-error">{registerError['generalError']} </p>

                              {/* <Form.Check inline name="group1" type={'radio'} id={`inline-radio-1`}>test</Form.Check> */}
                              {/* <Form.Check inline label="2fsfsd" name="group1" type={'radio'} id={`inline-radio-2`} /> */}
                              <div className="button-box">
                                <button type="submit" disabled={registerLoading}>
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;
