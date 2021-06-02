import React, { Component } from 'react';
import PropTypes from "prop-types";

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';


export class Notification extends Component {
    static propTypes = {
        level: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        closeNotification: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.props.isOpen && nextProps.isOpen) {
            setTimeout(() => {
              this.props.closeNotification();
            }, 15000)
        }
    }

    render() {
        const { isOpen, level, message } = this.props;
        return (
            <div className="notification-bar">
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    anchorOriginTopRight={ { top: 150, right: 24 } }
                    open={ isOpen }
                    onClose={ () => this.props.closeNotification() }
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={() => this.props.closeNotification()}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                >
                     <MuiAlert
                         severity={ level }
                         elevation={0}
                         variant="filled"
                         onClose={ () => this.props.closeNotification() }
                     >
                         { message }
                     </MuiAlert>
                </Snackbar>
            </div>
        );
    }
}
