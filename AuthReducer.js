import { UPDATE_LOGIN_DATA } from "../Types";

export const INITIAL_STATE = {
    loginRes: '',
};

const AuthReducer  = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_LOGIN_DATA:
            return { ...state, loginRes: action.payload }
        default:
            return state;
    }
}
export default AuthReducer;
