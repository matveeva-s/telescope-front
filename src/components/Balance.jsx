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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Notification } from "./Notification";
import {ThemeProvider} from "@material-ui/styles";
import {taskFormTheme} from "../styles/themes";
import { getTelescopesWithBalances } from '../actions/taskActions';
import { getBalanceRequests, saveRequest, closeNotification } from '../actions/balanceActions';
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
        saveRequest: PropTypes.func.isRequired,
        requests: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        notificationMessage: PropTypes.string,
        notificationLevel: PropTypes.string,
        notificationIsOpen: PropTypes.bool,
        closeNotification: PropTypes.func.isRequired,
    };

    state = {
        dialogIsOpen: false,
        telescopeName: '',
        telescopeId: null,
        minutes: null,
        minutesError: '',
    };

    componentDidMount() {
        this.props.getTelescopesWithBalances();
        this.props.getBalanceRequests();
    }

    openDialog = (telescopeName, telescopeId) => {
        this.setState({dialogIsOpen: true, telescopeId, telescopeName})
    };

    closeDialog = () => {
        this.setState({
            dialogIsOpen: false,
            telescopeId: null,
            telescopeName: '',
            minutes: null,
            minutesError: '',
        })
    };

    changeMinutes = (value) => {
        this.setState({
            minutes: value,
            minutesError: '',
        })
    };

    sendRequest = (telescopeId, minutes) => {
        if (parseInt(minutes) < 0) {
            this.setState({minutesError: 'Введено отрицательное время'});
            return;
        }
        this.props.saveRequest({telescope: parseInt(telescopeId), minutes: parseInt(minutes)});
        this.setState({
            dialogIsOpen: false,
            telescopeId: null,
            telescopeName: '',
            minutes: null,
            minutesError: '',
        });
    };

    get balanceTable () {
        const { telescopes } = this.props;
        return (
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
                                <TableCell align="center">
                                    <Button color="primary" onClick={() => this.openDialog(row.label, row.value)}>
                                        Получить время
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }

    get requestsTable () {
        const { requests } = this.props;
        return (
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
        )
    }

    render() {
        const { dialogIsOpen, telescopeId, telescopeName, minutes, minutesError } = this.state;
        const { notificationIsOpen, notificationLevel, notificationMessage } = this.props;
        return (
            <div className="paper-container">
                <Paper elevation={3}>
                    <div className="balance-content-container">
                        <ThemeProvider theme={ taskFormTheme }>
                            <div className="balance-page-title">Баланс наблюдательного времени</div>
                            { this.balanceTable }
                            <div className="balance-page-title">Мои заявки</div>
                            { this.requestsTable }
                        </ThemeProvider>
                    </div>
                </Paper>
                <Dialog open={ dialogIsOpen } onClose={() => this.setState({ dialogIsOpen: false })} aria-labelledby="form-dialog-title">
                    <DialogTitle>Заявка на получение наблюдательного времени</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                          Cколько минут Вы бы хотели получить для наблюдения на телескопе <b>{ telescopeName }</b>?
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Количество минут"
                        type="number"
                        value={ minutes }
                        helperText={ minutesError }
                        error={ minutesError }
                        onChange={(event) => this.changeMinutes(event.target.value)}
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.closeDialog()} color="primary">
                          Отмена
                      </Button>
                      <Button onClick={() => this.sendRequest(telescopeId, minutes)} color="primary">
                          Запросить
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Notification
                      level={ notificationLevel }
                      message={ notificationMessage }
                      isOpen={ notificationIsOpen }
                      closeNotification={ this.props.closeNotification }
                  />
            </div>
        );
    }
}



const mapStateToProps = ({ balanceReducer, tasksReducer }) => ({
    telescopes: tasksReducer.telescopesWithBalances,
    requests: balanceReducer.requests,
    notificationLevel: balanceReducer.notificationLevel,
    notificationMessage: balanceReducer.notificationMessage,
    notificationIsOpen: balanceReducer.notificationIsOpen,
});

const mapDispatchToProps = {
    getTelescopesWithBalances,
    getBalanceRequests,
    saveRequest,
    closeNotification,
};

export const Balance = connect(
  mapStateToProps,
  mapDispatchToProps
)(BalanceComponent);
