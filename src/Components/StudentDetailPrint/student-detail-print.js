import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


class StudentDetailPrint extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentDetail: JSON.parse(localStorage.getItem('studentDetail')),
        }
    }

    componentDidMount() {
        setTimeout(() => {
            window.print();
        }, 1000);
        window.onafterprint = function (event) {
            event.target.close();
        }
    }

    render() {
        return (
            <div>
                <h1>Student Details</h1>
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
                </Paper>
            </div>
        )
    }


}

export default StudentDetailPrint;



