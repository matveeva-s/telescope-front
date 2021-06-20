import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {ThemeProvider} from "@material-ui/styles";
import {taskFormTheme} from "../styles/themes";
import { getTaskResult } from '../actions/taskActions';
import '../styles/tasks.css';


export class TaskResultsComponent extends Component {
    static propTypes = {
        taskResult: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        getTaskResult: PropTypes.func.isRequired,

    };

    componentDidMount() {
        this.props.getTaskResult(this.props.match.params.id);
    }

    taskInfoRow = (title, value) => {
        return (
            <div className="task-result-info-container">
                <div className="task-result-info-title">{ title }</div>
                <div className="task-result-info">{ value }</div>
            </div>
        )
    };

    taskCellInfoRow = (title, value) => {
        return (
            <div className="task-result-info-container">
                <div className="task-result-cell-info-title">{ title }</div>
                <div className="task-result-cell-info">{ value }</div>
            </div>
        )
    };

    otherData = (data, type) => {
        if (type === 'track') return (
            <div className="task-result-other-data-container">
                { this.taskInfoRow('Идентификатор спутника', data.satellite)}
                { this.taskInfoRow('Звездная величина спутника', data.mag)}
            </div>
        );
        if (type === 'tle') return (
            <div className="task-result-other-data-container">
                { this.taskInfoRow('Идентификатор спутника', data.satellite)}
                { this.taskInfoRow('Линия №1 TLE', data.line1)}
                { this.taskInfoRow('Линия №2 TLE', data.line2)}
            </div>
        );
    }


    resultCell = (index, result, type) => {
        if (type === 'point') return (
            <div className="task-result-cell-container">
                <div className="task-result-cell-title">Снимок №{ index + 1 }</div>
                { this.taskCellInfoRow('Идентификатор спутника', result.satellite) }
                { this.taskCellInfoRow('Звездная величина спутника', result.mag) }
                { this.taskCellInfoRow('Азимут', result.alpha) }
                { this.taskCellInfoRow('Высота', result.beta) }
                { this.taskCellInfoRow('Выдержка снимка', result.exposure) }
                { this.taskCellInfoRow('Дата и время снимка', result.dt) }
                <img src={result.url}/>
            </div>
        )
        return (
            <div className="task-result-cell-container">
                <div className="task-result-cell-title">Снимок №{ index + 1 }</div>
                { this.taskCellInfoRow('Выдержка снимка', result.exposure) }
                { this.taskCellInfoRow('Дата и время снимка', result.dt) }
                <img src={result.url}/>
            </div>
        )
    }

    render() {
        const { taskResult } = this.props;
        if (!taskResult) return 'Error';
        return (
            <div className="paper-container">
                <Paper elevation={3}>
                    <div className="tasks-content-container">
                        <ThemeProvider theme={ taskFormTheme }>
                            <div className="tasks-page-title">{ taskResult.name }</div>
                            { this.taskInfoRow('Создано', taskResult.created) }
                            { this.taskInfoRow('Тип наблюдения', taskResult.task_type ? taskResult.task_type.toLowerCase() : '') }
                            { this.taskInfoRow('Дата и время начала наблюдения', taskResult.start_dt) }
                            { this.taskInfoRow('Дата и время окончания наблюдения', taskResult.end_dt) }
                            { this.otherData(taskResult.other_data, taskResult.type_code) }
                            { taskResult.results && taskResult.results.length && taskResult.results.map((el, index) => this.resultCell(index, el, taskResult.type_code)) }
                        </ThemeProvider>
                    </div>
                </Paper>
            </div>
        );
    }
}



const mapStateToProps = ({ tasksReducer }) => ({
    taskResult: tasksReducer.taskResult,
});

const mapDispatchToProps = {
    getTaskResult,
};

export const TaskResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskResultsComponent);
