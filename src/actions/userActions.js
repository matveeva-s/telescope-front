import { RSAA } from 'redux-api-middleware'
import { USER_ACTIONS } from "./actionTypes";
import { credentialsHeaders } from '../constants';
import { userApiUrls, baseApiURL } from "./apiUrls";

export const getUserInfo = (options = {}) => dispatch => {
  console.log(localStorage.getItem('access_token'));
  console.log(credentialsHeaders);
  return dispatch({
    [RSAA]: {
      endpoint: baseApiURL + userApiUrls.mainUserInfo,
      headers: credentialsHeaders,
      method: 'GET',
      types: [
          USER_ACTIONS.GET_USER_INFO_START,
          USER_ACTIONS.GET_USER_INFO_FINISH,
          USER_ACTIONS.GET_USER_INFO_FAIL
      ]
    }
  })
};

