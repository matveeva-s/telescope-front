import {BALANCE_ACTIONS} from '../actions/actionTypes';

const initialState = {
    requests: [],
    notificationMessage: '',
    notificationLevel: '',
    notificationIsOpen: false,
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

        case BALANCE_ACTIONS.SAVE_REQUEST_FINISH: {
            const data = action.payload;
            return {
                ...state,
                notificationMessage: data,
                notificationLevel: 'success',
                notificationIsOpen: true,
            }
        }

        case BALANCE_ACTIONS.SAVE_REQUEST_FAIL: {
            return {
                ...state,
                notificationMessage: 'Не удалось отправить заявку, что-то поломалось :(',
                notificationLevel: 'error',
                notificationIsOpen: true,
            }
        }

        case BALANCE_ACTIONS.CLOSE_NOTIFICATION: {
            return {
                ...state,
                notificationLevel: '',
                notificationMessage: '',
                notificationIsOpen: false,
            }
        }

        default:
            return state

    }
}
