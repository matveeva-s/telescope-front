import { RSAA } from 'redux-api-middleware'
import { TELESCOPES_ACTIONS } from "./actionTypes";
import { credentialsHeaders } from '../constants/appConstants';
import { telescopesApiUrls, baseApiURL } from "./apiUrls";


export const getTelescopesList = (options = {}) => dispatch => {
  const token = localStorage.getItem('access_token');
  return dispatch({
    [RSAA]: {
      endpoint: baseApiURL + telescopesApiUrls.telescopesList,
      headers: credentialsHeaders(token),
      method: 'GET',
      types: [
          TELESCOPES_ACTIONS.GET_TELESCOPES_LIST_START,
          TELESCOPES_ACTIONS.GET_TELESCOPES_LIST_FINISH,
          TELESCOPES_ACTIONS.GET_TELESCOPES_LIST_FAIL
      ]
    }
  })
};
