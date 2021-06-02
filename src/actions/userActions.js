import { RSAA } from 'redux-api-middleware'
import {USER_ACTIONS} from "./actionTypes";
import { credentialsHeaders } from '../constants/appConstants';
import {userApiUrls, baseApiURL, tasksApiUrls} from "./apiUrls";

export const getUserInfo = (options = {}) => dispatch => {
  const token = localStorage.getItem('access_token');
  return dispatch({
    [RSAA]: {
      endpoint: baseApiURL + userApiUrls.mainUserInfo,
      headers: credentialsHeaders(token),
      method: 'GET',
      types: [
          USER_ACTIONS.GET_USER_INFO_START,
          USER_ACTIONS.GET_USER_INFO_FINISH,
          USER_ACTIONS.GET_USER_INFO_FAIL
      ]
    }
  })
};

export const changeUserProfileField = (fieldName, value) => dispatch => {
    return dispatch({
        type: USER_ACTIONS.CHANGE_USER_PROFILE_FIELD,
        payload: { fieldName, value }
    })
};


export const saveProfile = (data) => dispatch => {
  const token = localStorage.getItem('access_token');
  return dispatch({
    [RSAA]: {
      endpoint: baseApiURL + userApiUrls.saveProfile,
      headers: credentialsHeaders(token),
      method: 'PUT',
      body: JSON.stringify(data),
      types: [
          USER_ACTIONS.SAVE_PROFILE_START,
          USER_ACTIONS.SAVE_PROFILE_FINISH,
          USER_ACTIONS.SAVE_PROFILE_FAIL,
      ]
    }
  })
};

export const closeNotification = () => dispatch => {
    return dispatch({
        type: USER_ACTIONS.CLOSE_NOTIFICATION,
    })
};
