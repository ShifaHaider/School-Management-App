import React, {Component} from 'react';
import Login from './Components/Login/login'
import Main from './Components/MainPage/main'
import firebase from 'firebase';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {main: '#00897b'},
    },
});
var adminID = localStorage.getItem('adminID');
var config = {
    apiKey: "AIzaSyAUItwpA9AmbqxtBKNcJSuRvXCbOMuSQkQ",
    authDomain: "react-smart-todo.firebaseapp.com",
    databaseURL: "https://react-smart-todo.firebaseio.com",
    projectId: "react-smart-todo",
    storageBucket: "react-smart-todo.appspot.com",
    messagingSenderId: "659919751663"
};
firebase.initializeApp(config);

class App extends Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <Router>
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
