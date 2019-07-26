import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import AutoComplete from "./auto-complete"
import ToolBarComponent from "../ToolBarComponent/toolbar-componet";

class StudentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentID: this.props.match.params.id,
            studentDetail: {},
            open: false,

        };
        this.loadDetailStudent();
    }


    loadDetailStudent() {
        const url = 'http://localhost:9000/find-students/find-student-detail';
        fetch(url, {
            method: "post",
            body: JSON.stringify({studentID: this.state.studentID}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((a) => {
                this.setState({studentDetail: a});
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    change() {
        this.setState({change: "change"})
    }

    print() {
        localStorage.setItem('studentDetail', JSON.stringify(this.state.studentDetail));
        window.open('/main/student-detail-print', "_blank");
    }
    render() {
        console.log(this.state.studentDetail.studentPhotoURL);
        return (
            <div>
                <ToolBarComponent title="View Student Details"/>
                {this.state.change ? <AutoComplete studentDetail={this.state.studentDetail}/> :
                    <Paper style={{margin: "20px 100px 15px 50px", padding: "10px 0 10px 10px", width: "900px"}}>
                        <img alt="Student pic" style={{height: "180px", width: "165px"}}
                             src={this.state.studentDetail.studentPhotoURL}/><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Student Name</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.studentName}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Father's Name</b></Typography>
                        <Typography variant="h6" component="p"><b>{this.state.studentDetail.fatherName}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Date of Birth</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.dateOfBirth}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Address</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.address}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* CNIC NO.</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.CNIC}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Phone NO.</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.phoneNo}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Last Institution Name</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.lastInstitution}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Admitted Class</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.admittedClass}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Admission Date</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.admissionDate}</b></Typography><br/>
                        <Button variant="contained" color="primary" size='large'
                                onClick={this.change.bind(this)}>Edit</Button>
                        <Button variant="contained" color="primary" size='large'
                                onClick={this.print.bind(this)}>Print</Button>
                    </Paper>}
            </div>
        )
    }
}

export default StudentDetail;



