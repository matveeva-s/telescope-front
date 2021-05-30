import { RSAA } from 'redux-api-middleware'
import { TASK_ACTIONS } from "./actionTypes";
import { credentialsHeaders } from '../constants/appConstants';
import { tasksApiUrls, baseApiURL } from "./apiUrls";

// for tasks
export const getTelescopesWithBalances = (options = {}) => dispatch => {
  const token = localStorage.getItem('access_token');
  return dispatch({
    [RSAA]: {
      endpoint: baseApiURL + tasksApiUrls.telescopesWithBalances,
      headers: credentialsHeaders(token),
      method: 'GET',
      types: [
          TASK_ACTIONS.GET_TELESCOPE_WITH_BALANCES_START,
          TASK_ACTIONS.GET_TELESCOPE_WITH_BALANCES_FINISH,
          TASK_ACTIONS.GET_TELESCOPE_WITH_BALANCES_FAIL
      ]
    }
  })
};


export const closeNotification = () => dispatch => {
    return dispatch({
      type: TASK_ACTIONS.CLOSE_NOTIFICATION,
  })
};

// for main task form
export const changeFormField = (fieldName, value) => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.CHANGE_FORM_FIELD,
      payload: { fieldName, value }
  })
};

export const raiseErrorInMainTaskPart = (fieldName, value) => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.RAISE_ERROR_IN_MAIN_TASK_PART,
      payload: { fieldName, value }
  })
};

// for points task mode
export const changePointFormField = (index, fieldName, value) => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.CHANGE_POINT_FORM_FIELD,
      payload: { index, fieldName, value }
  })
};

export const addPoint = () => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.ADD_POINT,
  })
};

export const deletePoint = index => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.DELETE_POINT,
      payload: { index },
  })
};

export const savePointTask = (data) => dispatch => {
  const token = localStorage.getItem('access_token');
  return dispatch({
    [RSAA]: {
      endpoint: baseApiURL + tasksApiUrls.savePointTask,
      headers: credentialsHeaders(token),
      method: 'POST',
      body: JSON.stringify(data),
      types: [
          TASK_ACTIONS.SAVE_POINT_TASK_START,
          TASK_ACTIONS.SAVE_POINT_TASK_FINISH,
          TASK_ACTIONS.SAVE_POINT_TASK_FAIL,
      ]
    }
  })
};

export const raiseErrorInPointsTask = (errors) => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.RAISE_ERRORS_IN_POINTS_TASK,
      payload: { errors },
  })
};


// for tracking task field

export const changeTrackingTaskFormField = (fieldName, value) => dispatch => {
    return dispatch({
      type: TASK_ACTIONS.CHANGE_TRACKING_TASK_FORM_FIELD,
      payload: { fieldName, value },
  })
};

export const addTrackingTaskTrack = () => dispatch => {
    return dispatch({
      type: TASK_ACTIONS.ADD_TRACKING_TASK_TRACK,
  })
};

export const addTrackingTaskFrame = () => dispatch => {
    return dispatch({
      type: TASK_ACTIONS.ADD_TRACKING_TASK_FRAME,
  })
};

export const deleteTrackingTaskTrack = (index) => dispatch => {
    return dispatch({
      type: TASK_ACTIONS.DELETE_TRACKING_TASK_TRACK,
      payload: { index },
  })
};

export const deleteTrackingTaskFrame = (index) => dispatch => {
    return dispatch({
      type: TASK_ACTIONS.DELETE_TRACKING_TASK_FRAME,
      payload: { index },
  })
};

export const changeTrackingTaskTrackFormField = (index, fieldName, value) => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.CHANGE_TRACKING_TASK_TRACK_FORM_FIELD,
      payload: { index, fieldName, value }
  })
};

export const changeTrackingTaskFrameFormField = (index, fieldName, value) => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.CHANGE_TRACKING_TASK_FRAME_FORM_FIELD,
      payload: { index, fieldName, value }
  })
};

export const raiseErrorInTrackingTask = (errors) => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.RAISE_ERRORS_IN_TRACKING_TASK,
      payload: { errors },
  })
};

// tle task actions

export const changeTLETaskFormField = (fieldName, value) => dispatch => {
    return dispatch({
      type: TASK_ACTIONS.CHANGE_TLE_TASK_FORM_FIELD,
      payload: { fieldName, value },
  })
};

export const addTLETaskFrame = () => dispatch => {
    return dispatch({
      type: TASK_ACTIONS.ADD_TLE_TASK_FRAME,
  })
};

export const changeTLETaskFrameFormField = (index, fieldName, value) => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.CHANGE_TLE_TASK_FRAME_FORM_FIELD,
      payload: { index, fieldName, value }
  })
};


export const deleteTLETaskFrame = (index) => dispatch => {
    return dispatch({
      type: TASK_ACTIONS.DELETE_TLE_TASK_FRAME,
      payload: { index },
  })
};

export const raiseErrorsInTleTask = (errors) => dispatch => {
  return dispatch({
      type: TASK_ACTIONS.RAISE_ERRORS_IN_TLE_TASK,
      payload: { errors },
  })
};
