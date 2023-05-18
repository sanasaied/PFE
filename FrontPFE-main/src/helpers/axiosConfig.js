import axios from "axios";
import { LOGOUT } from "../redux/actions/authActions";
import store from "../redux/store"
import history from "./history"
import { removeToken } from "./token";

axios.interceptors.response.use(
    function (response) {
        // 200 type responses, this should be left as it is
        return response;
    },
    function (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.log('logging out', error.response);
            if (store.getState().auth.user) {
                //todo uncomment when cors error solved
                // removeToken()
                // store.dispatch({
                //     type: LOGOUT,
                // })
                // history.push('/login-register')
            }
        }
        return Promise.reject(error);
    }
);
