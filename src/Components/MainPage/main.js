import React, {Component} from 'react';
// import './style.css'
import {BrowserRouter as Router, Route , Redirect} from "react-router-dom";
import Find from './Find/find';
import ReactVirtualizedTable from './Find/table';
import AddStudents from './AddStudentData/add-student';
import StudentDetail from "./StudentDetail/student-detail";
import StudentDetailPrint from "../StudentDetailPrint/student-detail-print";

class Main extends Component {

    render() {


        return (
            <div className='main'>
                <Router>
                    <div>
                        {/*<Route path="/main"  render={() => (<Redirect to='/main/find'/>)}/>*/}
                        <Route path="/main/find" exact component={Find}/>
                        <Route path="/main/find/table" exact component={ReactVirtualizedTable}/>
                        <Route path="/main/add-student" exact component={AddStudents}/>
                        <Route path="/main/student-detail-print" exact component={StudentDetailPrint}/>
                        <Route path="/main/view-student-detail/:id"  exact component={StudentDetail}/>
                    </div>
                </Router>
            </div>
        )
    }


}

export default Main;



