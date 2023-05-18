import createRequest from "../../helpers/axiosRequest";
import store from "../store";
import { saveToken } from "../../helpers/token";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_PRODUCTS_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const UPDATE_USER = "UPDATE_USER";

export const fetchUser = async (dispatch, addToast) => {
    const request = createRequest(store)

    return await request
        .get(`/user/current-user`, {
        })
        .then(response => {
            return dispatch({
                type: FETCH_USER_SUCCESS,
                payload: response.data
            });
        })
        .catch(err => {
            console.log("Error: ", err);
        });
};
export const login = (data, setError, setLoading, history) => async (dispatch) => {
    const request = createRequest(store)

    return await request
        .post(`/user/auth/login`, data)
        .then(response => {
            saveToken(response.data.token)
            dispatch({
                type: LOGIN,
                payload: response.data
            });
            return history.push({
                pathname: '/',
            })
        })
        .catch(err => {
            console.log("Error: ", err);
            setError(err.response.data.message)

        }).finally(_ => {
            setLoading(false)

        })
};
export const register = (data, setError, setLoading, history) => async (dispatch) => {
    const request = createRequest(store)
    return await request
        .post(`/user/auth/register`, data)
        .then(response => {
            history.push({
                pathname: '/activate-account',
            })
        })
        .catch(err => {
            const errorsArray = err.response.data.errors || [];
            const errorsObject = {}
            if (errorsArray.length == 0) {
                return setError({ generalError: err.response.data.message })
            }
            errorsArray.forEach(err => {
                errorsObject[err.param] = err.msg
            });
            setError(errorsObject)
        }).finally(_ => {
            setLoading(false)

        })
};