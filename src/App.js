import React, {Component} from 'react';
import Login from './Components/Login/login'
import Main from './Components/MainPage/main'
import firebase from 'firebase';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {createBrowserHistory} from "history";
import image from './vBgXFc.png'


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

const bgStyle = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: "url(" + image + ")",
    width: "100%",
    height: "100vh",
    position: "fixed",
    opacity: "0.2",
    backgroundRepeat: "no-repeat",
    backgroundSize: "50% 50vw",
    backgroundPosition:"center",
    zIndex:"-22"
};
const history = createBrowserHistory();
class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                {/*<div style={bgStyle}/>*/}
                <div >
                    <Router history={history}>
                        <div>
                            <Route path="/" exact
                                   render={() => adminID ? <Redirect to='/main'/> : <Redirect to='/login'/>}/>
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
