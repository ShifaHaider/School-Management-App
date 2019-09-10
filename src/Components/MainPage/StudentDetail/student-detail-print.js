import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import "./style.css";

class StudentDetailPrint extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            window.print();
            // window.close();
        }, 1000);
    }

    render() {
        const studentData = JSON.parse(localStorage.getItem("studentData"));
        return (
            <div>
                <div style={{marginTop: "80px"}}>
                    <div style={{textAlign:"center"}}>
                        {studentData.photoUrl ?
                        <img alt="student pic" style={{borderRadius: "50%", height: "160px"}}
                             src={studentData.photoURL}/> : null }
                    </div>
                <Grid container style={{flexGrow: 1}} spacing={2}>
                    <Grid item xs={6}>
                        <table>
                            <tbody>
                            <tr className='row col '>
                                <td><b>Name:</b></td>&nbsp;&nbsp;
                                <td>{studentData.name}</td>
                            </tr>

                            <tr className='row col '>
                                <td><b>F/Name:</b></td>&nbsp;&nbsp;
                                <td>{studentData.fatherName}</td>
                            </tr>
                            <tr className='row col '>
                                <td><b>Date of Birth: </b></td>&nbsp;&nbsp;
                                <td>{studentData.dateOfBirth ? new Date(studentData.dateOfBirth).toLocaleDateString() : " -"}</td>
                            </tr>
                            <tr className='row col '>
                                <td><b>Current Class: </b></td>&nbsp;&nbsp;
                                <td>{studentData.currentClass}</td>
                            </tr>
                            <tr className='row col '>
                                <td><b>Admitted In Class: </b></td>&nbsp;&nbsp;
                                <td>{studentData.admittedInClass}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={6}>
                        <table>
                        <tbody>
                            <tr className='row col '>
                                <td><b>CNIC: </b> </td>&nbsp;&nbsp;
                                <td>{studentData.cnic?studentData.cnic:" -"}</td>
                            </tr>
                            <tr className='row col '>
                                <td><b>Phone: </b> </td>&nbsp;&nbsp;
                                <td>{studentData.phone? studentData.phone: " -"}</td>
                            </tr>
                            <tr className='row col '>
                                <td><b>Address: </b> </td>&nbsp;&nbsp;
                                <td>{studentData.address?studentData.address:" -"}</td>
                            </tr>
                            <tr className='row col '>
                                <td><b>Last Institution: </b></td>&nbsp;&nbsp;
                                <td>{studentData.lastInstitution?studentData.lastInstitution:" -"}</td>
                            </tr>
                            <tr className='row col '>
                                <td><b>Admission Date: </b></td>&nbsp;&nbsp;
                                <td>{studentData.admissionDate ? new Date(studentData.dateOfBirth).toLocaleDateString(): " -"}</td>
                            </tr>
                        </tbody>
                        </table>
                    </Grid>
                </Grid>
                </div>
            </div>
        )
    }


}

export default StudentDetailPrint;



