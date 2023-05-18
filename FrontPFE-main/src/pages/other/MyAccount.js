import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useForm } from "react-hook-form";
import createRequest from "../../helpers/axiosRequest";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { UPDATE_USER } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const MyAccount = ({ location }) => {
  const { pathname } = location;
  const user = useSelector((state) => state.auth.user)
  const history = useHistory()
  const { addToast } = useToasts();
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false)
  const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false)
  const { register: registerProfileUpdate, handleSubmit: handleSubmitProfileUpdate } = useForm();
  const { register: registerPasswordUpdate, handleSubmit: handleSubmitPasswordUpdate } = useForm();
  const request = createRequest()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('0')

  const onSubmitProfileUpdate = async (data) => {
    setProfileUpdateLoading(true)
    try {
      const res = await request.patch(`/user/update/${user?._id}`, data)
      addToast('profile saved', {
        appearance: "success", autoDismiss: true
      })
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      })
      setActiveTab('1')
    } catch (error) {
      addToast('an error has occured', {
        appearance: "error", autoDismiss: true
      })
    }
    finally {
      setProfileUpdateLoading(false)
    }
  }
  const onSubmitPasswordUpdate = async (data) => {
    if (data.password !== data['password_confirm'])
      return addToast("the two passwords don't match", {
        appearance: "error", autoDismiss: true
      })
    setPasswordUpdateLoading(true)
    try {
      const res = await request.patch(`/user/auth/updatePassword/${user?._id}`, {
        password: data.password,
        oldPassword: data.oldPassword
      })
      addToast('new password saved', {
        appearance: "success", autoDismiss: true
      })
      setActiveTab('3')
    } catch (error) {
      console.log(error.response)
      addToast(error?.response.data?.errors ? error.response.data.errors[0].msg
        : error?.response.data?.message ? error.response.data.message : 'an error has occured', {
        appearance: "error", autoDismiss: true
      })
    }
    finally {
      setPasswordUpdateLoading(false)
    }
  }
  useEffect(() => {
    if (!user) return history.push('/login-register')

  }, [user])

  return (
    <Fragment>
      <MetaTags>
        <title>Test | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <div className="referral-infos">
                    <div>
                      <span className="title">My Refferal Code:  </span> <span> {user?.referralCode} </span>
                    </div>
                    <div>
                      <span className="title">Reffered Users:  </span> <span> {user?.referredUsers?.length} </span>
                    </div>
                  </div>
                  <Accordion defaultActiveKey="0" activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <form onSubmit={handleSubmitProfileUpdate(onSubmitProfileUpdate)}>

                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>My Account Information</h4>
                                <h5>Your Personal Details</h5>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Full Name</label>
                                    <input
                                      name="fullName"
                                      defaultValue={user?.fullName || ''}
                                      {...registerProfileUpdate("fullName")}
                                      type="text" />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Email Address</label>
                                    <input
                                      name="email"
                                      defaultValue={user?.email || ''}
                                      {...registerProfileUpdate("email")}
                                      type="email" />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Phone</label>
                                    <input
                                      name="phoneNumber"
                                      defaultValue={user?.phoneNumber || ''}
                                      {...registerProfileUpdate("phoneNumber")}
                                      type="text" />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Birthday</label>
                                    <input
                                      name="birthday"
                                      defaultValue={new Date(user?.birthday || 0)?.toISOString().split('T')[0] || ''}
                                      {...registerProfileUpdate("birthday")}
                                      type="date" />
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button disabled={profileUpdateLoading} type="submit">Continue</button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <form onSubmit={handleSubmitPasswordUpdate(onSubmitPasswordUpdate)}>

                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Change Password</h4>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Old Password</label>
                                    <input type="password" name="oldPassword" autoComplete={false}
                                      {...registerPasswordUpdate("oldPassword")}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Password</label>
                                    <input type="password" name="password"
                                      {...registerPasswordUpdate("password")}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Password Confirm</label>
                                    <input type="password" name='password_confirm'
                                      {...registerPasswordUpdate("password_confirm")}

                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button disabled={passwordUpdateLoading} type="submit">Update password</button>
                                </div>
                              </div>
                            </div>
                          </form>

                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {/* <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Modify your address book entries{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>Farhana hayder (shuvo) </p>
                                    <p>hastech </p>
                                    <p> Road#1 , Block#c </p>
                                    <p> Rampura. </p>
                                    <p>Dhaka </p>
                                    <p>Bangladesh </p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button className="edit">Edit</button>
                                    <button>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card> */}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object
};

export default MyAccount;
