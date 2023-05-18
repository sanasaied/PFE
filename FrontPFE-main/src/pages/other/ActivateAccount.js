import React, { Fragment, useState } from "react";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MetaTags from "react-meta-tags";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import createRequest from "../../helpers/axiosRequest";
import LayoutOne from "../../layouts/LayoutOne";

const ActivateAccount = () => {
    const request = createRequest()
    const { register, handleSubmit } = useForm();
    const [activationLoading, setActivationLoading] = useState(false)
    const [activationError, setActivationError] = useState("")
    const history = useHistory()
    const onSubmitActivation = async (data) => {
        setActivationLoading(true)
        setActivationError("")
        try {
            const res = await request.patch('/user/auth/activate', {
                email: data.email,
                code: Number(data.code)
            });
            //add toast
            history.push('/login-register')

        } catch (error) {
            setActivationError(error.response.data.message || 'an error has occured')
        }
        finally {
            setActivationLoading(false)
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
                                <Alert variant="info"> We've sent you an activation code, please check your email </Alert>
                                <div className="login-register-wrapper">
                                    <div className="login-form-container">
                                        <div className="login-register-form">
                                            <form onSubmit={handleSubmit(onSubmitActivation)}>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    {...register("email")}
                                                />
                                                <input
                                                    type="text"
                                                    name="code"
                                                    placeholder="Activation code"
                                                    {...register("code")}
                                                />
                                                {activationError && <Alert variant={'danger'}>{activationError}  </Alert>}                            <div className="button-box">
                                                    <div className="login-toggle-btn">

                                                    </div>
                                                    <button type="submit" disabled={activationLoading}>
                                                        <span>Activate</span>
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



export default ActivateAccount;
