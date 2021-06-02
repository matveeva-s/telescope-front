import { TASK_ACTIONS, BALANCE_ACTIONS } from '../actions/actionTypes';

const initialState = {
    telescopesWithBalances: [],
    requests: [],
    telescope: null,
    taskType: null,
    error: false,
    isLoading: false,
    points: [],
    trackingData: {
        satellite: null,
        mag: null,
        count: null,
        track: [],
        frames: [],
    },
    tleData: {
        satellite: null,
        line1: null,
        line2: null,
        frames: [],
    },

    telescopeError: false,
    taskTypeError: false,
    pointsErrors: [],
    trackingDataErrors: {
        satellite: false,
        mag: false,
        count: false,
        track: [],
        frames: [],
    },
    tleDataErrors: {
        satellite: false,
        line1: false,
        line2: false,
        frames: [],
    },
    messageToShow: '',
    messageLevel: '',
    messageIsOpen: false,
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {

        // get telescopes and balances

        case TASK_ACTIONS.GET_TELESCOPE_WITH_BALANCES_START:
            return {
                ...state,
                isLoading: true,
            };
        case TASK_ACTIONS.GET_TELESCOPE_WITH_BALANCES_FINISH: {
            const data = action.payload;
            return {
                ...state,
                telescopesWithBalances: data,
                isLoading: false,
            };
        }
        case TASK_ACTIONS.GET_TELESCOPE_WITH_BALANCES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true,
            };

        // main task actions

        case TASK_ACTIONS.CHANGE_FORM_FIELD: {
            const { fieldName, value } = action.payload;
            const errorFieldName = fieldName + 'Error';
            return {
                ...state,
                [fieldName]: value,
                [errorFieldName]: false,
            }
        }

        case TASK_ACTIONS.RAISE_ERROR_IN_MAIN_TASK_PART: {
            const { fieldName } = action.payload;
            const errorFieldName = fieldName + 'Error';
            return {
                ...state,
                [errorFieldName]: true,
            }
        }

        // points task actions

        case TASK_ACTIONS.CHANGE_POINT_FORM_FIELD: {
            const { index, fieldName, value } = action.payload;
            const point = Object.assign({}, state.points[index]);
            const error = Object.assign({}, state.pointsErrors[index]);
            point[fieldName] = value;
            error[fieldName] = false;
            return {
                ...state,
                points: state.points.map((el, i) => i === index ? point : el),
                pointsErrors: state.pointsErrors.map((el, i) => i === index ? error : el),
            }
        }
        case TASK_ACTIONS.ADD_POINT: {
            const oldPoints = state.points ? state.points : [];
            const emptyPoint = {
                satellite: null,
                mag: null,
                alpha: null,
                beta: null,
                exposure: null,
                systemType: null,
                date: null,
                time: null,
            };
            return {
                ...state,
                points: [...oldPoints, emptyPoint]
            }
        }

        case TASK_ACTIONS.DELETE_POINT: {
            const { index } = action.payload;
            return {
                ...state,
                points: state.points.filter( (el, i) => i!== index),
            }
        }

        case TASK_ACTIONS.RAISE_ERRORS_IN_POINTS_TASK: {
            const { errors } = action.payload;
            return {
                ...state,
                pointsErrors: errors,
            }
        }

        case TASK_ACTIONS.SAVE_POINT_TASK_FINISH: {
            const data = action.payload;
            const message = data.msg;
            const level = data.status === 'ok' ?  'success' : 'error';
            return {
                ...state,
                messageToShow: message,
                messageLevel: level,
                messageIsOpen: true,
            }
        }

        case TASK_ACTIONS.CLOSE_NOTIFICATION: {
            return {
                ...state,
                messageToShow: '',
                messageLevel: '',
                messageIsOpen: false,
            }
        }

        // tracking task actions

        case TASK_ACTIONS.CHANGE_TRACKING_TASK_FORM_FIELD: {
            const { fieldName, value } = action.payload;
            return {
                ...state,
                trackingData: {
                    ...state.trackingData,
                    [fieldName]: value,
                },
                trackingDataErrors: {
                    ...state.trackingDataErrors,
                    [fieldName]: false,
                },
            }
        }

        case TASK_ACTIONS.RAISE_ERRORS_IN_TRACKING_TASK: {
            const { errors } = action.payload;
            return {
                ...state,
                trackingDataErrors: errors,
            }
        }

        case TASK_ACTIONS.ADD_TRACKING_TASK_TRACK: {
            const emptyTrack = {
                alpha: null,
                beta: null,
                date: null,
                time: null,
            };
            const newTrackingData = Object.assign({}, state.trackingData);
            const newTrackingDataErrors = Object.assign({}, state.trackingDataErrors);
            newTrackingData.track.push(emptyTrack);
            newTrackingDataErrors.track.push(Object.assign({}, emptyTrack));
            return {
                ...state,
                trackingData: newTrackingData,
                trackingDataErrors: newTrackingDataErrors,
            }
        }

        case TASK_ACTIONS.ADD_TRACKING_TASK_FRAME: {
            const emptyFrame = {
                exposure: null,
                date: null,
                time: null,
            };
            const newTrackingData = Object.assign({}, state.trackingData);
            const newTrackingDataErrors = Object.assign({}, state.trackingDataErrors);
            newTrackingData.frames.push(emptyFrame);
            newTrackingDataErrors.frames.push(Object.assign({}, emptyFrame));
            return {
                ...state,
                trackingData: newTrackingData,
                trackingDataErrors: newTrackingDataErrors,
            }
        }

        case TASK_ACTIONS.DELETE_TRACKING_TASK_TRACK: {
            const { index } = action.payload;
            let newTrackingData = Object.assign({}, state.trackingData);
            let newTrackingDataErrors = Object.assign({}, state.trackingDataErrors);
            newTrackingData.track = newTrackingData.track.filter( (el, i) => i!== index);
            newTrackingDataErrors.track = newTrackingDataErrors.track.filter( (el, i) => i!== index);
            return {
                ...state,
                trackingData: newTrackingData,
                trackingDataErrors: newTrackingDataErrors,
            }
        }

        case TASK_ACTIONS.DELETE_TRACKING_TASK_FRAME: {
            const { index } = action.payload;
            let newTrackingData = Object.assign({}, state.trackingData);
            let newTrackingDataErrors = Object.assign({}, state.trackingDataErrors);
            newTrackingData.frames = newTrackingData.frames.filter( (el, i) => i!== index);
            newTrackingDataErrors.frames = newTrackingDataErrors.frames.filter( (el, i) => i!== index);
            return {
                ...state,
                trackingData: newTrackingData,
                trackingDataErrors: newTrackingDataErrors,
            }
        }

        case TASK_ACTIONS.CHANGE_TRACKING_TASK_TRACK_FORM_FIELD: {
            const { index, fieldName, value } = action.payload;
            let newTrackingData = Object.assign({}, state.trackingData);
            let newTrackingDataErrors = Object.assign({}, state.trackingDataErrors);
            const track = Object.assign({}, newTrackingData.track[index]);
            const trackError = state.trackingDataErrors.track[index];
            trackError[fieldName] = false;
            track[fieldName] = value;
            newTrackingData.track = newTrackingData.track.map((el, i) => i === index ? track : el);
            newTrackingDataErrors.track = newTrackingDataErrors.track.map((el, i) => i === index ? trackError : el);
            return {
                ...state,
                trackingData: newTrackingData,
                trackingDataErrors: newTrackingDataErrors,
            }
        }

        case TASK_ACTIONS.CHANGE_TRACKING_TASK_FRAME_FORM_FIELD: {
            const { index, fieldName, value } = action.payload;
            let newTrackingData = Object.assign({}, state.trackingData);
            let newTrackingDataErrors = Object.assign({}, state.trackingDataErrors);
            const frame = Object.assign({}, newTrackingData.frames[index]);
            const frameError = state.trackingDataErrors.frames[index];
            frameError[fieldName] = false;
            frame[fieldName] = value;
            newTrackingData.frames = newTrackingData.frames.map((el, i) => i === index ? frame : el);
            return {
                ...state,
                trackingData: newTrackingData,
                trackingDataErrors: newTrackingDataErrors,
            }
        }

        case TASK_ACTIONS.SAVE_TRACKING_TASK_FINISH: {
            const data = action.payload;
            const message = data.msg;
            const level = data.status === 'ok' ?  'success' : 'error';
            return {
                ...state,
                messageToShow: message,
                messageLevel: level,
                messageIsOpen: true,
            }
        }

        // TLE task actions

        case TASK_ACTIONS.ADD_TLE_TASK_FRAME: {
            const emptyFrame = {
                exposure: null,
                date: null,
                time: null,
            };
            const newData = Object.assign({}, state.tleData);
            const newErrors = Object.assign({}, state.tleDataErrors);
            newData.frames.push(emptyFrame);
            newErrors.frames.push(Object.assign({}, emptyFrame));
            return {
                ...state,
                tleData: newData,
                tleDataErrors: newErrors,
            }
        }

        case TASK_ACTIONS.DELETE_TLE_TASK_FRAME: {
            const { index } = action.payload;
            let newData = Object.assign({}, state.tleData);
            let newErrors = Object.assign({}, state.tleDataErrors);
            newData.frames = newData.frames.filter( (el, i) => i!== index);
            newErrors.frames = newErrors.frames.filter( (el, i) => i!== index);
            return {
                ...state,
                tleData: newData,
                tleDataErrors: newErrors,
            }
        }

        case TASK_ACTIONS.CHANGE_TLE_TASK_FORM_FIELD: {
            const { fieldName, value } = action.payload;
            return {
                ...state,
                tleData: {
                    ...state.tleData,
                    [fieldName]: value,
                },
                tleDataErrors: {
                    ...state.tleDataErrors,
                    [fieldName]: false,
                }
            }
        }

        case TASK_ACTIONS.CHANGE_TLE_TASK_FRAME_FORM_FIELD: {
            const { index, fieldName, value } = action.payload;
            const tleData = Object.assign({}, state.tleData);
            const tleDataErrors = Object.assign({}, state.tleDataErrors);
            const frame = tleData.frames[index];
            const frameError = tleDataErrors.frames[index];
            frame[fieldName] = value;
            frameError[fieldName] = false;
            return {
                ...state,
                tleData,
                tleDataErrors,
            }
        }

        case TASK_ACTIONS.RAISE_ERRORS_IN_TLE_TASK: {
            const { errors } = action.payload;
            return {
                ...state,
                tleDataErrors: errors,
            }
        }

        case TASK_ACTIONS.SAVE_TLE_TASK_FINISH: {
            const data = action.payload;
            const message = data.msg;
            const level = data.status === 'ok' ?  'success' : 'error';
            return {
                ...state,
                messageToShow: message,
                messageLevel: level,
                messageIsOpen: true,
            }
        }

        default:
            return state
    }
};


