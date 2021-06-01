import { RSAA } from 'redux-api-middleware'
import { TASK_ACTIONS, BALANCE_ACTIONS } from "./actionTypes";
import { credentialsHeaders } from '../constants/appConstants';
import { balancesApiUrls, baseApiURL } from "./apiUrls";


export const getBalanceRequests = (options = {}) => dispatch => {
  const token = localStorage.getItem('access_token');
  return dispatch({
    [RSAA]: {
      endpoint: baseApiURL + balancesApiUrls.requests,
      headers: credentialsHeaders(token),
      method: 'GET',
      types: [
          BALANCE_ACTIONS.GET_BALANCE_REQUESTS_START,
          BALANCE_ACTIONS.GET_BALANCE_REQUESTS_FINISH,
          BALANCE_ACTIONS.GET_BALANCE_REQUESTS_FAIL,
      ]
    }
  })
};

export const saveRequest = (data) => dispatch => {
  const token = localStorage.getItem('access_token');
  return dispatch({
    [RSAA]: {
      endpoint: baseApiURL + balancesApiUrls.saveRequest,
      headers: credentialsHeaders(token),
      method: 'POST',
      body: JSON.stringify(data),
      types: [
          BALANCE_ACTIONS.SAVE_REQUEST_START,
          BALANCE_ACTIONS.SAVE_REQUEST_FINISH,
          BALANCE_ACTIONS.SAVE_REQUEST_FAIL,
      ]
    }
  })
};
