import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import '../images/school2.jpg'
import Button from "@material-ui/core/Button";
class StudentDetail extends Component {
constructor(props){
    super(props);
    this.state={
        studentID: this.props.match.params.id,
        studentDetail: {}
    };
    this.loadDetailStudent();
}


    loadDetailStudent(){
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
                console.log(a);
                this.setState({studentDetail: a});
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }
    editProfile(){

    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '80px'}}><Typography color="inherit"
                    style={{fontSize: '25px'}}>View Student Detail</Typography></Toolbar>
                </AppBar>
                <Paper style={{margin: "10px 100px 15px 20px" , padding: "10px 0 10px 10px"}}>
                    <img alt="Student pic" style={{height: "180px" , width: "165px"}} src={'https://www.pixelstalk.net/wp-content/uploads/2014/12/cool-abstract-flower-HD-wallpaper.jpg'} /><br/>
                    <Typography variant="h4" component="h3"><b>* Student Name</b></Typography>
                    <Typography variant="h5" component="p"><b>{this.state.studentDetail.studentName}</b></Typography><br/><br/>
                    <Typography variant="h4" component="h3"><b>* Father's Name</b></Typography>
                    <Typography variant="h5" component="p"><b>{this.state.studentDetail.fatherName}</b></Typography><br/><br/>
                    <Typography variant="h4" component="h3"><b>* Date of Birth</b></Typography>
                    <Typography variant="h5" component="p"><b>{this.state.studentDetail.dateOfBirth}</b></Typography><br/><br/>
                    <Typography variant="h4" component="h3"><b>* Address</b></Typography>
                    <Typography variant="h5" component="p"><b>{this.state.studentDetail.address}</b></Typography><br/><br/>
                    <Typography variant="h4" component="h3"><b>* CNIC NO.</b></Typography>
                    <Typography variant="h5" component="p"><b>{this.state.studentDetail.CNIC}</b></Typography><br/><br/>
                    <Typography variant="h4" component="h3"><b>* Phone NO.</b></Typography>
                    <Typography variant="h5" component="p"><b>{this.state.studentDetail.phone}</b></Typography><br/><br/>
                    <Typography variant="h4" component="h3"><b>* Last Institution Name</b></Typography>
                    <Typography variant="h5" component="p"><b>{this.state.studentDetail.lastInstitution}</b></Typography><br/><br/>
                    <Typography variant="h4" component="h3"><b>* Admitted Class</b></Typography>
                    <Typography variant="h5" component="p"><b>{this.state.studentDetail.admittedClass}</b></Typography><br/><br/>
                    <Typography variant="h4" component="h3"><b>* Admission Date</b></Typography>
                    <Typography variant="h5" component="p"><b>{this.state.studentDetail.admissionDate}</b></Typography><br/>
                    <Button variant="contained" color="primary" size='large'
                            onClick={this.editProfile.bind(this)}>Edit</Button>
                </Paper>
            </div>
        )
    }
}

export default StudentDetail;



