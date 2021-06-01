import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'

import {ThemeProvider} from "@material-ui/styles";
import {taskFormTheme} from "../styles/themes";
import { getTelescopesWithBalances, getBalanceRequests } from '../actions/taskActions';
import '../styles/balance.css';


export class BalanceComponent extends Component {
    static propTypes = {
        telescopes: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
            balance: PropTypes.number,
        })),
        getTelescopesWithBalances: PropTypes.func.isRequired,
        getBalanceRequests: PropTypes.func.isRequired,
        requests: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    };

    componentDidMount() {
        this.props.getTelescopesWithBalances();
        this.props.getBalanceRequests();
    }

    render() {
        const { telescopes, requests } = this.props;
        const rows = telescopes.map(({ label, value, balance }) => ({ label, balance }));
        return (
            <div className="paper-container">
                <Paper elevation={3}>
                    <div className="balance-content-container">
                        <ThemeProvider theme={ taskFormTheme }>
                            <div className="balance-page-title">Баланс наблюдательного времени</div>
                            <div className="balance-telescopes-table-container">
                                <Table size="medium" aria-label="a dense table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Телескоп</TableCell>
                                        <TableCell align="center">Количество минут</TableCell>
                                        <TableCell align="center">Получение дополнительного времени</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {telescopes.map((row) => (
                                        <TableRow key={row.label}>
                                          <TableCell component="th" scope="row">
                                            {row.label}
                                          </TableCell>
                                          <TableCell align="center">{row.balance}</TableCell>
                                          <TableCell align="center">fdsfhjg</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="balance-page-title">Мои заявки</div>
                            <div className="balance-requests-table-container">
                                <Table size="medium" aria-label="a dense table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Создана</TableCell>
                                        <TableCell align="center">Телескоп</TableCell>
                                        <TableCell align="center">Количество запрашиваемых минут</TableCell>
                                        <TableCell align="center">Статус заявки</TableCell>
                                        <TableCell align="center">Одобрена (отклонена)</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {requests.map((row) => (
                                        <TableRow key={row.created}>
                                          <TableCell>
                                            {row.created}
                                          </TableCell>
                                          <TableCell align="center">{row.telescope}</TableCell>
                                          <TableCell align="center">{row.minutes}</TableCell>
                                          <TableCell align="center">{row.status}</TableCell>
                                          <TableCell align="center">{row.approved}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </ThemeProvider>
                    </div>
                </Paper>
            </div>
        );
    }
}



const mapStateToProps = ({ tasksReducer }) => ({
    telescopes: tasksReducer.telescopesWithBalances,
    requests: tasksReducer.requests,
});

const mapDispatchToProps = {
    getTelescopesWithBalances,
    getBalanceRequests,
};

export const Balance = connect(
  mapStateToProps,
  mapDispatchToProps
)(BalanceComponent);
