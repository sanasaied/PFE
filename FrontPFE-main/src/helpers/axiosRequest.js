import axios from "axios";
import { getToken, removeToken } from "../helpers/token"
import { LOGOUT } from "../redux/actions/authActions";
import history from "./history"
const createRequest = (store) => {
    const token = getToken()
    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}`,
        headers: {
            'access_token': token ? `${token}` : ""
        }
    });
    if (store) {
        instance.interceptors.response.use(
            function (response) {
                // 200 type responses, this should be left as it is
                return response;
            },
            function (error) {
                if (error.response && (error.response.status === 401 || error.response.status === 403
                    || error.response.status === 400 && error.response.data == 'Invalid Token')) {
                    console.log('logging out', error.response);
                    if (store.getState().auth.user) {
                        removeToken()
                        store.dispatch({
                            type: LOGOUT,
                        })
                        history.push('/login-register')

                    }
                }
                return Promise.reject(error);
            }
        );
    }
    return instance;


}
export default createRequest;