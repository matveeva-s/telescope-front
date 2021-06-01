export const USER_ACTIONS = {
    GET_USER_INFO_START: 'USER.GET_USER_INFO_START',
    GET_USER_INFO_FINISH: 'USER.GET_USER_INFO_FINISH',
    GET_USER_INFO_FAIL: 'USER.GET_USER_INFO_FAIL',

    USER_LOGIN_START: 'USER.USER_LOGIN_START',
    USER_LOGIN_FINISH: 'USER.USER_LOGIN_FINISH',
    USER_LOGIN_FAIL: 'USER.USER_LOGIN_FAIL',
};


export const TELESCOPES_ACTIONS = {
    GET_TELESCOPES_LIST_START: 'TELESCOPES.GET_TELESCOPES_LIST_START',
    GET_TELESCOPES_LIST_FINISH: 'TELESCOPES.GET_TELESCOPES_LIST_FINISH',
    GET_TELESCOPES_LIST_FAIL: 'TELESCOPES.GET_TELESCOPES_LIST_FAIL',
};

export const BALANCE_ACTIONS = {
    GET_BALANCE_REQUESTS_START: 'TASKS.GET_BALANCE_REQUESTS_START',
    GET_BALANCE_REQUESTS_FINISH: 'TASKS.GET_BALANCE_REQUESTS_FINISH',
    GET_BALANCE_REQUESTS_FAIL: 'TASKS.GET_BALANCE_REQUESTS_FAIL',

    SAVE_REQUEST_START: 'TASKS.SAVE_REQUEST_START',
    SAVE_REQUEST_FINISH: 'TASKS.SAVE_REQUEST_FINISH',
    SAVE_REQUEST_FAIL: 'TASKS.SAVE_REQUEST_FAIL',
};


export const TASK_ACTIONS = {
    GET_TELESCOPE_WITH_BALANCES_START: 'TASKS.GET_TELESCOPE_WITH_BALANCES_START',
    GET_TELESCOPE_WITH_BALANCES_FINISH: 'TASKS.GET_TELESCOPE_WITH_BALANCES_FINISH',
    GET_TELESCOPE_WITH_BALANCES_FAIL: 'TASKS.GET_TELESCOPE_WITH_BALANCES_FAIL',

    CHANGE_FORM_FIELD: 'TASKS.CHANGE_FORM_FIELD',
    RAISE_ERROR_IN_MAIN_TASK_PART: 'TASKS.RAISE_ERROR_IN_MAIN_TASK_PART',

    CLOSE_NOTIFICATION: 'TASKS.CLOSE_NOTIFICATION',

    CHANGE_POINT_FORM_FIELD: 'TASKS.CHANGE_POINT_FORM_FIELD',
    ADD_POINT: 'TASKS.ADD_POINT',
    DELETE_POINT: 'TASKS.DELETE_POINT',
    RAISE_ERRORS_IN_POINTS_TASK: 'TASKS.RAISE_ERRORS_IN_POINTS_TASK',
    SAVE_POINT_TASK_START: 'TASKS.SAVE_POINT_TASK_START',
    SAVE_POINT_TASK_FINISH: 'TASKS.SAVE_POINT_TASK_FINISH',
    SAVE_POINT_TASK_FAIL: 'TASKS.SAVE_POINT_TASK_FAIL',

    CHANGE_TRACKING_TASK_FORM_FIELD: 'TASKS.CHANGE_TRACKING_TASK_FORM_FIELD',
    ADD_TRACKING_TASK_TRACK: 'TASKS.ADD_TRACKING_TASK_TRACK',
    ADD_TRACKING_TASK_FRAME: 'TASKS.ADD_TRACKING_TASK_FRAME',
    CHANGE_TRACKING_TASK_TRACK_FORM_FIELD: 'TASKS.CHANGE_TRACKING_TASK_TRACK_FORM_FIELD',
    CHANGE_TRACKING_TASK_FRAME_FORM_FIELD: 'TASKS.CHANGE_TRACKING_TASK_FRAME_FORM_FIELD',
    DELETE_TRACKING_TASK_TRACK: 'TASKS.DELETE_TRACKING_TASK_TRACK',
    DELETE_TRACKING_TASK_FRAME: 'TASKS.DELETE_TRACKING_TASK_FRAME',
    RAISE_ERRORS_IN_TRACKING_TASK: 'TASKS.RAISE_ERRORS_IN_TRACKING_TASK',
    SAVE_TRACKING_TASK_START: 'TASKS.SAVE_TRACKING_TASK_START',
    SAVE_TRACKING_TASK_FINISH: 'TASKS.SAVE_TRACKING_TASK_FINISH',
    SAVE_TRACKING_TASK_FAIL: 'TASKS.SAVE_TRACKING_TASK_FAIL',


    CHANGE_TLE_TASK_FORM_FIELD: 'TASKS.CHANGE_TLE_TASK_FORM_FIELD',
    ADD_TLE_TASK_FRAME: 'TASKS.ADD_TLE_TASK_FRAME',
    CHANGE_TLE_TASK_FRAME_FORM_FIELD: 'TASKS.CHANGE_TLE_TASK_FRAME_FORM_FIELD',
    DELETE_TLE_TASK_FRAME: 'TASKS.DELETE_TLE_TASK_FRAME',
    RAISE_ERRORS_IN_TLE_TASK: 'TASKS.RAISE_ERRORS_IN_TLE_TASK',
    SAVE_TLE_TASK_START: 'TASKS.SAVE_TLE_TASK_START',
    SAVE_TLE_TASK_FINISH: 'TASKS.SAVE_TLE_TASK_FINISH',
    SAVE_TLE_TASK_FAIL: 'TASKS.SAVE_TLE_TASK_FAIL',
};
