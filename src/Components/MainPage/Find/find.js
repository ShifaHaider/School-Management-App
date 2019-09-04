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
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PrintIcon from '@material-ui/icons/Print';
import TruncatePipe from './truncate';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from "../../../Images/icons8-material-rounded-icons-24.png";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
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

const actions = [
    {
        icon: <img src={Icon} width="24" height="24"/>, name: 'Download as JSON'
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24" height="24" fill="#000000">
                <path
                    d="M 15 3 A 2 2 0 0 0 14.599609 3.0429688 L 14.597656 3.0410156 L 4.6289062 5.0351562 L 4.6269531 5.0371094 A 2 2 0 0 0 3 7 L 3 23 A 2 2 0 0 0 4.6289062 24.964844 L 14.597656 26.958984 A 2 2 0 0 0 15 27 A 2 2 0 0 0 17 25 L 17 5 A 2 2 0 0 0 15 3 z M 19 5 L 19 8 L 21 8 L 21 10 L 19 10 L 19 12 L 21 12 L 21 14 L 19 14 L 19 16 L 21 16 L 21 18 L 19 18 L 19 20 L 21 20 L 21 22 L 19 22 L 19 25 L 25 25 C 26.105 25 27 24.105 27 23 L 27 7 C 27 5.895 26.105 5 25 5 L 19 5 z M 23 8 L 24 8 C 24.552 8 25 8.448 25 9 C 25 9.552 24.552 10 24 10 L 23 10 L 23 8 z M 6.1855469 10 L 8.5878906 10 L 9.8320312 12.990234 C 9.9330313 13.234234 10.013797 13.516891 10.091797 13.837891 L 10.125 13.837891 C 10.17 13.644891 10.258531 13.351797 10.394531 12.966797 L 11.785156 10 L 13.972656 10 L 11.359375 14.955078 L 14.050781 19.998047 L 11.716797 19.998047 L 10.212891 16.740234 C 10.155891 16.625234 10.089203 16.393266 10.033203 16.072266 L 10.011719 16.072266 C 9.9777187 16.226266 9.9105937 16.458578 9.8085938 16.767578 L 8.2949219 20 L 5.9492188 20 L 8.7324219 14.994141 L 6.1855469 10 z M 23 12 L 24 12 C 24.552 12 25 12.448 25 13 C 25 13.552 24.552 14 24 14 L 23 14 L 23 12 z M 23 16 L 24 16 C 24.552 16 25 16.448 25 17 C 25 17.552 24.552 18 24 18 L 23 18 L 23 16 z M 23 20 L 24 20 C 24.552 20 25 20.448 25 21 C 25 21.552 24.552 22 24 22 L 23 22 L 23 20 z"/>
            </svg>, name: "Download as Excel"
    },
    {icon: <PrintIcon style={{color: "#000000", width: "24", height: "24"}}/>, name: 'Print'},

];

class Find extends Component {

    constructor() {
        super();
        this.state = {
            yearsList: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,],
            classList: ["Reception", "Junior", "Senior", "P.P.I", "P.P.II", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
            year: '',
            class: '',
            foundStudent: [],
            heading: 'Students of year: ',
            loading: false,
            keyword: '',
            findLoading: false,
            error: "",
            searchResult: "",
            startDOF: Date.now() - (1000 * 60 * 60 * 24 * 365),
            endDOF: Date.now(),
            dateLoading: false,
            showPrintButton: false,
            printButton: false,
            drawerWidth: 240,
            speedDialOpen: false,
            open: false,
        };
    }

    categoryChange(p, e) {
        this.setState({keyword: '', [p]: e.target.value})
    }

