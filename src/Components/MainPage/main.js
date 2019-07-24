import React, {Component} from 'react';
// import './style.css'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Find from './Find/find';
import AddStudents from './AddStudentData/add-student';
import StudentDetail from "./StudentDetail/student-detail";

class Main extends Component {

    render() {


        return (
            <div className='main'>
                <Router>
                    <div>
                        {/*<Route path="/" component={Find}/>*/}
                        <Route path="/main/find" component={Find}/>
                        <Route path="/main/add-students" component={AddStudents}/>
                        <Route path="/main/view-student-detail/:id" component={StudentDetail}/>
                    </div>
                </Router>
            </div>
        )
    }


}

export default Main;



