import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';


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

       }
    }
    componentDidMount(){
        setTimeout(()=>{
            window.print();
        }, 1000);

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
                                <StyledTableCell align="right">DateOFBirth</StyledTableCell>
                                <StyledTableCell align="right">AdmittedClass</StyledTableCell>
                                <StyledTableCell align="right">AdmittedDate</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.foundStudent.map((student, ind) => {
                                return (
                                    <StyledTableRow key={ind} style={{cursor: 'pointer'}}>
                                        <StyledTableCell component="th" scope="row">
                                            {student.studentName}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {student.fatherName}</StyledTableCell>
                                        <StyledTableCell align="right"
                                        >{student.dateOfBirth}</StyledTableCell>
                                        <StyledTableCell align="right"
                                        >{student.admittedClass}</StyledTableCell>
                                        <StyledTableCell align="right"
                                        >{student.admissionDate}</StyledTableCell>
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



