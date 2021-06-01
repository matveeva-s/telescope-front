import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {mainTheme} from "../styles/themes";

class Hello extends Component {

    componentDidMount(){
    }

    render(){
        return (
            <div className="paper-container">
                <Paper elevation={3} >
                    <div>
                        Добро пожаловать в систему дистанционного управления телескопами!
                        Что это такое?
                        Бла-бла-бла...
                        Как использовать?
                        Бла-бла-бла...
                    </div>
                </Paper>
            </div>
        )
    }
}

export default Hello;
