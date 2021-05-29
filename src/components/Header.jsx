import React  from "react";
import {connect} from "react-redux";

import { AppBar, Toolbar, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import MenuItem from '@material-ui/core/MenuItem';
import { LogoTitleHeader } from "./LogoTitle";
import { headerTheme} from "../styles/themes";
import { navigationLinks } from "../constants/appConstants";
import { navigationMenuStyles } from "../styles/styles";
import "../styles/header.css";


const useStyles = makeStyles(navigationMenuStyles);

const HeaderComponent = (props) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ThemeProvider theme={ headerTheme }>
            <AppBar position="static">
                <Toolbar>
                    { LogoTitleHeader }
                    <div className="header_menu">
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                            className={ classes.navDisplayFlex }
                        >
                            { navigationLinks.map(({ title, path }) => (
                                <a href={ path } key={ title } className={ classes.linkText }>
                                    <ListItem button>
                                        <ListItemText primary={ title } />
                                    </ListItem>
                                </a>
                            ))}
                        </List>
                        <div className="header_avatar-container">
                            <Avatar color="white">
                                { props.firstName[0] }
                                { props.lastName[0] }
                            </Avatar>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={ handleClick }
                                style={{ padding: '20px 0' }}
                            >
                                <ExpandMoreIcon className={ classes.expandButton }/>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                transformOrigin={{ vertical: "top", horizontal: "center" }}
                                getContentAnchorEl={null}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
  )
};


const mapStateToProps = ({ userReducer }) => ({
    firstName: userReducer.firstName,
    lastName: userReducer.lastName,
});

const Header = connect(
  mapStateToProps,
)(HeaderComponent);

export default Header;
