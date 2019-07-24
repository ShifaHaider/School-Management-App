import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
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
import {withStyles, makeStyles} from '@material-ui/core/styles';

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
                2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2000, 2001, 2002, 2003, 2004, 2005,
                2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
                2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043,
                2044, 2045, 2046, 2047, 2048, 2049, 2050],
            classList: ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
            year: '',
            class: '',
            foundStudent: [],


        };
    }

    categoryChange(p, e) {
        console.log(e.target.value);
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
        console.log(filters);
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
                console.log(foundData);
                this.setState({foundStudent: foundData})
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    studentDetail(data) {
        console.log(data);
        this.props.history.push('/main/view-student-detail/' + data._id);
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '80px'}}><Typography color="inherit"
                                                                     style={{fontSize: '25px'}}>FIND</Typography></Toolbar>
                </AppBar>
                <Card style={{width: '500px', margin: '20px 0 0 40px'}}>
                    <CardContent>
                        <div>
                            <FormControl variant="filled">
                                <InputLabel htmlFor="filled-age-native-simple">
                                    Search by Year
                                </InputLabel>
                                <Select style={{width: '150px'}}
                                        native
                                        value={this.state.year}
                                        onChange={this.categoryChange.bind(this, 'year')}
                                        input={
                                            <FilledInput name="age" id="filled-age-native-simple"/>
                                        }>
                                    {this.state.yearsList.map((val, ind) => {
                                        return (
                                            <option key={ind} value={val}>{val}</option>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl variant="filled">
                                <InputLabel htmlFor="filled-age-native-simple">
                                    Search by Class
                                </InputLabel>
                                <Select style={{width: '150px'}}
                                        native
                                        value={this.state.class}
                                        onChange={this.categoryChange.bind(this, 'class')}
                                        input={
                                            <FilledInput name="age" id="filled-age-native-simple"/>
                                        }
                                >
                                    {this.state.classList.map((val, ind) => {
                                        return (
                                            <option key={ind} value={ind}>{val}</option>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <Button variant="contained" color="primary" size='large'
                                onClick={this.find.bind(this)}>Find</Button>
                    </CardContent>
                </Card><br/><br/><br/>
                {this.state.foundStudent.length != 0 ?
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
                                    console.log(student , ind);
                                    return (
                                        <StyledTableRow key={ind} style={{cursor: 'pointer'}}>
                                            <StyledTableCell component="th" scope="row">
                                                {student.studentName}
                                            </StyledTableCell>
                                            <StyledTableCell align="right"
                                                             onClick={this.studentDetail.bind(this , student)}>
                                                {student.fatherName}</StyledTableCell>
                                            <StyledTableCell align="right" onClick={this.studentDetail.bind(this , student)}
                                            >{student.dateOfBirth}</StyledTableCell>
                                            <StyledTableCell align="right" onClick={this.studentDetail.bind(this , student)}
                                            >{student.admittedClass}</StyledTableCell>
                                            <StyledTableCell align="right" onClick={this.studentDetail.bind(this , student)}
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



