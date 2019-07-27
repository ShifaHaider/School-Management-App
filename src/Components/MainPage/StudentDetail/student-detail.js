import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import AutoComplete from "./auto-complete"
import ToolBarComponent from "../ToolBarComponent/toolbar-componet";
import Container from "@material-ui/core/Container";

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
        const url = 'https://school-management--app.herokuapp.com/students/find-student-detail';
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
    render() {
        console.log(this.state.studentDetail.photoURL);
        return (
            <div>
                <ToolBarComponent title="View Student Details"/>
                <Container maxWidth="md">
                {this.state.change ? <AutoComplete studentDetail={this.state.studentDetail}/> :
                    <Paper style={{margin: "20px 100px 15px 50px", padding: "10px 0 10px 10px"}}>
                        <img alt="Student pic" style={{height: "180px", width: "165px"}}
                             src={this.state.studentDetail.photoURL}/><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Student Name</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.name}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Father's Name</b></Typography>
                        <Typography variant="h6" component="p"><b>{this.state.studentDetail.fatherName}
                        </b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Date of Birth</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{new Date(this.state.studentDetail.dateOfBirth).toLocaleDateString()}
                                    </b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Address</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.address}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* cnic NO.</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.cnic}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Phone NO.</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.phone}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Last Institution Name</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.lastInstitution}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Admitted Class</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{this.state.studentDetail.admittedInClass}</b></Typography><br/><br/>
                        <Typography variant="h5" component="h3"><b>* Admission Date</b></Typography>
                        <Typography variant="h6"
                                    component="p"><b>{new Date(this.state.studentDetail.admissionDate).toLocaleDateString()}
                                    </b></Typography><br/>
                        <Button variant="contained" color="primary" size='large'
                                onClick={this.change.bind(this)}>Edit</Button>
                    </Paper>}
                </Container>
            </div>
        )
    }
}

export default StudentDetail;



