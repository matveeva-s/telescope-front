import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import { AppBar, Toolbar, List, ListItem, ListItemText } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import MenuItem from '@material-ui/core/MenuItem';
import { LogoTitleHeader } from "./LogoTitle";
import { headerTheme} from "../styles/themes";
import { navigationLinks } from "../constants/appConstants";
import { getUserInfo } from '../actions/userActions';
import "../styles/header.css";
import axiosInstance from "../axiosApi";


class HeaderComponent extends Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        getUserInfo: PropTypes.func.isRequired,
    };

    state = {
        anchorEl: null,
    };

    componentDidMount() {
        this.props.getUserInfo();
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            window.location.href = '/login/';
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        const { firstName, lastName, avatar } = this.props;
        const { anchorEl } = this.state;

        return (
            <ThemeProvider theme={ headerTheme }>
                <AppBar position="static">
                    <Toolbar>
                        { LogoTitleHeader }
                        <div className="header_menu">
                            <List
                                component="nav"
                                aria-labelledby="main navigation"
                                className="menu-links-container"
                            >
                                { navigationLinks.map(({ title, path }) => (
                                    <a href={ path } key={ title } className="menu-link-text" >
                                        <ListItem button>
                                            <ListItemText primary={ title } />
                                        </ListItem>
                                    </a>
                                ))}
                            </List>
                            <div className="header_avatar-container">
                                <Avatar
                                    color="white"
                                    src={ avatar }
                                >
                                    { firstName[0] }
                                    { lastName[0] }
                                </Avatar>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={ event => this.handleClick(event) }
                                    style={{ padding: '20px 0' }}
                                >
                                    <ExpandMoreIcon className="expand-icon"/>
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    keepMounted
                                    anchorEl={ anchorEl }
                                    open={ Boolean(anchorEl) }
                                    onClose={ this.handleClose }
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                    getContentAnchorEl={null}
                                >
                                    <MenuItem>
                                        <a href="/profile/" className="profile-link">
                                            Профиль
                                        </a>
                                    </MenuItem>
                                    <MenuItem onClick={ this.handleLogout }>Выйти</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        ) }
};


const mapStateToProps = ({ userReducer }) => ({
    firstName: userReducer.firstName,
    lastName: userReducer.lastName,
    avatar: userReducer.avatar,
});

const mapDispatchToProps = {
    getUserInfo,
};

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent);

export default Header;
