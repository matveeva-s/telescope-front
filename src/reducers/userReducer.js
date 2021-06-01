import { USER_ACTIONS } from '../actions/actionTypes';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    gender: 1,
    company: '',
    position: '',
    firstNameError: false,
    lastNameError: false,
    emailError: false,
};


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ACTIONS.GET_USER_INFO_FINISH: {
            const data = action.payload;
            return {
                ...state,
                firstName: data.firstName,
                lastName: data.lastName,
                avatar: data.avatar,
                company: data.company,
                position: data.position,
                email: data.email,
                gender: data.gender,
            };
        }

        case USER_ACTIONS.CHANGE_USER_PROFILE_FIELD: {
            const { fieldName, value } = action.payload;
            const errorFieldName = fieldName + 'Error';
            return {
                ...state,
                [fieldName]: value,
                [errorFieldName]: false,
            };
        }

        default:
            return state
    }
};


