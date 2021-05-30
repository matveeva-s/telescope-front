import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import '../styles/loginPage.css';
import Button from '@material-ui/core/Button';
import '../styles/newTask.css';
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl";
import { FrameForm } from "./FrameForm";
import { emptyValueErrorText, wrongTLELineText } from '../constants/appConstants';
import {
    changeTLETaskFormField,
    addTLETaskFrame,
    deleteTLETaskFrame,
    changeTLETaskFrameFormField,
} from "../actions/taskActions";

export class TLETaskComponent extends Component {
    static propTypes = {
        tleData: PropTypes.shape().isRequired,
        tleDataErrors: PropTypes.shape().isRequired,
        addTLETaskFrame: PropTypes.func.isRequired,
        changeTLETaskFormField: PropTypes.func.isRequired,
        deleteTLETaskFrame: PropTypes.func.isRequired,
        changeTLETaskFrameFormField: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.addTLETaskFrame();
    }

    render() {
        const { tleData, tleDataErrors } = this.props;
        let line1ErrorText = null;
        let line2ErrorText = null;
        if (tleDataErrors && tleDataErrors.line1 && tleData.line1) {
            line1ErrorText = wrongTLELineText;
        } else if (tleDataErrors && tleDataErrors.line1 && !tleData.line1) {
            line1ErrorText = emptyValueErrorText;
        }
        if (tleDataErrors && tleDataErrors.line2 && tleData.line2) {
            line2ErrorText = wrongTLELineText;
        } else if (tleDataErrors && tleDataErrors.line2 && !tleData.line2) {
            line2ErrorText = emptyValueErrorText;
        }
        let satellite = null;
        let line1 = null;
        let line2 = null;
        if (tleData) {
            satellite = tleData.satellite;
            line1 = tleData.line1;
            line2 = tleData.line2;
        }

        return (
            <div className="tle-task-form-container">
                <div className="subtitle-text">TLE данные спутника</div>
                <div className="tle-task-main-fields-container">
                    <div className="tle-task-satellite-field">
                        <FormControl variant="outlined">
                            <TextField
                                variant="outlined"
                                placeholder="ID спутника"
                                label="ID спутника"
                                value={ satellite }
                                onChange={ event => this.props.changeTLETaskFormField('satellite', parseInt(event.target.value)) }
                                type="number"
                                error={ tleDataErrors && tleDataErrors.satellite }
                                helperText={ tleDataErrors && tleDataErrors.satellite ? emptyValueErrorText : null }
                            />
                        </FormControl>
                    </div>
                    <div className="tle-task-line-field">
                        <FormControl variant="outlined">
                            <TextField
                                variant="outlined"
                                placeholder="Линия 1"
                                label="Линия 1"
                                value={ line1 }
                                className="tle-task-line"
                                onChange={ event => this.props.changeTLETaskFormField('line1', event.target.value) }
                                error={ tleDataErrors && tleDataErrors.line1 }
                                helperText={ line1ErrorText }
                            />
                        </FormControl>
                    </div>
                    <div className="tle-task-line-field">
                        <FormControl variant="outlined">
                            <TextField
                                variant="outlined"
                                placeholder="Линия 2"
                                label="Линия 2"
                                value={ line2 }
                                className="tle-task-line"
                                onChange={ event => this.props.changeTLETaskFormField('line2', event.target.value) }
                                error={ tleDataErrors && tleDataErrors.line2 }
                                helperText={ line2ErrorText }
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="tracking-task-frames-array-container">
                    <div className="subtitle-text">Моменты для съемки</div>
                    { tleData && tleData.frames.map((el, index) =>
                        <FrameForm
                            changeFrame={ this.props.changeTLETaskFrameFormField }
                            deleteFrame={ this.props.deleteTLETaskFrame }
                            index={ index }
                            frame={ el }
                            key={ el }
                            errors={ tleDataErrors.frames[index] }
                        />
                    ) }
                    <div className="add-new-point-button">
                        <Button
                            onClick={ () => this.props.addTLETaskFrame() }
                            className="add-new-point-button"
                            disabled={ tleData && tleData.frames.length > 10 }
                        >
                            + добавить фрейм
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ tasksReducer }) => ({
    tleData: tasksReducer.tleData,
    tleDataErrors: tasksReducer.tleDataErrors,
});

const mapDispatchToProps = {
    changeTLETaskFormField,
    addTLETaskFrame,
    deleteTLETaskFrame,
    changeTLETaskFrameFormField,
};

export const TLETask = connect(
  mapStateToProps,
  mapDispatchToProps
)(TLETaskComponent);
