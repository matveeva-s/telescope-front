import { BALANCE_ACTIONS } from '../actions/actionTypes';

const initialState = {
    requests: [],
};

export const balanceReducer = (state = initialState, action) => {
    switch (action.type) {

        case BALANCE_ACTIONS.GET_BALANCE_REQUESTS_FINISH : {
            const data = action.payload;
            return {
                ...state,
                requests: data,
            }
        }

        default:
            return state

    }
}
