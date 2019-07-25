import React, {Component} from 'react';
import Login from './Components/Login/login'
import Main from './Components/MainPage/main'
import firebase from 'firebase';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

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
            <div>
                <Router>
                    <div>
                        <Route path="/main" component={Main}/>
                        <Route path="/login" component={Login}/>
                        {/*<Route path="/image-cropper" component={ImageCropper}/>*/}
                        {/*<Route path="/login" component={Login}/>*/}
                        {/*<Route path="/"  render={() => (adminID ? <Redirect to='/main'/> : <Redirect to='/login'/>)}/>*/}
                        {/*<Route path="/login" exact render={() => (adminID ? <Redirect to='/main'/> : <Login/>)}/>*/}
                        {/*<Route path=""  render={() => (!adminID ? <Redirect to='/login'/> : <Main/>)}/>*/}
                    </div>
                </Router>
            </div>
        )
    }


}

export default App;
