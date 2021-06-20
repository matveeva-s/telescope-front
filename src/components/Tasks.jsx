import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { Notification } from "./Notification";
import {ThemeProvider} from "@material-ui/styles";
import {taskFormTheme} from "../styles/themes";
import { getUserTasks } from '../actions/taskActions';
import '../styles/tasks.css';


export class TasksComponent extends Component {
    static propTypes = {
        tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    };

    componentDidMount() {
        this.props.getUserTasks();
    }

    get tasksTable () {
        const { tasks } = this.props;
        if (!tasks.length) return;
        return (
            <div className="tasks-requests-table-container">
                <Table size="large" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Создано</TableCell>
                            <TableCell align="center">Телескоп</TableCell>
                            <TableCell align="center">Тип</TableCell>
                            <TableCell align="center">Статус</TableCell>
                            <TableCell align="center">Начало</TableCell>
                            <TableCell align="center">Окончание</TableCell>
                            <TableCell align="center">Результаты</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((row) => (
                            <TableRow key={row.created}>
                                <TableCell>{row.created}</TableCell>
                                <TableCell align="center">{row.telescope}</TableCell>
                                <TableCell align="center">{row.task_type}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="center">{row.start_dt}</TableCell>
                                <TableCell align="center">{row.end_dt}</TableCell>
                                <TableCell align="center">
                                    { row.url ? <a href={row.url}>Открыть</a> : null }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }

    render() {
        return (
            <div className="paper-container">
                <Paper elevation={3}>
                    <div className="tasks-content-container">
                        <ThemeProvider theme={ taskFormTheme }>
                            <div className="tasks-page-title">Мои наблюдения</div>
                            { this.tasksTable }
                        </ThemeProvider>
                    </div>
                </Paper>
            </div>
        );
    }
}



const mapStateToProps = ({ tasksReducer }) => ({
    tasks: tasksReducer.tasks,
});

const mapDispatchToProps = {
    getUserTasks,
};

export const Tasks = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksComponent);
