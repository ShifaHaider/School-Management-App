import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import print from 'print-js'


const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

class Print extends Component {

    constructor(props) {
        super(props);
       this.state={
           foundStudent: JSON.parse(localStorage.getItem('foundData')),
           someJSONData:  [
               {
                   name: 'John Doe',
                   email: 'john@doe.com',
                   phone: '111-111-1111'
               },
               {
                   name: 'Barry Allen',
                   email: 'barry@flash.com',
                   phone: '222-222-2222'
               },
               {
                   name: 'Cool Dude',
                   email: 'cool@dude.com',
                   phone: '333-333-3333'
               }
           ]

       };
    }

    componentDidMount(){
        console.log(this.state.foundStudent);
        setTimeout(()=>{
            // window.print();
          print({
                printable: this.state.foundStudent.data,
                properties: [
                    { field: "studentName", displayName: 'Student Name'},
                    { field: 'fatherName', displayName: "Father's Name"},
                    { field: 'dateOfBirth', displayName: 'Date of Birth'},
                    { field: 'address', displayName: 'Address'},
                    { field: 'CNIC', displayName: 'CNIC No.'},
                    { field: 'phoneNo', displayName: 'Phone No'},
                    { field: 'lastInstitution', displayName: 'Last Institution attended '},
                    { field: 'admissionDate', displayName: 'Date of Admitted'},
                    { field: 'admittedClass', displayName: 'Admitted in Class'},
                ],
              header: [this.state.foundStudent.title],

              type: 'json'
            });
        }, 2000);
        // window.printJS({
        //     printable: this.state.foundStudent,
        //     properties: [
        //         { field: 'studentName', displayName: 'Student Name'},
        //         { field: 'fatherName', displayName: "Father's Name"},
        //         { field: 'dateOfBirth', displayName: 'Date OF Birth'},
        //         { field: 'admittedClass', displayName: 'Admitted Class'},
        //         { field: 'admissionDate', displayName: 'Admitted Date'},
        //     ],
        //     type: 'json'
        // });
        window.onafterprint = function (event) {
            event.target.close();
        }


    }

    render() {


        return (
            <div>
                <Paper>
                    <Table style={{minWidth: '700px'}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Student Name</StyledTableCell>
                                <StyledTableCell align="right">Father Name</StyledTableCell>
                                <StyledTableCell align="right">DateOF Birth</StyledTableCell>
                                <StyledTableCell align="right">Admitted Class</StyledTableCell>
                                <StyledTableCell align="right">Admitted Date</StyledTableCell>
                                <StyledTableCell align="right">Admitted Date</StyledTableCell>
                                <StyledTableCell align="right">Admitted Date</StyledTableCell>
                                <StyledTableCell align="right">Admitted Date</StyledTableCell>
                                <StyledTableCell align="right">Admitted Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.foundStudent.data.map((student, ind) => {
                                return (
                                    <StyledTableRow key={ind} style={{cursor: 'pointer'}}>
                                        <StyledTableCell component="th" scope="row">{student.studentName}</StyledTableCell>
                                        <StyledTableCell align="right">{student.fatherName}</StyledTableCell>
                                        <StyledTableCell align="right">{student.dateOfBirth}</StyledTableCell>
                                        <StyledTableCell align="right">{student.admittedClass}</StyledTableCell>
                                        <StyledTableCell align="right">{student.address}</StyledTableCell>
                                        <StyledTableCell align="right">{student.CNIC}</StyledTableCell>
                                        <StyledTableCell align="right">{student.phoneNo}</StyledTableCell>
                                        <StyledTableCell align="right">{student.lastInstitution}</StyledTableCell>
                                        <StyledTableCell align="right">{student.admissionDate}</StyledTableCell>
                                        <StyledTableCell align="right">{student.admissionDate}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }


}

export default Print;



