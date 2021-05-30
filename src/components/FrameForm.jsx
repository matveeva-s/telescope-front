import React, { Component } from 'react';
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
import { emptyValueErrorText } from "../constants/appConstants";
import '../styles/newTask.css';


class RuLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "LLLL yyyy", { locale: ruLocale });
  }

  getDatePickerHeaderText(date) {
    return format(date, "dd MMMM yyyy", { locale: ruLocale });
  }
}


export class FrameForm extends Component {
    static propTypes = {
        changeFrame: PropTypes.func.isRequired,
        deleteFrame: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        frame: PropTypes.shape().isRequired,
        errors: PropTypes.shape().isRequired,
    };

    render() {
        const { index, frame, errors } = this.props;
        const { exposure, date, time } = frame;
        return (
            <div className="frame-form-container">
                <div className="frame-field">
                    <FormControl className="frame-exposure-field" variant="outlined">
                        <TextField
                            variant="outlined"
                            placeholder="Выдержка"
                            label="Выдержка"
                            value={ exposure || null }
                            onChange={ event => this.props.changeFrame(index, 'exposure', parseInt(event.target.value)) }
                            type="number"
                            error={ errors && errors.exposure }
                            helperText={ errors && errors.exposure ? emptyValueErrorText : null }
                        />
                    </FormControl>
                </div>
                <div className="frame-field">
                    <MuiPickersUtilsProvider utils={ RuLocalizedUtils } locale={ ruLocale }>
                        <KeyboardDatePicker
                            variant="outlined"
                            format="dd.MM.yyyy"
                            inputVariant="outlined"
                            id="date-picker-inline"
                            cancelLabel='Отмена'
                            label="Дата снимка"
                            value={ date }
                            onChange={ value => this.props.changeFrame(index, 'date', value) }
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
                <div className="frame-field">
                    <MuiPickersUtilsProvider utils={ RuLocalizedUtils } locale={ ruLocale }>
                        <KeyboardTimePicker
                            ampm={ false }
                            openTo="hours"
                            inputVariant="outlined"
                            views={["hours", "minutes", "seconds"]}
                            format="HH:mm:ss"
                            cancelLabel='Отмена'
                            label="Время снимка"
                            value={ time }
                            onChange={ value => this.props.changeFrame(index, 'time', value) }
                            keyboardIcon={ <AccessTimeIcon/> }
                            className="track-time-field"
                            error={ errors && errors.time }
                            helperText={ errors && errors.time ? emptyValueErrorText : null }
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="clear-point-button">
                    <IconButton
                        onClick={ () => this.props.deleteFrame(index) }
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
