import React, { Component } from 'react';
import {connect} from "react-redux";

import { ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { LogoTitleBig } from "./LogoTitle";
import axiosInstance from "../axiosApi";
import '../styles/loginPage.css';
import { getUserInfo } from "../actions/userActions";
import PropTypes from "prop-types";
import { mainTheme } from '../styles/themes';


const homePageUrl = '/';

class LoginComponent extends Component {
    static propTypes = {
        getUserInfo: PropTypes.func.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {username: '', password: '', isError: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            const data = response.data;
            axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access;
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            setTimeout(
                () => {
                    this.props.getUserInfo();
                }, 3000
            );
            window.location.href = homePageUrl;
            return data;
        } catch (error) {
            this.setState({
                isError: true,
            });
            throw error;
        }

    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="login_page">
                <ThemeProvider theme={ mainTheme }>
                    <div className="login_page--background_img"/>
                    <div className="login_page--main-data">
                        { LogoTitleBig }
                        <div className="login_page--slogan-text">Система дистанционного доступа<br/>и управления сетью телескопов</div>
                        <form className="login_page--form-container" onSubmit={ this.handleSubmit }>
                            <div className="login_page--form-element">
                                <TextField
                                    name="username"
                                    placeholder="Адрес email"
                                    value={ username }
                                    onChange={ this.handleChange }
                                    className="login_page--form-input"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="login_page--form-element">
                                <TextField
                                    name="password"
                                    placeholder="Пароль"
                                    value={ password }
                                    type="password"
                                    onChange={ this.handleChange }
                                    className="login_page--form-input"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="login_page--form-element login_page--button-container">
                                <Button
                                    variant="contained"
                                    onClick={ this.handleSubmit }
                                    className="login_page--form-button"
                                    disableElevation
                                    type="submit"
                                    size="large"
                                    color="inherit"
                                >
                                    Войти
                                </Button>
                            </div>
                            { this.state.isError
                                ? (
                                    <div className="login_page--error-text">
                                        Ошибка аутентефикации, повторите попытку
                                    </div>
                                ) : null
                            }

                        </form>
                    </div>
                </ThemeProvider>
            </div>
        )
    }
}


const mapStateToProps = ({ userReducer }) => ({
    firstName: userReducer.firstName,
    lastName: userReducer.lastName,
});

const mapDispatchToProps = {
    getUserInfo,
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
