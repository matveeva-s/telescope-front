import React, { Component } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Paper from '@material-ui/core/Paper';
import {mainTheme} from "../styles/themes";
import {getUserInfo} from "../actions/userActions";
import {ThemeProvider} from "@material-ui/styles";
import '../styles/hello.css';

class HelloComponent extends Component {

    static propTypes = {
        firstName: PropTypes.string.isRequired,
        getUserInfo: PropTypes.func.isRequired,
    };

    componentDidMount(){
        this.props.getUserInfo()
    }

    render() {
        const { firstName } = this.props;
        return (
            <div className="paper-container">
                <ThemeProvider theme={ mainTheme }>
                <Paper elevation={3} >
                    <div className="hello-container">
                        <div className="hello-content-container">
                            <div className="title text">{ firstName || 'Пользователь'}, добро пожаловать!</div>
                            <div className="subtitle text"> Что это такое? </div>
                            <div className="text simple-text">
                                <span className="service-name">Chronous</span> - система, которая позволяет дистанционно
                                использовать любой подключенный к сети телескоп, проводить наблюдения, хранить и просматривать их результаты
                            </div>
                            <div className="subtitle text"> Как использовать? </div>
                            <div className="text simple-text">
                                <li>Ознакомься со списком доступых телескопов <a href="telescopes/">здесь</a></li>
                                <li>
                                    Оформи заявку <a href="balance/">тут</a>, чтобы получить наблюдательное время
                                    на нужном телескопе
                                </li>
                                <li>Подожди пока администратор одобрит её и твой баланс пополнится</li>
                                <li>Создай <a href="new-task/">новое наблюдение</a>, выбрав телескоп и тип наблюдения</li>
                                <li>
                                    Когда наблюдение выполнится и <span className="service-name">Chronous</span> получит
                                    результат, ты найдешь его <a href="tasks/">здесь</a>
                                </li>
                            </div>
                        </div>
                        <div className="hello-image-container"/>
                    </div>
                </Paper>
                </ThemeProvider>
            </div>
        )
    }
}


const mapStateToProps = ({ userReducer }) => ({
    firstName: userReducer.firstName,
});

const mapDispatchToProps = {
    getUserInfo,
};

const Hello = connect(
    mapStateToProps,
    mapDispatchToProps
)(HelloComponent);

export default Hello;
