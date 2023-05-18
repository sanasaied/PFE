import { LOGOUT } from "../redux/actions/authActions"
import store from "../redux/store"
import history from "./history"
import { removeToken } from "./token"
export const logout = () => {
    store.dispatch({
        type: LOGOUT
    })
    history.push('/login-register')
}