import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import '../styles/loginPage.css';
import Button from '@material-ui/core/Button';
import '../styles/newTask.css';
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl";
import { FrameForm } from "./FrameForm";
import {
    changeTLETaskFormField,
    addTLETaskFrame,
    deleteTLETaskFrame,
    changeTLETaskFrameFormField,
} from "../actions/taskActions";

export class TLETaskComponent extends Component {
    static propTypes = {
        tleData: PropTypes.shape().isRequired,
        addTLETaskFrame: PropTypes.func.isRequired,
        changeTLETaskFormField: PropTypes.func.isRequired,
        deleteTLETaskFrame: PropTypes.func.isRequired,
        changeTLETaskFrameFormField: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.addTLETaskFrame();
    }

    render() {
        const { tleData } = this.props;
        return (
            <div className="tracking-task-form-container">
                <div className="subtitle-text">TLE данные спутника</div>
                <div className="tracking-task-main-fields-container">
                    <div className="tracking-task-satellite-field">
                        <FormControl variant="outlined">
                            <TextField
                                variant="outlined"
                                placeholder="ID спутника"
                                label="ID спутника"
                                value={ tleData && tleData.satellite || null }
                                onChange={ event => this.props.changeTLETaskFormField('satellite', parseInt(event.target.value)) }
                                type="number"
                            />
                        </FormControl>
                    </div>
                    <div className="tracking-task-mag-field">
                        <FormControl variant="outlined">
                            <TextField
                                variant="outlined"
                                placeholder="Линия 1"
                                label="Линия 1"
                                value={ tleData && tleData.line1 || null }
                                onChange={ event => this.props.changeTLETaskFormField('line1', parseFloat(event.target.value)) }
                                type="number"
                            />
                        </FormControl>
                    </div>
                    <div className="tracking-task-count-field">
                        <FormControl variant="outlined">
                            <TextField
                                variant="outlined"
                                placeholder="Линия 2"
                                label="Линия 2"
                                value={ tleData && tleData.line2 || null }
                                onChange={ event => this.props.changeTLETaskFormField('line2', parseInt(event.target.value)) }
                                type="number"
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
