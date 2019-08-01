import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ImageCropper from "../AddStudentData/image-cropper";
import Button from "@material-ui/core/Button";
import FilledInput from '@material-ui/core/FilledInput';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import InputMask from "react-input-mask";
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
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const {className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)}/>
                    {message}
        </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

class UpdateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentDetail: props.studentDetail,
            yearsList: ['', 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
                2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
                2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2000, 2001, 2002, 2003, 2004, 2005,
                2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
                2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043,
                2044, 2045, 2046, 2047, 2048, 2049, 2050],
            classList: ["", "Reception", "Junior", "Senior", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
            open: false,
            dialogText: "",
            loading: false,
            cnic: "",
            snackbarOpen: false,
            snackbarMessage: "",
            variant: "success",
            dob : '',
            adm: "",
            openImageCropper: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({studentDetail: nextProps.studentDetail});
    }

    changeValue(p, e) {
        var studentDetail = this.state.studentDetail;
        if (p === "admissionDate") {
            studentDetail.year = e.target.value.split("-")[0];
            this.setState({studentDetail: studentDetail})
        }
        studentDetail[p] = e.target.value;
        this.setState({studentDetail: studentDetail});
    }

    changeYear(e) {
        var studentDetail = this.state.studentDetail;
        studentDetail.year = e.target.value;
        this.setState({studentDetail: studentDetail});
    }

    getNewImageURL = (url) => {
        var studentDetail = this.state.studentDetail;
        studentDetail.photoURL = url;
        this.setState({studentDetail: studentDetail});
    };

    updateData() {
        var studentDetail = this.state.studentDetail;
        studentDetail.dateOfBirth = new Date(studentDetail.dateOfBirth).getTime();
        studentDetail.admissionDate = new Date(studentDetail.admissionDate).getTime();
        var requiredData = {
            name: this.state.studentDetail.name,
            fatherName: this.state.studentDetail.fatherName,
            year: this.state.year,
            admittedInClass: this.state.studentDetail.admittedInClass,
            admissionDate: this.state.studentDetail.admissionDate,
            address: this.state.studentDetail.address,
        };
        for (var d in requiredData) {
            if (requiredData[d] == '') {
                this.setState({snackbarOpen: true, snackbarMessage: "Some Fields are Required!!", variant: "error"});
                return;
                break;
            } else {
                this.setState({open: true, loading: true, dialogText: "Updating..."});
            }
        }
        const url = 'https://school-management--app.herokuapp.com/students/update-student-profile';
        fetch(url, {
            method: "post",
            body: JSON.stringify({studentID: this.state.studentDetail._id, updatedData: this.state.studentDetail}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((studData) => {
                this.setState({open: false,snackbarOpen: true, snackbarMessage: "Successfully Saved!!", variant: "success"});
                this.props.afterComplete(false)
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    handleClose() {
        this.setState({open: false});
    }

    snackbarClose() {
        this.setState({snackbarOpen: false});
    }

    uploadPhoto(){
        this.setState({openImageCropper: true});
    }
    handleDateChange(p , e){
        var studentDetail = this.state.studentDetail;
        studentDetail[p] = e;
        if (p === "admissionDate") {
            studentDetail.year = e.getFullYear();
            this.setState({studentDetail: studentDetail})
        }
        this.setState({studentDetail: studentDetail});
    }
    render() {
        return (
            <div>
                <Container maxWidth="md">
                    <Card>
                        <CardContent>
                            <div style={{display: "flex" , width: "100%"}}>
                            <TextField id="outlined-name" label="Name of Student"  margin="normal"
                                       // variant="filled"
                                       style={{flex: "1 1"}}
                                value={this.state.studentDetail.name}
                                       onChange={this.changeValue.bind(this, 'name')}/>
                            &nbsp;
                            &nbsp;
                            <TextField id="outlined-name" label="Father's Name"  margin="normal"
                                       // variant="filled"
                                       style={{flex: "1 1"}}
                                value={this.state.studentDetail.fatherName}
                                       onChange={this.changeValue.bind(this, 'fatherName')}/>
                            </div>
                            <div style={{display: "flex" , width: "100%"}}>
                            <TextField id="outlined-name" label="Address"  margin="normal"
                                       // variant="filled"
                                value={this.state.studentDetail.address}
                                       style={{flex: "1 1"}}
                                       onChange={this.changeValue.bind(this, 'address')}/>
                            &nbsp;
                            &nbsp;
                            <InputMask mask="99999-9999999-9"
                                value={this.state.studentDetail.cnic}
                                       onChange={this.changeValue.bind(this, 'cnic')}>
                                {() => <TextField id="outlined-name" label="CNIC No."  margin="normal"
                                                  // variant="filled"
                                                  style={{flex: "1 1"}}
                                />}</InputMask>
                            </div>
                            <div style={{display: "flex" , width: "100%"}}>
                            <InputMask mask="9999-9999999"
                                value={this.state.studentDetail.phone}
                                       onChange={this.changeValue.bind(this, 'phone')}>
                                {() => <TextField id="outlined-name" label="Phone No."  margin="normal"
                                                  // variant="filled"
                                                  style={{flex: "1 1"}}
                                />}</InputMask>
                            &nbsp;
                            &nbsp;
                            <TextField id="outlined-name" label="Last Institution Name"  margin="normal"
                                       // variant="filled"
                                       style={{flex: "1 1"}}
                                value={this.state.studentDetail.lastInstitution}
                                       onChange={this.changeValue.bind(this, 'lastInstitution')}/>
                            </div><br/>
                            {/*<div style={{display: "flex" , width: "100%"}}>*/}
                            {/*<TextField id="date"*/}
                            {/*           // variant="filled"*/}
                            {/*           label="Date of Birth" style={{flex: "1 1"}}*/}
                            {/*           value={new Date(this.state.studentDetail.dateOfBirth).toJSON().split("T")[0]}*/}
                            {/*           onChange={this.changeValue.bind(this, "dateOfBirth")}*/}
                            {/*           type="date" InputLabelProps={{shrink: true,}}/>*/}
                            {/*&nbsp;*/}
                            {/*&nbsp;*/}
                            {/*<TextField id="date"*/}
                            {/*           // variant="filled"*/}
                            {/*           label="Date of Admitted"*/}
                            {/*           style={{flex: "1 1"}}*/}
                            {/*           onChange={this.changeValue.bind(this, "admissionDate")}*/}

                            {/*    value={this.state.studentDetail.admissionDate ? new Date(this.state.studentDetail.admissionDate).toJSON().split("T")[0]: new Date()}*/}
                            {/*           type="date" InputLabelProps={{shrink: true,}}/>*/}
                            {/*</div><br/>*/}
                            <div style={{display: "flex" , width: "100%"}}>
                            <FormControl
                                // variant="filled"
                                style={{flex: "1 1"}}>
                                <InputLabel htmlFor="filled-age-simple">Year</InputLabel>
                                <Select style={{textAlign: 'left'}}
                                    value={this.state.studentDetail.year}
                                        onChange={this.changeYear.bind(this)}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}>
                                    {this.state.yearsList.map((val, ind) => {
                                        return (
                                            <MenuItem key={ind} value={val}>{val}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            &nbsp;
                            &nbsp;
                            <FormControl
                                // variant="filled"
                                         style={{flex: "1 1"}}>
                                <InputLabel htmlFor="filled-age-simple">
                                    Admitted in Class
                                </InputLabel>
                                <Select style={{textAlign: 'left'}}
                                    value={this.state.studentDetail.admittedInClass}
                                        onChange={this.changeValue.bind(this, 'admittedInClass')}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                >
                                    {this.state.classList.map((val, ind) => {
                                        return (
                                            <MenuItem key={ind} value={val}>{val}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl></div>
                            <br/>
                            <div style={{display: "flex" , width: "100%"}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <DatePicker value={this.state.studentDetail.dateOfBirth} label='Date of Birth' onChange={this.handleDateChange.bind(this , 'dateOfBirth')} style={{flex: "1 1"}}/>
                                </MuiPickersUtilsProvider>
                                &nbsp;
                                &nbsp;
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <DatePicker value={this.state.studentDetail.admissionDate} label="Date of Admitted" onChange={this.handleDateChange.bind(this , "admissionDate")} style={{flex: "1 1"}}/>
                                </MuiPickersUtilsProvider>
                            </div>
                            <br/>
                            <Button variant="contained" color="primary" size='large'
                                    onClick={this.uploadPhoto.bind(this)}>Upload Photo</Button>
                            {this.state.openImageCropper ?
                                <ImageCropper onCropped={this.getNewImageURL}/>: null}<br/>
                            <Button variant="contained" color="primary" size='large' style={{float: "right"}}
                                    onClick={this.updateData.bind(this)}>Update</Button><br/><br/>
                        </CardContent>
                    </Card>
                </Container>
                <Dialog fullWidth
                        open={this.state.open}
                        onClose={this.handleClose.bind(this)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogContent style={{textAlign: "center" , paddingTop: "30px"}}>
                        {this.state.loading ? <CircularProgress color="primary"/> : null}
                        <Typography>{this.state.dialogText}</Typography>
                    </DialogContent>
                </Dialog>
                <Snackbar style={{bottom: "10px"}}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                          }}
                          open={this.state.snackbarOpen}
                          autoHideDuration={3000}
                          onClose={this.snackbarClose.bind(this)}
                >
                    <MySnackbarContentWrapper
                        onClose={this.snackbarClose.bind(this)}
                        variant={this.state.variant}
                        message={this.state.snackbarMessage}
                    />
                </Snackbar>
            </div>
        )
    }


}

export default UpdateStudent;



