import React, { Fragment, useState } from "react";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MetaTags from "react-meta-tags";
import { useHistory, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import createRequest from "../../helpers/axiosRequest";
import LayoutOne from "../../layouts/LayoutOne";

const UpdatePassword = () => {
    const request = createRequest()
    const { addToast } = useToasts();

    const { register, handleSubmit } = useForm();
    const [resetLoading, setResetLoading] = useState(false)
    const [resetError, setResetError] = useState("")
    const history = useHistory()
    const location = useLocation()
    const onSubmitReset = async (data) => {
        setResetLoading(true)
        setResetError("")
        try {
            const userId = location.search.replace('?id=', '');
            const verifyRes = await request.get(`/user/auth/verify/${userId}/${data.code}`)
            if (verifyRes.status === 200) {
                const res = await request.patch(`/user/auth/updateResetPassword/${userId}`, {
                    password: data.password
                });
                addToast("your password has been changed successfully", {
                    appearance: "success"
                })
                history.push('/login-register')

            }

        } catch (error) {
            setResetError(error.response.data.message || 'an error has occured')
        }
        finally {
            setResetLoading(false)
        }
    }
    return (
        <Fragment>
            <MetaTags>
                <title>activate</title>
                <meta
                    name="description"
                />
            </MetaTags>

            <LayoutOne headerTop="visible">

                <div className="error-area pt-40 pb-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8 text-center">
                                <Alert variant="secondary"> Choose new password </Alert>
                                <div className="login-register-wrapper">
                                    <div className="login-form-container">
                                        <div className="login-register-form">
                                            <form onSubmit={handleSubmit(onSubmitReset)}>

                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="New Password"
                                                    {...register("password")}
                                                />
                                                <input
                                                    type="text"
                                                    name="code"
                                                    placeholder="Reset Code"
                                                    {...register("code")}
                                                />
                                                {resetError && <Alert variant={'danger'}>{resetError}  </Alert>}                            <div className="button-box">
                                                    <div className="login-toggle-btn">

                                                    </div>
                                                    <button type="submit" disabled={resetLoading}>
                                                        <span>Update</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};



export default UpdatePassword;
