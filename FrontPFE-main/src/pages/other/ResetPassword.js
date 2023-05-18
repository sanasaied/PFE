import React, { Fragment, useState } from "react";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MetaTags from "react-meta-tags";
import { useHistory } from "react-router-dom";
import createRequest from "../../helpers/axiosRequest";
import LayoutOne from "../../layouts/LayoutOne";

const ResetPassword = () => {
    const request = createRequest()
    const { register, handleSubmit } = useForm();
    const [resetLoading, setResetLoading] = useState(false)
    const [resetError, setResetError] = useState("")
    const history = useHistory()
    const onSubmitReset = async (data) => {
        if (!data.email) return;
        setResetLoading(true)
        setResetError("")
        try {
            const res = await request.patch('/user/auth/reset', data);
            if (!res.data) return setResetError('please verify your email')
            history.push({
                pathname: '/reset-password/update',
                search: `?id=${res.data.id}`
            })
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
                <title>forgot password</title>
                <meta
                    name="description"
                />
            </MetaTags>

            <LayoutOne headerTop="visible">

                <div className="error-area pt-40 pb-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8 text-center">
                                <Alert variant="info"> please enter your email address </Alert>
                                <div className="login-register-wrapper">
                                    <div className="login-form-container">
                                        <div className="login-register-form">
                                            <form onSubmit={handleSubmit(onSubmitReset)}>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    {...register("email")}
                                                />

                                                {resetError && <Alert variant={'danger'}>{resetError}  </Alert>}                            <div className="button-box">
                                                    <div className="login-toggle-btn">

                                                    </div>
                                                    <button type="submit" disabled={resetLoading}>
                                                        <span>Reset</span>
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



export default ResetPassword;
