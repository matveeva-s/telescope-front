import React, { Component} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "./components/LoginPage";
import { Telescopes } from "./components/Telescopes";
import { NewTask } from "./components/NewTask";
import Hello from "./components/HelloPage";
import Header from "./components/Header";
import axiosInstance from "./axiosApi";

class App extends Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

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
        return (
            <div className="site">
                <Header />
                <nav>
                    <a href={"/"}>Home</a>
                    <a href={"/login/"}>Login</a>
                    <a href={"/hello/"}>Hello</a>
                    <button onClick={this.handleLogout}>Logout</button>
                </nav>
                <main>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path={"/login/"} component={ Login }/>
                            <Route exact path={"/telescopes/"} component={ Telescopes }/>
                            <Route exact path={"/new-task/"} component={ NewTask }/>
                            <Route exact path={"/"} component={ Hello }/>
                            <Route path={"/"} render={() => <div>Home again</div>}/>
                        </Switch>
                    </BrowserRouter>
                </main>
            </div>
        );
    }
}

export default App;
