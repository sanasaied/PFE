import { UPDATE_USER, LOGIN, LOGOUT, FETCH_USER_SUCCESS, } from "../actions/authActions";

const initState = {
    user: null,
    // token: ""
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };

        case LOGIN:
            return {
                ...state,
                user: action.payload.user,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            };
        case LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            break;
    }

    return state;
};

export default authReducer;
