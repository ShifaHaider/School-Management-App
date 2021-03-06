import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Find from './Find/find';
import ReactVirtualizedTable from './Find/table';
import AddStudents from './AddStudentData/add-student';
import StudentDetail from "./StudentDetail/student-detail";
import UpdateStudent from "./StudentDetail/update-student";
import StudentDetailPrint from "./StudentDetail/student-detail-print";
import MyCamera from "./AddStudentData/camera"

class Main extends Component {

    render() {


        return (
            <div className='main'>
                <Router>
                    <div>
                        <Route path="/main" exact render={() => (<Find/>)}/>
                        <Route path="/main/find" exact component={Find}/>
                        <Route path="/main/find/table" exact component={ReactVirtualizedTable}/>
                        <Route path="/main/add-student" component={AddStudents}/>
                        <Route path="/main/view-student-detail/:id" exact component={StudentDetail}/>
                        <Route path="/main/update-student" exact component={UpdateStudent}/>
                        <Route path="/main/camera" exact component={MyCamera}/>
                        <Route path="/main/student-detail-print" exact component={StudentDetailPrint}/>
                    </div>
                </Router>
            </div>
        )
    }


}

export default Main;



