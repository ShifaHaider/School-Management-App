import React, {Component} from 'react';
import ToolBarComponent from '../ToolBarComponent/toolbar-componet';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import print from 'print-js'
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';


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

class Find extends Component {
    constructor() {
        super();
        this.state = {
            yearsList: ['', 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
                2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
                2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2050],
            classList: ["", "Reception", "Junior", "Senior", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
            year: '',
            class: '',
            foundStudent: [],
            heading: 'Students of year: '

        };
    }

    categoryChange(p, e) {
        this.setState({[p]: e.target.value})
    }

    find() {
        var filters = {
            admittedClass: this.state.class,
            year: this.state.year,
        };
        if (filters.admittedClass == 0) {
            delete filters.admittedClass;
        }
        for (var v in filters) {
            if (!filters[v]) {
                delete filters[v];
            }
        }
        const url = 'http://localhost:9000/find-students/find-student';
        fetch(url, {
            method: "post",
            body: JSON.stringify(filters),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((foundData) => {
                // console.log(foundData);
                this.setState({foundStudent: foundData})
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    studentDetail(data) {
        this.props.history.push('/main/view-student-detail/' + data._id);
    }

    print() {
        var title = "";
        var foundStudent = this.state.foundStudent;
        for (var i = 0; i < foundStudent.length; i++) {
            foundStudent[i].serialNo = ++i;
            if (foundStudent[i].dateOfBirth) {
                foundStudent[i].dateOfBirth = new Date(foundStudent[i].dateOfBirth).toLocaleDateString();
            }
            else if (foundStudent[i].admissionDate) {
                foundStudent[i].admissionDate = new Date(foundStudent[i].admissionDate).toLocaleDateString();
            }
        }
        print({
            printable: this.state.foundStudent,
            properties: [
                {field: "studentName", displayName: 'Student Name'},
                {field: "serialNo", displayName: 'S.No'},
                {field: 'fatherName', displayName: "Father's Name"},
                {field: 'dateOfBirth', displayName: 'Date of Birth'},
                {field: 'address', displayName: 'Address'},
                {field: 'CNIC', displayName: 'CNIC No.'},
                {field: 'phoneNo', displayName: 'Phone No'},
                {field: 'lastInstitution', displayName: 'Last Institution attended '},
                {field: 'admissionDate', displayName: 'Date of Admitted'},
                {field: 'admittedClass', displayName: 'Admitted in Class'},
            ],
            gridStyle: 'font-size: 18px; border: 1px solid #000; white-space: pre; padding: 2px 2px 2px 2px; text-align: center',
            gridHeaderStyle: 'font-size: 18px; font-weight: bold; border: 1px solid #000; padding: 2px 2px 2px 2px; text-align: center; ',
            header: title,
            type: 'json'
        });
    }

    render() {
        return (
            <div>
                <ToolBarComponent title="Find"/>
                <div style={{margin: '12px auto', textAlign: "center"}}>
                    <FormControl variant="filled"
                    >
                        <InputLabel htmlFor="filled-age-simple">Search by Year</InputLabel>
                        <Select style={{width: '250px'}}
                                value={this.state.year}
                                onChange={this.categoryChange.bind(this, 'year')}
                                input={<FilledInput name="age" id="filled-age-simple"/>}
                        >
                            {this.state.yearsList.map((val, ind) => {
                                return (
                                    <MenuItem key={ind} value={val}>{val}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <FormControl variant="filled">
                        <InputLabel htmlFor="filled-age-simple">Search by Class</InputLabel>
                        <Select style={{width: '250px'}}
                                value={this.state.class}
                                onChange={this.categoryChange.bind(this, 'class')}
                                input={<FilledInput name="age" id="filled-age-simple"/>}
                        >
                            {this.state.classList.map((val, ind) => {
                                return (
                                    <MenuItem key={ind} value={val}>{val}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Button variant="contained" color="primary" size='large' style={{padding: '15px 25px'}}
                            onClick={this.find.bind(this)}>Find</Button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    {this.state.foundStudent.length !== 0 ?
                        <Button variant="contained" color="primary" size='large' style={{padding: '15px 25px'}}
                                onClick={this.print.bind(this)}>Print</Button>
                        : null}

                </div>
                <br/>
                {this.state.foundStudent.length !== 0 ?
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
                                            <StyledTableCell align="right"
                                                             onClick={this.studentDetail.bind(this, student)}>
                                                {student.fatherName}</StyledTableCell>
                                            <StyledTableCell align="right"
                                                             onClick={this.studentDetail.bind(this, student)}
                                            >{student.dateOfBirth}</StyledTableCell>
                                            <StyledTableCell align="right"
                                                             onClick={this.studentDetail.bind(this, student)}
                                            >{student.admittedClass}</StyledTableCell>
                                            <StyledTableCell align="right"
                                                             onClick={this.studentDetail.bind(this, student)}
                                            >{student.admissionDate}</StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Paper> : null}

            </div>
        )
    }


}

export default Find;



