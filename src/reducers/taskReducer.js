import { TASK_ACTIONS } from '../actions/actionTypes';

const initialState = {
    telescopesWithBalances: [],
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
    system: null,
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
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

        case TASK_ACTIONS.CHANGE_FORM_FIELD: {
            const { fieldName, value } = action.payload;
            return {
                ...state,
                [fieldName]: value,
            }
        }

        case TASK_ACTIONS.CHANGE_POINT_FORM_FIELD: {
            const { index, fieldName, value } = action.payload;
            const point = Object.assign({}, state.points[index]);
            point[fieldName] = value;
            return {
                ...state,
                points: state.points.map((el, i) => i === index ? point : el)
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

        case TASK_ACTIONS.CHANGE_TRACKING_TASK_FORM_FIELD: {
            const { fieldName, value } = action.payload;
            return {
                ...state,
                trackingData: {
                    ...state.trackingData,
                    [fieldName]: value,
                }
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
            newTrackingData.track.push(emptyTrack);
            return {
                ...state,
                trackingData: newTrackingData,
            }
        }

        case TASK_ACTIONS.ADD_TRACKING_TASK_FRAME: {
            const emptyFrame = {
                exposure: null,
                date: null,
                time: null,
            };
            const newTrackingData = Object.assign({}, state.trackingData);
            newTrackingData.frames.push(emptyFrame);
            return {
                ...state,
                trackingData: newTrackingData,
            }
        }

        case TASK_ACTIONS.DELETE_TRACKING_TASK_TRACK: {
            const { index } = action.payload;
            let newTrackingData = Object.assign({}, state.trackingData);
            newTrackingData.track = newTrackingData.track.filter( (el, i) => i!== index);
            return {
                ...state,
                trackingData: newTrackingData,
            }
        }

        case TASK_ACTIONS.DELETE_TRACKING_TASK_FRAME: {
            const { index } = action.payload;
            let newTrackingData = Object.assign({}, state.trackingData);
            newTrackingData.frames = newTrackingData.frames.filter( (el, i) => i!== index);
            return {
                ...state,
                trackingData: newTrackingData,
            }
        }

        case TASK_ACTIONS.CHANGE_TRACKING_TASK_TRACK_FORM_FIELD: {
            const { index, fieldName, value } = action.payload;
            let newTrackingData = Object.assign({}, state.trackingData);
            const track = Object.assign({}, newTrackingData.track[index]);
            track[fieldName] = value;
            newTrackingData.track = newTrackingData.track.map((el, i) => i === index ? track : el);
            return {
                ...state,
                trackingData: newTrackingData,
            }
        }

        case TASK_ACTIONS.CHANGE_TRACKING_TASK_FRAME_FORM_FIELD: {
            const { index, fieldName, value } = action.payload;
            let newTrackingData = Object.assign({}, state.trackingData);
            const frame = Object.assign({}, newTrackingData.frames[index]);
            frame[fieldName] = value;
            newTrackingData.frames = newTrackingData.frames.map((el, i) => i === index ? frame : el);
            return {
                ...state,
                trackingData: newTrackingData,
            }
        }

        default:
            return state
    }
};


