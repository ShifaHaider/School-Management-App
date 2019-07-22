import React, {Component} from 'react';
// import './style.css'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Find from './Find/find';
import AddStudents from './AddStudentData/add-student';

class Main extends Component {

    render() {


        return (
            <div className='main'>
                <Router>
                    <div>
                        <Route path="/main/find" component={Find}/>
                        <Route path="/main/add-students" component={AddStudents}/>
                    </div>
                </Router>
            </div>
        )
    }


}

export default Main;



