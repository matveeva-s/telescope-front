import PropTypes from "prop-types";
import React, { Component } from 'react';
import {connect} from "react-redux";

import { ThemeProvider } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import { tasksTypes } from '../constants/appConstants';
import { PointsTask } from "./PointsTask";
import { TrackingTask } from "./TrackingTask";
import { TLETask } from "./TLETask";
import { Notification } from "./Notification";
import {
    getTelescopesWithBalances,
    changeFormField,
    raiseErrorInMainTaskPart,
    raiseErrorInPointsTask,
    raiseErrorInTrackingTask,
    raiseErrorsInTleTask,
    savePointTask,
    saveTleTask,
    saveTrackingTask,
    closeNotification,
    openNotification,
    getTelescopeSchedule,
} from "../actions/taskActions";
import { preparePoints, prepareTrackingTask, prepareFrames, prepareTrack, prepareTleTask } from "../helpers/preparePostBody";
import { countPointsTaskTiming, countTrackingTaskTiming, countTleTaskTiming } from "../helpers/timingCalculation";
import { validatePointsTask, validateTrackingData, validateTleData, checkTimeCollisions } from "../helpers/valitators";
import { emptyValueErrorText } from '../constants/appConstants';
import { taskFormTheme } from '../styles/themes';
import '../styles/newTask.css';



