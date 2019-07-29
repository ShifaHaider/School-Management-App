import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ImageCropper from "./image-cropper";
import FilledInput from '@material-ui/core/FilledInput';
import ToolBarComponent from "../ToolBarComponent/toolbar-componet";
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputMask from 'react-input-mask';
import Typography from "@material-ui/core/Typography";
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import {amber, green} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function MySnackbarContentWrapper(props) {
    // const classes = useStyles1();
    const {className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar">
          <Icon/>
                    {message}
        </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon/>
                </IconButton>,
            ]}
            {...other}
        />
    );
}

class AddStudents extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            fatherName: '',
            dateOfBirth: '',
            address: '',
            cnic: '',
            phone: '',
            lastInstitution: '',
            admissionDate: '',
            admittedInClass: '',
            yearsList: ['', 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
                2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
                2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050],
            classList: ["", "Reception", "Junior", "Senior", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
            year: '',
            selectedDate: '',
            setSelectedDate: '',

            studentImageURL: '',
            open: false,
            dialogText: "",
            loading: false,
            value: '',
            mask: '9999-9999-9999-9999'
        };
    }

    saveStData() {
        // this.setState({open: true});
        var dateOfBirth = new Date(this.state.dateOfBirth).getTime();
        var admissionDate = new Date(this.state.admissionDate).getTime();
        var requiredData = {
            name: this.state.name,
            fatherName: this.state.fatherName,
            year: this.state.year,
            admittedInClass: this.state.admittedInClass,
            admissionDate: admissionDate,
            address: this.state.address,
        };
        var studentData = {
            name: requiredData.name,
            fatherName: requiredData.fatherName,
            dateOfBirth: dateOfBirth,
            address: requiredData.address,
            cnic: this.state.cnic,
            phone: this.state.phone,
            lastInstitution: this.state.lastInstitution,
            admittedInClass: requiredData.admittedInClass,
            admissionDate: admissionDate,
            year: requiredData.year,
            photoURL: this.state.studentImageURL,
        };
        for (var d in requiredData) {
            if (requiredData[d] == '') {
                this.setState({open: true, dialogText: "field is Required !!"});
                return;
                break;
            } else {
                this.setState({dialogText: 'Saving..', open: true,})
            }
        }
        const url = 'https://school-management--app.herokuapp.com/students/add-student';
        fetch(url, {
            method: "post",
            body: JSON.stringify(studentData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((studData) => {
                console.log(studData);
                this.setState({
                    name: "",
                    fatherName: "",
                    dateOfBirth: "",
                    address: "",
                    cnic: "",
                    phone: "",
                    lastInstitution: "",
                    admittedInClass: "",
                    admissionDate: "",
                    year: "",
                    loading: false,
                    dialogText: "Saved!!"
                });
            });
        })
            .catch((err) => {
                this.setState({open: true, err});
                console.log(err);
            });


    }

    getStudentImageURL = (url) => {
        console.log(url);
        this.setState({studentImageURL: url});
    };

    changeValue(p, e) {
        console.log(e.target.value);
        if (p === "admissionDate") {
            this.setState({year: e.target.value.split("-")[0]})
        }
        this.setState({[p]: e.target.value});
    }

    changeYear(e) {
        this.setState({year: e.target.value});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        return (
            <div>
                <ToolBarComponent title="Add Student"/>
                <div style={{marginTop: '120px'}}>
                    <Container maxWidth="md">
                        <Card style={{margin: '20px 0 15px 0'}}>
                            <CardContent>
                                <TextField id="outlined-name" label="Name of Student"  margin="normal" style={{width: "415px"}}
                                           variant="outlined"
                                           value={this.state.name}
                                           onChange={this.changeValue.bind(this, 'name')}/>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <TextField id="outlined-name" label="Father's Name"  margin="normal" style={{width: "415px"}}
                                           variant="outlined"
                                           value={this.state.fatherName}
                                           onChange={this.changeValue.bind(this, 'fatherName')}/><br/>
                                <TextField id="outlined-name" label="Address"  margin="normal" style={{width: "415px"}}
                                           variant="outlined"
                                           value={this.state.address}
                                           onChange={this.changeValue.bind(this, 'address')}/>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <InputMask mask="99999-9999999-9"
                                           value={this.state.cnic} onChange={this.changeValue.bind(this, "cnic")}>
                                    {() => <TextField id="outlined-name" label="CNIC No." style={{width: "415px"}} margin="normal"
                                                      variant="outlined"
                                    />}</InputMask>
                                <InputMask mask="9999-9999999"
                                           value={this.state.phone} onChange={this.changeValue.bind(this, 'phone')}>
                                    {() => <TextField id="outlined-name" label="Phone No."  margin="normal" style={{width: "415px"}}
                                                      variant="outlined"
                                    />}</InputMask>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <TextField id="outlined-name" label="Last Institution Name"  margin="normal"
                                           variant="outlined" style={{width: "415px"}}
                                           value={this.state.lastInstitution}
                                           onChange={this.changeValue.bind(this, 'lastInstitution')}/><br/><br/>
                                <TextField id="date" variant="outlined"  label="Date of Admitted"
                                           value={this.state.admissionDate} style={{width: "415px"}}
                                           onChange={this.changeValue.bind(this, "admissionDate")}
                                           type="date" InputLabelProps={{shrink: true,}}/>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <TextField id="date" variant="outlined"  label="Date of Birth" style={{width: "415px"}}
                                           value={this.state.dateOfBirth}
                                           onChange={this.changeValue.bind(this, "dateOfBirth")}
                                           type="date" InputLabelProps={{shrink: true,}}/><br/><br/>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="filled-age-native-simple">Year</InputLabel>
                                    <Select style={{width: '415px', textAlign: 'left'}}
                                            native
                                            value={this.state.year}
                                            onChange={this.changeYear.bind(this)}
                                            input={
                                                <FilledInput name="age" id="filled-age-native-simple" fullWidth/>}>
                                        {this.state.yearsList.map((val, ind) => {
                                            return (
                                                <option key={ind} value={val}>{val}</option>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <FormControl variant="filled">
                                    <InputLabel htmlFor="filled-age-native-simple">
                                        Admitted in Class
                                    </InputLabel>
                                    <Select style={{width: '415px', textAlign: 'left'}}
                                            native
                                            value={this.state.admittedInClass}
                                            onChange={this.changeValue.bind(this, 'admittedInClass')}
                                            input={
                                                <FilledInput name="age" id="outlined-age-native-simple"/>
                                            }
                                    >
                                        {this.state.classList.map((val, ind) => {
                                            return (
                                                <option key={ind} value={val}>{val}</option>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <ImageCropper onCropped={this.getStudentImageURL}/>
                                <Button variant="contained" color="primary" size='large' style={{float: "right"}}
                                        onClick={this.saveStData.bind(this)}>Save Data</Button><br/><br/>
                            </CardContent>
                        </Card>
                        <Dialog fullWidth open={this.state.open}
                                onClose={this.handleClose.bind(this)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                            <DialogContent>
                                {this.state.loading ? <CircularProgress color="primary"/> : null}
                                <Typography>{this.state.dialogText}</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    // open={open}
                    autoHideDuration={6000}
                >
                    <MySnackbarContentWrapper
                        // onClose={handleClose}
                        variant="success"
                        message="This is a success message!"
                    />
                </Snackbar>
            </div>
        )
    }


}

export default AddStudents;



