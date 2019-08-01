import React, {Component} from 'react';
import ToolBarComponent from '../ToolBarComponent/toolbar-componet';
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
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from '@material-ui/core/TextField';


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
            heading: 'Students of year: ',
            loading: false,
            keyword: '',
            findLoading: false,
            error: "",
            searchResult: ""

        };
    }

    categoryChange(p, e) {
        this.setState({keyword: '' , [p]: e.target.value})
    }

    find() {
        this.setState({loading: true , keyword: ''});
        var filters = {
            admittedInClass: this.state.class,
            year: this.state.year,
        };
        if (filters.admittedInClass == 0) {
            delete filters.admittedInClass;
        }
        for (var v in filters) {
            if (!filters[v]) {
                delete filters[v];
            }
        }

        const url = 'https://school-management--app.herokuapp.com/students/find-student';
        fetch(url, {
            method: "post",
            body: JSON.stringify(filters),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((foundData, error) => {
                console.log(error);
                if (foundData.length == 0) {
                    this.setState({searchResult: "Search not found!! "})
                }
                else {
                    this.setState({searchResult: ""})

                }
                this.setState({loading: false, foundStudent: foundData, error: error})
            });
        })
            .catch((err) => {
                if (err == "TypeError: Failed to fetch") {
                    this.setState({
                        loading: false,
                        open: true,
                        searchResult: "Please connect to internet your device.."
                    });
                }
                console.log(err);
            });
    }

    studentDetail(data) {
        this.props.history.push('/main/view-student-detail/' + data._id);
    }

    print() {
        var title = "";
        var foundStudent = this.state.foundStudent;
        console.log(foundStudent);
        for (var i = 0; i < foundStudent.length; i++) {
            foundStudent[i].serialNo = i + 1;
            console.log(foundStudent[i].dateOfBirth);
            foundStudent[i].dateOfBirth = foundStudent[i].dateOfBirth ? new Date(foundStudent[i].dateOfBirth).toLocaleDateString() : '-';
            foundStudent[i].admissionDate = foundStudent[i].dateOfBirth ? new Date(foundStudent[i].admissionDate).toLocaleDateString(): "-";
            foundStudent[i].cnic = foundStudent[i].cnic ?  foundStudent[i].cnic: "-";
            foundStudent[i].phone = foundStudent[i].phone ?  foundStudent[i].phone: "-";
            foundStudent[i].lastInstitution = foundStudent[i].lastInstitution ?  foundStudent[i].lastInstitution: "-";
        }
        print({
            printable: this.state.foundStudent,
            properties: [
                {field: "serialNo", displayName: 'S.No'},
                {field: "name", displayName: 'Student Name'},
                {field: 'fatherName', displayName: "Father's Name"},
                {field: 'dateOfBirth', displayName: 'Date of Birth'},
                {field: 'address', displayName: 'Address'},
                {field: 'cnic', displayName: 'cnic No.'},
                {field: 'phone', displayName: 'Phone No'},
                {field: 'lastInstitution', displayName: 'Last Institution attended '},
                {field: 'admissionDate', displayName: 'Date of Admitted'},
                {field: 'admittedInClass', displayName: 'Admitted in Class'},
            ],
            gridStyle: 'font-size: 18px; border: 1px solid #000; white-space: pre; padding: 2px 2px 2px 2px; text-align: center; font-family: sans-serif;',
            gridHeaderStyle: 'font-size: 18px; font-weight: bold; border: 1px solid #000; padding: 2px 2px 2px 2px; text-align: center; font-family: sans-serif;',
            header: title,
            type: 'json'
        });
    }

    changeKeyword(e) {
        this.setState({class: '' , year: '',keyword: e.target.value})
    }

    searchByKeyword() {
        if (!this.state.keyword) {
            this.find();
            return;
        }
        const url = 'https://school-management--app.herokuapp.com/students/find-by-keyword/?keyword=' + this.state.keyword;
        console.log(this.state.keyword);
        this.setState({findLoading: true});
        fetch(url, {
            method: "get",
        })
            .then((data) => {
                data.json().then((students) => {
                    this.setState({foundStudent: students, findLoading: false})
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <ToolBarComponent title='Find'/>
                <div style={{margin: '115px auto 0', textAlign: "center"}}>
                    <FormControl variant="filled">
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
                    <TextField style={{marginTop: 0, width: '250px'}}
                               id="filled-name"
                               label="Search by keyword"
                               value={this.state.keyword}
                               onChange={this.changeKeyword.bind(this)}
                               margin="normal"
                               variant="filled"/>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Button variant="contained" color="primary" size='large' style={{padding: '15px 25px'}}
                            onClick={this.searchByKeyword.bind(this)}> Find {this.state.loading ? <div> &nbsp;&nbsp;
                        <CircularProgress style={{width: "20px", height: "20px", color: 'white'}}/>
                    </div> : null}</Button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    {this.state.foundStudent.length !== 0 ?
                        <Button variant="contained" color="primary" size='large' style={{padding: '15px 25px'}}
                                onClick={this.print.bind(this)}>Print</Button>
                        : null}
                    {this.state.searchResult ? <h3 style={{textAlign: "center"}}>{this.state.searchResult}</h3> : ''}
                </div>
                {this.state.foundStudent.length !== 0 ?
                    <Paper style={{margin: "0 16px 0 16px "}}>
                        <Table style={{minWidth: '700px'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name of Students</TableCell>
                                    <TableCell align="left">Father's Name</TableCell>
                                    <TableCell align="left">CNIC No.</TableCell>
                                    <TableCell align="left">Phone No.</TableCell>
                                    <TableCell align="left">Date of Birth</TableCell>
                                    <TableCell align="left" >Admitted in Class</TableCell>
                                    <TableCell align="left">Admitted Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.foundStudent.map((student, ind) => {
                                    return (
                                        <StyledTableRow key={ind} style={{cursor: 'pointer'}}>
                                            <StyledTableCell component="th" scope="row">
                                                {student.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="left"
                                                             onClick={this.studentDetail.bind(this, student)}>
                                                {student.fatherName}</StyledTableCell>
                                            <StyledTableCell align="left"
                                                             onClick={this.studentDetail.bind(this, student)}>
                                                {student.cnic ?student.cnic: "-"}</StyledTableCell>
                                            <StyledTableCell align="left"
                                                             onClick={this.studentDetail.bind(this, student)}>
                                                {student.phone?student.phone: "-"}</StyledTableCell>
                                            <StyledTableCell align="left"
                                                             onClick={this.studentDetail.bind(this, student)}>
                                                {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : "-"}</StyledTableCell>
                                            <StyledTableCell align="left" style={{textAlign: "center"}}
                                                             onClick={this.studentDetail.bind(this, student)}
                                            >{student.admittedInClass}</StyledTableCell>
                                            <StyledTableCell align="left"
                                                             onClick={this.studentDetail.bind(this, student)}
                                            >{new Date(student.admissionDate).toLocaleDateString()}</StyledTableCell>
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



