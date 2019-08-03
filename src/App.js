import React, {Component} from 'react';
import Login from './Components/Login/login'
import Main from './Components/MainPage/main'
import firebase from 'firebase';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const theme = createMuiTheme({
    palette: {
        primary: {main: '#00897b'},
    },
});
var adminID = localStorage.getItem('adminID');
var firebaseConfig = {
    apiKey: "AIzaSyCUCzxHxUaymfJoAZIRD_1hDczuZxrbdCA",
    authDomain: "school-management-160cf.firebaseapp.com",
    databaseURL: "https://school-management-160cf.firebaseio.com",
    projectId: "school-management-160cf",
    storageBucket: "school-management-160cf.appspot.com",
    messagingSenderId: "592758080526",
    appId: "1:592758080526:web:3166c28a95168ae9"
};
firebase.initializeApp(firebaseConfig);

class App extends Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <Router history={history}>
                        <div>
                            <Route path="/" exact render={() => adminID ? <Redirect to='/main'/> : <Redirect to='/login'/>}/>
                            <Route path="/main" render={() => (adminID ? <Main/> : <Redirect to='/login'/>)}/>
                            <Route path="/login" exact render={() => (adminID ? <Redirect to='/main'/> : <Login/>)}/>
                        </div>
                    </Router>
                </div>
            </ThemeProvider>

        )
    }


}

export default App;
