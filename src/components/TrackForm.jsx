import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import ruLocale from "date-fns/locale/ru";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format";

import { deleteTrackingTaskTrack, changeTrackingTaskTrackFormField } from "../actions/taskActions";
import { emptyValueErrorText} from "../constants/appConstants";
import '../styles/newTask.css';


class RuLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "LLLL yyyy", { locale: ruLocale });
  }

  getDatePickerHeaderText(date) {
    return format(date, "dd MMMM yyyy", { locale: ruLocale });
  }
}


class TrackFormComponent extends Component {
    static propTypes = {
        changeTrackingTaskTrackFormField: PropTypes.func.isRequired,
        deleteTrackingTaskTrack: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        track: PropTypes.shape().isRequired,
        errors: PropTypes.shape().isRequired,
    };

    render() {
        const { index, track, errors } = this.props;
        const { alpha, beta, date, time } = track;
        return (
            <div className="track-form-container">
                <div className="track-field">
                    <FormControl variant="outlined">
                        <TextField
                            variant="outlined"
                            placeholder="Азимут (α°)"
                            label="Азимут (α°) "
                            value={ alpha || null }
                            onChange={ event => this.props.changeTrackingTaskTrackFormField(index, 'alpha', parseFloat(event.target.value)) }
                            type="number"
                            error={ errors && errors.alpha }
                            helperText={ errors && errors.alpha ? emptyValueErrorText : null }
                        />
                    </FormControl>
                </div>
                <div className="track-field">
                    <FormControl variant="outlined">
                        <TextField
                            variant="outlined"
                            placeholder="Высота (β°)"
                            label="Высота (β°) "
                            value={ beta || null }
                            onChange={ event => this.props.changeTrackingTaskTrackFormField(index, 'beta', parseFloat(event.target.value)) }
                            type="number"
                            error={ errors && errors.beta }
                            helperText={ errors && errors.beta ? emptyValueErrorText : null }
                        />
                    </FormControl>
                </div>
                <div className="track-field">
                    <MuiPickersUtilsProvider utils={ RuLocalizedUtils } locale={ ruLocale }>
                        <KeyboardDatePicker
                            variant="outlined"
                            format="dd.MM.yyyy"
                            inputVariant="outlined"
                            cancelLabel='Отмена'
                            label="Дата"
                            value={ date }
                            onChange={ value => this.props.changeTrackingTaskTrackFormField(index, 'date', value) }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            autoOk
                            disablePast
                            className="track-date-field"
                            error={ errors && errors.date }
                            helperText={ errors && errors.date ? emptyValueErrorText : null }
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="track-field">
                    <MuiPickersUtilsProvider utils={ RuLocalizedUtils } locale={ ruLocale }>
                        <KeyboardTimePicker
                            ampm={false}
                            openTo="hours"
                            inputVariant="outlined"
                            views={["hours", "minutes", "seconds"]}
                            format="HH:mm:ss"
                            cancelLabel='Отмена'
                            label="Время"
                            value={ time }
                            onChange={ value => this.props.changeTrackingTaskTrackFormField(index, 'time', value) }
                            keyboardIcon={ <AccessTimeIcon/> }
                            className="track-time-field"
                            error={ errors && errors.time }
                            helperText={ errors && errors.time ? emptyValueErrorText : null }
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="clear-point-button">
                    <IconButton
                        onClick={ () => this.props.deleteTrackingTaskTrack(index) }
                    >
                        <ClearIcon
                            fontSize="large"
                            color="error"
                        />
                    </IconButton>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ tasksReducer }) => ({
    taskType: tasksReducer.taskType,
});

const mapDispatchToProps = {
    deleteTrackingTaskTrack,
    changeTrackingTaskTrackFormField,
};

export const TrackForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackFormComponent);
