import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_favorite_USER,
    GET_favorite_ITEMS_USER,
    REMOVE_favorite_ITEM_USER,
    ON_SUCCESS_BUY_USER
} from '../_actions/types';


export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case ADD_TO_favorite_USER:
            return {
                ...state, userData: {
                    ...state.userData,
                    favorite: action.payload
                }
            }
        case GET_favorite_ITEMS_USER:
            return {
                ...state, favoriteDetail: action.payload
            }
        case REMOVE_favorite_ITEM_USER:
            return {
                ...state,
                favoriteDetail: action.payload.favoriteDetail,
                userData: {
                    ...state.userData,
                    favorite: action.payload.favorite
                }

            }
        case ON_SUCCESS_BUY_USER:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    favorite: action.payload.favorite
                },
                favoriteDetail: action.payload.favoriteDetail
            }

        default:
            return state;
    }
}