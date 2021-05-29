import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import '../styles/loginPage.css';
import Button from '@material-ui/core/Button';
import '../styles/newTask.css';
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl";
import { TrackForm } from "./TrackForm";
import { FrameForm } from "./FrameForm";
import {
    changeTrackingTaskFormField,
    addTrackingTaskFrame,
    addTrackingTaskTrack,
    deleteTrackingTaskFrame,
    changeTrackingTaskFrameFormField,
} from "../actions/taskActions";
import { emptyValueErrorText} from "../constants/appConstants";

class TrackingTaskComponent extends Component {
    static propTypes = {
        trackingData: PropTypes.shape().isRequired,
        trackingDataErrors: PropTypes.shape().isRequired,
        changeTrackingTaskFormField: PropTypes.func.isRequired,
        addTrackingTaskTrack: PropTypes.func.isRequired,
        addTrackingTaskFrame: PropTypes.func.isRequired,
        deleteTrackingTaskFrame: PropTypes.func.isRequired,
        changeTrackingTaskFrameFormField: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.addTrackingTaskTrack();
        this.props.addTrackingTaskFrame();
    }

    render() {
        const { trackingData, trackingDataErrors } = this.props;
        let satellite = null;
        let mag = null;
        let count = null;
        if (trackingData) {
            satellite = trackingData.satellite;
            mag = trackingData.mag;
            count = trackingData.count;
        }
        return (
            <div className="tracking-task-form-container">
                <div className="subtitle-text">Основные данные спутника</div>
                <div className="tracking-task-main-fields-container">
                    <div className="tracking-task-satellite-field">
                        <FormControl variant="outlined">
                            <TextField
                                variant="outlined"
                                placeholder="ID спутника"
                                label="ID спутника"
                                value={ satellite }
                                onChange={ event => this.props.changeTrackingTaskFormField('satellite', parseInt(event.target.value)) }
                                type="number"
                                error={ trackingDataErrors && trackingDataErrors.satellite }
                                helperText={ trackingDataErrors && trackingDataErrors.satellite ? emptyValueErrorText : null }
                            />
                        </FormControl>
                    </div>
                    <div className="tracking-task-mag-field">
                        <FormControl variant="outlined">
                            <TextField
                                variant="outlined"
                                placeholder="Зв. величина"
                                label="Зв. величина"
                                value={ mag }
                                onChange={ event => this.props.changeTrackingTaskFormField('mag', parseFloat(event.target.value)) }
                                type="number"
                                error={ trackingDataErrors && trackingDataErrors.mag }
                                helperText={ trackingDataErrors && trackingDataErrors.mag ? emptyValueErrorText : null }
                            />
                        </FormControl>
                    </div>
                    <div className="tracking-task-count-field">
                        <FormControl variant="outlined">
                            <TextField
                                variant="outlined"
                                placeholder="COUNT"
                                label="COUNT"
                                value={ count }
                                onChange={ event => this.props.changeTrackingTaskFormField('count', parseInt(event.target.value)) }
                                type="number"
                                error={ trackingDataErrors && trackingDataErrors.count }
                                helperText={ trackingDataErrors && trackingDataErrors.count ? emptyValueErrorText : null }
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="tracking-task-track-array-container">
                    <div className="subtitle-text">Точки для перемещения</div>
                    { trackingData && trackingData.track.map((el, index) =>
                        <TrackForm
                            index={ index }
                            track={ el }
                            key={ el }
                            errors={ trackingDataErrors ? trackingDataErrors.track[index] : null }
                        />
                    ) }
                    <div className="add-new-point-button">
                        <Button
                            onClick={ () => this.props.addTrackingTaskTrack() }
                            className="add-new-point-button"
                            disabled={ trackingData && trackingData.track.length > 10 }
                        >
                            + добавить точку
                        </Button>
                    </div>
                </div>
                <div className="tracking-task-frames-array-container">
                    <div className="subtitle-text">Моменты для съемки</div>
                    { trackingData && trackingData.frames.map((el, index) =>
                        <FrameForm
                            changeFrame={ this.props.changeTrackingTaskFrameFormField }
                            deleteFrame={ this.props.deleteTrackingTaskFrame }
                            index={ index }
                            frame={ el }
                            key={ el }
                            errors={ trackingDataErrors.frames[index] }
                        />
                    ) }
                    <div className="add-new-point-button">
                        <Button
                            onClick={ () => this.props.addTrackingTaskFrame() }
                            className="add-new-point-button"
                            disabled={ trackingData && trackingData.frames.length > 10 }
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
    trackingData: tasksReducer.trackingData,
    trackingDataErrors: tasksReducer.trackingDataErrors,
});

const mapDispatchToProps = {
    changeTrackingTaskFormField,
    addTrackingTaskTrack,
    addTrackingTaskFrame,
    deleteTrackingTaskFrame,
    changeTrackingTaskFrameFormField,
};

export const TrackingTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackingTaskComponent);