class NewTaskComponent extends Component {
    static propTypes = {
        getTelescopesWithBalances: PropTypes.func.isRequired,
        getTelescopeSchedule: PropTypes.func.isRequired,
        schedule: PropTypes.arrayOf(PropTypes.string).isRequired,
        raiseErrorInMainTaskPart: PropTypes.func.isRequired,
        raiseErrorInPointsTask: PropTypes.func.isRequired,
        raiseErrorInTrackingTask: PropTypes.func.isRequired,
        raiseErrorsInTleTask: PropTypes.func.isRequired,
        changeFormField: PropTypes.func.isRequired,
        savePointTask: PropTypes.func.isRequired,
        saveTrackingTask: PropTypes.func.isRequired,
        saveTleTask: PropTypes.func.isRequired,
        telescopes: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        })),
        telescope: PropTypes.number,
        taskType: PropTypes.number,
        points: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        trackingData: PropTypes.shape().isRequired,
        tleData: PropTypes.shape().isRequired,
        telescopeError: PropTypes.bool.isRequired,
        taskTypeError: PropTypes.bool.isRequired,
        notificationMessage: PropTypes.string,
        notificationLevel: PropTypes.string,
        notificationIsOpen: PropTypes.bool,
        closeNotification: PropTypes.func.isRequired,
        openNotification: PropTypes.func.isRequired,
    };

    static defaultProps = {
        telescope: null,
        taskType: null,
        telescopes: {},
        notificationMessage: '',
        notificationLevel: '',
        notificationIsOpen: false,
    };

    componentDidMount() {
        this.props.getTelescopesWithBalances();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.telescope !== this.props.telescope) {
            this.props.getTelescopeSchedule(this.props.telescope);
        }
    }

    state = {
        limitExceeded: false,
    };

    getBalance = () => {
        const { telescope, telescopes } = this.props;
        if (telescope && telescopes && telescopes.length) {
            return parseInt(telescopes.filter(el => parseInt(el.value) === telescope)[0].balance);
        }
        return 0;
    };

    getTaskTiming = () => {
        const { taskType, points, telescope, trackingData, tleData } = this.props;
        if (!taskType || !telescope) return 0;
        if (taskType === 1) return countPointsTaskTiming(points);
        if (taskType === 2) return countTrackingTaskTiming(trackingData);
        if (taskType === 3) return countTleTaskTiming(tleData);
    };

    get schedule() {
        const { schedule } = this.props;
        if (!schedule.length) return;
        return (
            <div className="schedule-container">
                <div className="subtitle-text">Занятые слоты времени:</div>
                { schedule.map(el => <div className="schedule-text-container">{ el }</div>) }
            </div>
        )
    }

    get timingText() {
        const { taskType, telescope } = this.props;
        let sumTime = parseFloat(this.getTaskTiming().duration);
        let balance = this.getBalance();
        if (!taskType || !telescope || !sumTime) return null;
        const successText = `Предполагаемое общее время наблюдения ${ sumTime } минут, с баланса спишется ${ Math.ceil(sumTime) } минут`;
        const errorText = `Предполагаемое общее время наблюдения ${ sumTime } минут, тебе не хватает наблюдательного времени на этом телескопе`;
        if (sumTime < 1) return null;
        if (balance < sumTime) {
            return (
                <div className="timing-error-text-container">{ errorText }</div>
            );
        }
        return (
            <div className="timing-text-container">{ successText }</div>
        );
    }

    saveTask = () => {
        const { telescope, taskType } = this.props;
        if (!telescope) this.props.raiseErrorInMainTaskPart('telescope');
        if (!taskType) this.props.raiseErrorInMainTaskPart('taskType');
        let { duration, minTime, maxTime } = this.getTaskTiming();
        duration = Math.ceil(parseFloat(duration));
        if (this.props.taskType === 1) {
            const { points } = this.props;
            const { isError, errors } = validatePointsTask(points);
            if (!isError) {
                const preparedPoints = preparePoints(points);
                if (checkTimeCollisions(preparedPoints)) {
                    this.props.openNotification(checkTimeCollisions(preparedPoints), 'error');
                    return;
                };
                this.props.savePointTask({ telescope, points: preparedPoints, duration, min_dt: minTime, max_dt: maxTime });
            } else {
                this.props.raiseErrorInPointsTask(errors);
                return;
            }
        }
        if (this.props.taskType === 2) {
            const { trackingData } = this.props;
            const { isError, errors } = validateTrackingData(trackingData);
            if (!isError) {
                const preparedData = prepareTrackingTask(trackingData);
                const track = prepareTrack(trackingData.track);
                const frames = prepareFrames(trackingData.frames);
                this.props.saveTrackingTask({ telescope, tracking_data: preparedData, track_points: track, frames, duration, min_dt: minTime, max_dt: maxTime });
            } else {
                this.props.raiseErrorInTrackingTask(errors);
                return;
            }
        }
        if (this.props.taskType === 3) {
            const { tleData } = this.props;
            const { isError, errors } = validateTleData(tleData);
            if (!isError) {
                const frames = prepareFrames(tleData.frames);
                const preparedData = prepareTleTask(tleData);
                this.props.saveTleTask({ telescope, tle_data: preparedData, frames, duration, min_dt: minTime, max_dt: maxTime });
            } else {
                this.props.raiseErrorsInTleTask(errors);
                return;
            }
        }
    };

    render() {
        const {
            telescopes, telescope, taskType, telescopeError, taskTypeError,
            notificationIsOpen, notificationLevel, notificationMessage
        } = this.props;
        return (
            <div className="paper-container">
                <Paper elevation={3} >
                    <div className="new-task-form">
                        <ThemeProvider theme={ taskFormTheme }>
                            <div className="new-task-title-button-container">
                                <div className="new-task-title">Новое наблюдение</div>
                                <div className="new-task-button">
                                    <input
                                        hidden
                                        id="avatar-image-upload"
                                        type="file"
                                      />
                                    <label htmlFor="avatar-image-upload">
                                        <Button
                                                // variant="contained"
                                                color="primary"
                                                component="span"
                                                startIcon={<SearchIcon />}
                                            >
                                              загрузить план
                                        </Button>
                                    </label>
                                </div>
                            </div>
                            <div className="new-task-selector-container">
                                <FormControl className="new-task-selector" variant="outlined" error={ telescopeError }>
                                    <InputLabel id="telescope-label">Телескоп</InputLabel>
                                        <Select
                                          labelId="telescope-label"
                                          value={ telescope }
                                          label="Телескоп"
                                          onChange={ event => this.props.changeFormField('telescope', parseInt(event.target.value)) }
                                          error={ telescopeError }
                                        >
                                            { telescopes.map(el => <MenuItem value={ el.value } key={ el.value }>{ el.label }</MenuItem>) }
                                        </Select>
                                  { telescopeError ? <FormHelperText>{ emptyValueErrorText }</FormHelperText> : null }
                                  </FormControl>
                            </div>
                            <div className="new-task-selector-container">
                                <FormControl className="new-task-selector" variant="outlined" error={ taskTypeError }>
                                    <InputLabel id="task-type-label">Тип наблюдения</InputLabel>
                                        <Select
                                          labelId="task-type-label"
                                          value={ taskType }
                                          label="Тип наблюдения"
                                          onChange={ event => this.props.changeFormField('taskType', event.target.value) }
                                          error={ taskTypeError }
                                        >
                                            { tasksTypes.map(el => <MenuItem value={ el.value } key={ el.value }>{ el.label }</MenuItem>) }
                                        </Select>
                                  { taskTypeError ? <FormHelperText>{ emptyValueErrorText }</FormHelperText> : null }
                                  </FormControl>
                            </div>
                            { this.schedule }
                            <Notification
                                level={ notificationLevel }
                                message={ notificationMessage }
                                isOpen={ notificationIsOpen }
                                closeNotification={ this.props.closeNotification }
                            />
                            { taskType === 1 && <PointsTask/> }
                            { taskType === 2 && <TrackingTask/> }
                            { taskType === 3 && <TLETask/> }
                            <div className="timing-saving-container">
                                { this.timingText }
                                <div className="save-task-button">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={ () => this.saveTask() }
                                        disabled={ this.getTaskTiming().duration > this.getBalance() || !taskType || !telescope }
                                        endIcon={<SendIcon>Отправить на наблюдение</SendIcon>}
                                    >
                                        Отправить на наблюдение
                                    </Button>
                                </div>
                            </div>
                        </ThemeProvider>
                    </div>
                </Paper>
            </div>
        )
    }
}


const mapStateToProps = ({ tasksReducer }) => ({
    telescopes: tasksReducer.telescopesWithBalances,
    isLoading: tasksReducer.isLoading,
    telescope: tasksReducer.telescope,
    taskType: tasksReducer.taskType,
    points: tasksReducer.points,
    trackingData: tasksReducer.trackingData,
    tleData: tasksReducer.tleData,
    telescopeError: tasksReducer.telescopeError,
    taskTypeError: tasksReducer.taskTypeError,
    notificationMessage: tasksReducer.messageToShow,
    notificationLevel: tasksReducer.messageLevel,
    notificationIsOpen: tasksReducer.messageIsOpen,
    schedule: tasksReducer.schedule,
});

const mapDispatchToProps = {
    getTelescopesWithBalances,
    changeFormField,
    savePointTask,
    saveTrackingTask,
    saveTleTask,
    raiseErrorInMainTaskPart,
    raiseErrorInPointsTask,
    raiseErrorInTrackingTask,
    raiseErrorsInTleTask,
    closeNotification,
    openNotification,
    getTelescopeSchedule,
};

export const NewTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTaskComponent);
