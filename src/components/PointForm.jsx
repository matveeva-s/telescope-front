import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
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

import { changePointFormField, changeFormField, deletePoint } from "../actions/taskActions";
import { coordinateSystemTypes, emptyValueErrorText } from '../constants/appConstants';
import '../styles/newTask.css';


class RuLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "LLLL yyyy", { locale: ruLocale });
  }

  getDatePickerHeaderText(date) {
    return format(date, "dd MMMM yyyy", { locale: ruLocale });
  }
}


class PointFormComponent extends Component {
    static propTypes = {
        changePointFormField: PropTypes.func.isRequired,
        deletePoint: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        point: PropTypes.shape().isRequired,
        errors: PropTypes.shape().isRequired,
    };

    render() {
        const { index, point, errors } = this.props;
        const { satellite, mag, alpha, beta, exposure, systemType, date, time } = point;
        return (
            <div className="point-form-container">
                <FormControl className="point-satellite-field" variant="outlined">
                    <TextField
                        variant="outlined"
                        placeholder="ID спутника"
                        label="ID спутника"
                        value={ satellite || null }
                        onChange={ event => this.props.changePointFormField(index, 'satellite', parseInt(event.target.value)) }
                        type="number"
                        error={ errors && errors.satellite }
                        helperText={ errors && errors.satellite ? emptyValueErrorText : null }
                    />
                </FormControl>
                <FormControl error={ true } className="point-coordinate-field" variant="outlined">
                    <TextField
                        variant="outlined"
                        placeholder="Азимут (α°)"
                        label="Азимут (α°) "
                        value={ alpha || null }
                        onChange={ event => this.props.changePointFormField(index, 'alpha', parseFloat(event.target.value)) }
                        type="number"
                        error={ errors && errors.alpha }
                        helperText={ errors && errors.alpha ? emptyValueErrorText : null }
                    />
                </FormControl>
                <FormControl className="point-coordinate-field" variant="outlined">
                    <TextField
                        variant="outlined"
                        placeholder="Высота (β°)"
                        label="Высота (β°) "
                        value={ beta || null }
                        onChange={ event => this.props.changePointFormField(index, 'beta', parseFloat(event.target.value)) }
                        type="number"
                        error={ errors && errors.beta }
                        helperText={ errors && errors.beta ? emptyValueErrorText : null }
                    />
                </FormControl>
                <FormControl className="point-mag-field" variant="outlined">
                    <TextField
                        variant="outlined"
                        placeholder="Зв. величина"
                        label="Зв. величина"
                        value={ mag || null }
                        onChange={ event => this.props.changePointFormField(index, 'mag', parseFloat(event.target.value)) }
                        type="number"
                        error={ errors && errors.mag }
                        helperText={ errors && errors.mag ? emptyValueErrorText : null }
                    />
                </FormControl>
                <FormControl className="point-system-field" variant="outlined" error={ errors && errors.systemType }>
                    <InputLabel id="point-coordinate-system">Система координат</InputLabel>
                    <Select
                        labelId="point-coordinate-system"
                        value={ systemType }
                        label="Система координат"
                        onChange={ event => this.props.changePointFormField(index, 'systemType', event.target.value) }
                        error={ errors && errors.systemType }
                    >
                        { coordinateSystemTypes.map(el => <MenuItem value={ el.value }>{ el.label }</MenuItem>) }
                    </Select>
                    { errors && errors.systemType ? <FormHelperText>{ emptyValueErrorText }</FormHelperText> : null }
                </FormControl>
                <FormControl className="point-exp-field" variant="outlined">
                    <TextField
                        variant="outlined"
                        placeholder="Выдержка"
                        label="Выдержка"
                        value={ exposure || null }
                        onChange={ event => this.props.changePointFormField(index, 'exposure', parseInt(event.target.value)) }
                        type="number"
                        error={ errors && errors.exposure }
                        helperText={ errors && errors.exposure ? emptyValueErrorText : null }
                    />
                </FormControl>
                <MuiPickersUtilsProvider utils={ RuLocalizedUtils } locale={ ruLocale }>
                    <KeyboardDatePicker
                        variant="outlined"
                        format="dd.MM.yyyy"
                        inputVariant="outlined"
                        id="date-picker-inline"
                        cancelLabel='Отмена'
                        label="Дата снимка"
                        value={ date }
                        onChange={ value => this.props.changePointFormField(index, 'date', value) }
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        autoOk
                        disablePast
                        className="point-date-field"
                        error={ errors && errors.date }
                        helperText={ errors && errors.date ? emptyValueErrorText : null }
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={ RuLocalizedUtils } locale={ ruLocale }>
                    <KeyboardTimePicker
                        ampm={false}
                        openTo="hours"
                        inputVariant="outlined"
                        views={["hours", "minutes", "seconds"]}
                        format="HH:mm:ss"
                        cancelLabel='Отмена'
                        label="Время снимка"
                        value={ time }
                        onChange={ value => this.props.changePointFormField(index, 'time', value) }
                        keyboardIcon={ <AccessTimeIcon/> }
                        className="point-time-field"
                        error={ errors && errors.time }
                        helperText={ errors && errors.time ? emptyValueErrorText : null }
                    />
                </MuiPickersUtilsProvider>
                <div className="clear-point-button">
                    <IconButton
                        onClick={ () => this.props.deletePoint(index) }
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
    changePointFormField,
    changeFormField,
    deletePoint,
};

export const PointForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PointFormComponent);