    find() {
        this.setState({loading: true, keyword: ''});
        var filters = {
            currentClass: this.state.class,
            year: this.state.year,
        };
        if (filters.currentClass == 0) {
            delete filters.currentClass;
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
                if (foundData.length == 0) {
                    this.setState({searchResult: "Search not found!! "})
                } else {
                    this.setState({searchResult: "", printButton: true})
                }
                this.setState({loading: false, foundStudent: foundData, error: error})
            });
        })
            .catch((err) => {
                if (err == "TypeError: Failed to fetch") {
                    this.setState({
                        loading: false,
                        open: true,
                        searchResult: "Please check your internet connection.."
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
        for (var i = 0; i < foundStudent.length; i++) {
            foundStudent[i].serialNo = i + 1;
            foundStudent[i].dateOfBirth = foundStudent[i].dateOfBirth ? new Date(foundStudent[i].dateOfBirth).toLocaleDateString() : '-';
            foundStudent[i].admissionDate = foundStudent[i].dateOfBirth ? new Date(foundStudent[i].admissionDate).toLocaleDateString() : "-";
            foundStudent[i].cnic = foundStudent[i].cnic ? foundStudent[i].cnic : "-";
            foundStudent[i].phone = foundStudent[i].phone ? foundStudent[i].phone : "-";
            foundStudent[i].lastInstitution = foundStudent[i].lastInstitution ? foundStudent[i].lastInstitution : "-";
        }
        print({
            printable: foundStudent,
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
        this.setState({class: '', year: '', keyword: e.target.value})
    }

    searchByKeyword() {
        if (!this.state.keyword) {
            this.find();
            return;
        }
        const url = 'https://school-management--app.herokuapp.com/students/find-by-keyword/?keyword=' + this.state.keyword;
        this.setState({loading: true});
        fetch(url, {
            method: "get",
        })
            .then((data) => {
                data.json().then((students) => {
                    if (students.length == 0) {
                        this.setState({searchResult: "Search not found!!"})
                    } else {
                        this.setState({searchResult: "", printButton: true})
                    }
                    this.setState({foundStudent: students, loading: false});
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleDateChange(p, e) {
        this.setState({[p]: e});
    }

    searchByDOB() {
        var startDate = new Date(this.state.startDOF).getTime();
        var endDate = new Date(this.state.endDOF).getTime();
        const url = 'https://school-management--app.herokuapp.com/students/find-by-date-of-birth/?startDate=' + startDate + '&endDate=' + endDate;
        this.setState({dateLoading: true});
        fetch(url, {
            method: "get",
        })
            .then((data) => {
                data.json().then((students) => {
                    if (students.length == 0) {
                        this.setState({searchResult: "Search not found!!"});
                    } else {
                        this.setState({searchResult: ""})
                    }
                    this.setState({
                        foundStudent: students,
                        dateLoading: false,
                        showPrintButton: true,
                        printButton: false
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.searchByKeyword();
        }
    }

    createAndDownloadFileExcel() {
        this.setState({open: true});
        var foundStudent = this.state.foundStudent;
        var studentsData = [];
        for (var i = 0; i < foundStudent.length; i++) {
            var newObj = {};
            newObj["S No"] = i + 1;
            newObj.Name = foundStudent[i].name;
            newObj["Father Name"] = foundStudent[i].fatherName;
            newObj.Address = foundStudent[i].address?foundStudent[i].address:"";
            newObj["Last Institution"] = foundStudent[i].lastInstitution ? foundStudent[i].lastInstitution : "";
            newObj["CNIC No"] = foundStudent[i].cnic ? foundStudent[i].cnic : "";
            newObj["Phone No"] = foundStudent[i].phone ? foundStudent[i].phone : "";
            newObj["Admitted In Class"] = foundStudent[i].admittedInClass;
            newObj["Current Class"] = foundStudent[i].currentClass;
            newObj.Year = foundStudent[i].year;
            newObj["Date Of Birth"] = new Date(foundStudent[i].dateOfBirth).toLocaleDateString();
            newObj["Date Of Admission"] = new Date(foundStudent[i].admissionDate).toLocaleDateString();
            studentsData.push(newObj);
        }
        const url = 'https://school-management--app.herokuapp.com/students/create-xls-file';
        fetch(url, {
            method: "post",
            body: JSON.stringify(studentsData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                response.blob().then((blob) => {
                    this.setState({open: false});
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    var url = window.URL.createObjectURL(blob);
                    a.download = 'downloaded-data.xls';
                    a.href = url;
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
            })
    };

    createAndDownloadFileJson() {
        var a = document.createElement("a");
        document.body.appendChild(a);
        var json = JSON.stringify(this.state.foundStudent);
        var blob = new Blob([json], {type: "application/json"});
        var url = window.URL.createObjectURL(blob);
        a.download = 'downloaded-data-in-json';
        a.href = url;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    handleClick(actionName, e) {
        if (actionName === "Download as Excel") {
            this.createAndDownloadFileExcel();
        } else if (actionName === "Download as JSON") {
            this.createAndDownloadFileJson();
        } else if (actionName === "Print") {
            this.print();
        }
    };

    handleOpen = () => {
        this.setState({speedDialOpen: true});
    };

    handleClose = () => {
        this.setState({speedDialOpen: false});
    };
    dialogClose(){
        this.setState({open: false});
    }
    render() {
        return (
            <div>
                <ToolBarComponent title='Find'/>
                <div style={{margin: '80px auto 0', textAlign: "center"}}>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="filled-age-simple">Search by Year</InputLabel>
                        <Select style={{width: '250px'}}
                                value={this.state.year}
                                onChange={this.categoryChange.bind(this, 'year')}
                                input={<FilledInput name="age" id="filled-age-simple"/>}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
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
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
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
                               onKeyPress={this.handleKeyPress.bind(this)}
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
                </div>

                <div style={{textAlign: "center", margin: '12px auto 0'}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} style={{}}>
                        <DatePicker disableFuture openTo="year" format="dd/MM/yyyy" views={["year", "month", "date"]}
                                    inputVariant="filled"
                                    value={this.state.startDOF} label=' Start Date'
                                    onChange={this.handleDateChange.bind(this, 'startDOF')}
                                    style={{flex: "1 1", width: '250px'}}/>
                    </MuiPickersUtilsProvider>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <MuiPickersUtilsProvider utils={DateFnsUtils} style={{width: '250px'}}>
                        <DatePicker inputVariant="filled" disableFuture openTo="year" format="dd/MM/yyyy"
                                    views={["year", "month", "date"]}
                                    value={this.state.endDOF} label='End Date'
                                    onChange={this.handleDateChange.bind(this, 'endDOF')}
                                    style={{flex: "1 1", width: '250px'}}/>
                    </MuiPickersUtilsProvider>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Button variant="contained" color="primary" size='large' style={{padding: '15px 25px'}}
                            onClick={this.searchByDOB.bind(this)}> Find {this.state.dateLoading ? <div> &nbsp;&nbsp;
                        <CircularProgress style={{width: "20px", height: "20px", color: 'white'}}/>
                    </div> : null}</Button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                </div>
                {this.state.searchResult ?
                    <div><br/><h3 style={{textAlign: "center"}}>{this.state.searchResult}</h3></div> : ''}
                {this.state.foundStudent.length !== 0 ?
                    <Paper style={{margin: "0px 16px 0 16px "}}>
                        <Toolbar>
                            <div style={{flexGrow: 1,}}>
                                <Typography variant="h6" id="tableTitle">
                                    Total: {this.state.foundStudent.length}
                                </Typography>
                            </div>
                            <div style={{marginTop: "12px"}}>
                                <SpeedDial
                                    ariaLabel="SpeedDial example"
                                    icon={<MoreIcon/>}
                                    onBlur={this.handleOpen}
                                    onClick={this.handleClick}
                                    onClose={this.handleClose}
                                    onFocus={this.handleOpen}
                                    onMouseEnter={this.handleOpen}
                                    onMouseLeave={this.handleClose}
                                    open={this.state.speedDialOpen}
                                    direction="left"
                                >
                                    {actions.map(action => (
                                        <SpeedDialAction
                                            key={action.name}
                                            icon={action.icon}
                                            tooltipTitle={action.name}
                                            onClick={this.handleClick.bind(this, action.name)}
                                        />
                                    ))}

                                </SpeedDial>
                            </div>
                        </Toolbar>
                        <Table style={{minWidth: '700px'}}>
                            <TableHead>
                                <TableRow style={{textAlign: "center"}}>
                                    <TableCell>Serial No.</TableCell>
                                    <TableCell>Name of Students</TableCell>
                                    <TableCell align="left">Father's Name</TableCell>
                                    <TableCell align="left">CNIC No.</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">Phone No.</TableCell>
                                    <TableCell align="left">Date of Birth</TableCell>
                                    <TableCell align="left">Current Class</TableCell>
                                    <TableCell align="left">Admitted in Class</TableCell>
                                    <TableCell align="left">Admitted Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.foundStudent.map((student, ind) => {
                                    return (
                                        <StyledTableRow key={ind} style={{cursor: 'pointer', textAlign: "center"}}>
                                            <StyledTableCell>
                                                {ind + 1}
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {student.name}
                                            </StyledTableCell>
                                            <Tooltip title={student.fatherName}>
                                                <StyledTableCell align="left"
                                                                 onClick={this.studentDetail.bind(this, student)}>
                                                    <TruncatePipe value={student.fatherName}/>
                                                </StyledTableCell>
                                            </Tooltip>
                                            <StyledTableCell align="left"
                                                             onClick={this.studentDetail.bind(this, student)}>
                                                {student.cnic ? student.cnic : "-"}</StyledTableCell>
                                            <Tooltip title={student.address}>
                                                <StyledTableCell align="left"
                                                                 onClick={this.studentDetail.bind(this, student)}>
                                                    <TruncatePipe value={student.address}/>
                                                </StyledTableCell>
                                            </Tooltip>
                                            <StyledTableCell align="left"
                                                             onClick={this.studentDetail.bind(this, student)}>
                                                {student.phone ? student.phone : "-"}</StyledTableCell>
                                            <StyledTableCell align="left"
                                                             onClick={this.studentDetail.bind(this, student)}>
                                                {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : "-"}</StyledTableCell>
                                            <StyledTableCell align="left"
                                                             onClick={this.studentDetail.bind(this, student)}
                                            >{student.currentClass}</StyledTableCell>
                                            <StyledTableCell align="left"
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

                <Dialog fullWidth
                        open={this.state.open}
                        onClose={this.dialogClose.bind(this)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogContent style={{textAlign: "center" , paddingTop: "30px"}}>
                       <CircularProgress color="primary"/>
                        <Typography>Processing...</Typography>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default Find;



