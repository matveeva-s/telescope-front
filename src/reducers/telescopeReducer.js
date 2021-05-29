import { TELESCOPES_ACTIONS } from '../actions/actionTypes';

const initialState = {
    telescopes: [],
    error: false,
    isLoading: false,
};

export const telescopeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TELESCOPES_ACTIONS.GET_TELESCOPES_LIST_START:
            return {
                ...state,
                isLoading: true,
            };
        case TELESCOPES_ACTIONS.GET_TELESCOPES_LIST_FINISH: {
            const data = action.payload;
            return {
                ...state,
                telescopes: data,
                isLoading: false,
            };
        }
        case TELESCOPES_ACTIONS.GET_TELESCOPES_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        default:
            return state
    }
};


