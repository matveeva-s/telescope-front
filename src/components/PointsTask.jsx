import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import '../styles/loginPage.css';
import { addPoint } from "../actions/taskActions";
import { PointForm } from './PointForm';
import Button from '@material-ui/core/Button';
import '../styles/newTask.css';

class PointsTaskComponent extends Component {
    static propTypes = {
        points: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        pointsErrors: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        addPoint: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.addPoint();
    }

    render() {
        const { points, pointsErrors } = this.props;
        return (
            <div className="">
                <div className="subtitle-text">Точки для съемки</div>
                { points && points.map((el, index) =>
                    <PointForm
                        index={ index }
                        point={ el }
                        key={ el }
                        errors={ pointsErrors[index] }
                    />
                    ) }
                <div className="add-new-point-button">
                    <Button
                        onClick={ () => this.props.addPoint() }
                        className="add-new-point-button"
                        disabled={ points && points.length > 10 }
                    >
                        + добавить точку
                    </Button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ tasksReducer }) => ({
    points: tasksReducer.points,
    pointsErrors: tasksReducer.pointsErrors,
});

const mapDispatchToProps = {
    addPoint,
};

export const PointsTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsTaskComponent);
