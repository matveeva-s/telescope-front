import { USER_ACTIONS } from '../actions/actionTypes';

const initialState = {
    firstName: '',
    lastName: '',
    avatar: null,
    email: null,
    status: 'nothing',
    error: '',
};

//'idle' | 'loading' | 'succeeded' | 'failed'

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ACTIONS.GET_USER_INFO_START:
            return {
                ...state,
                status: 'loading',
            };
        case USER_ACTIONS.GET_USER_INFO_FINISH: {
            const data = action.payload;
            return {
                ...state,
                firstName: data.firstName,
                lastName: data.lastName,
                avatar: data.avatar,
                status: 'succeeded',
            };
        }
        case USER_ACTIONS.GET_USER_INFO_FAIL:
            return {
                ...state,
                status: 'failed',
            };
        default:
            return state
    }
};


