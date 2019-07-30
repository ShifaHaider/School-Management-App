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
import DialogActions from "@material-ui/core/DialogActions";
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
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
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
        console.log(new Date(props.studentDetail.dateOfBirth).toLocaleDateString().replace(/\//g, '-'));
        this.state = {
            studentDetail: props.studentDetail,
            yearsList: ['', 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
                2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
                2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2000, 2001, 2002, 2003, 2004, 2005,
                2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
                2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043,
                2044, 2045, 2046, 2047, 2048, 2049, 2050],
            classList: ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
            open: false,
            dialogText: "",
            loading: false,
            cnic: "",
            snackbarOpen: false,
            snackbarMessage: "",
            variant: "success"
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({studentDetail: nextProps.studentDetail});
    }

    changeValue(p, e) {
        var studentDetail = this.state.studentDetail;
        if (studentDetail[p] === "admissionDate") {
            this.setState({year: e.target.value.split("/")[0]})
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
        console.log(requiredData);
        for (var d in requiredData) {
            if (requiredData[d] == '') {
                console.log(3234);
                this.setState({ snackbarOpen: true , snackbarMessage: "Some Fields is Required!!" , variant:"error"});
                return;
                break;
            } else {
                this.setState({open: true, loading: true, dialogText: "Saving..."});
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
                this.setState({snackbarOpen: true , snackbarMessage: "Successfully Saved!!" , variant: "success"});
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    handleClose() {
        this.setState({open: false});
    }

    cancelPage() {
        // this.props.history.push('/main/view-student-detail/' + this.state.studentDetail._id);
    }

    render() {
        var dateOfBirth = new Date(this.state.studentDetail.dateOfBirth);
        dateOfBirth = dateOfBirth.getFullYear() + '-' + dateOfBirth.getMonth() + "-" + dateOfBirth.getDay();
        var dob = dateOfBirth.split("-");
        for (var i = 0; i < dob.length; i++) {
            if (dob[i].length < 2) {
                dob.splice(i, 1, "0" + dob[i]);
            }
        }
        dob = dob.join("-");
        var admissionDate = new Date(this.state.studentDetail.admissionDate);
        admissionDate = admissionDate.getFullYear() + '-' + admissionDate.getMonth() + "-" + admissionDate.getDate();
        var adm = admissionDate.split("-");
        for (var d = 0; d < adm.length; d++) {
            if (adm[d].length < 2) {
                adm.splice(d, 1, "0" + adm[d]);
            }
        }
        adm = adm.join("-");

        return (
            <div>
                <Container maxWidth="md">
                    <Card style={{margin: '20px 0 15px 50px'}}>
                        <CardContent>
                            <TextField id="outlined-name" label="Name of Student" fullWidth margin="normal"
                                       variant="outlined"
                                       value={this.state.studentDetail.name}
                                       onChange={this.changeValue.bind(this, 'name')}/>
                            <TextField id="outlined-name" label="Father's Name" fullWidth margin="normal"
                                       variant="outlined"
                                       value={this.state.studentDetail.fatherName}
                                       onChange={this.changeValue.bind(this, 'fatherName')}/><br/><br/>
                            <TextField id="date" variant="outlined" fullWidth label="Date of Birth"
                                       value={dob}
                                       onChange={this.changeValue.bind(this, "dateOfBirth")}
                                       type="date" InputLabelProps={{shrink: true,}}/>
                            <TextField id="outlined-name" label="Address" fullWidth margin="normal" variant="outlined"
                                       value={this.state.studentDetail.address}
                                       onChange={this.changeValue.bind(this, 'address')}/>
                            <InputMask mask="99999-9999999-9"
                                       value={this.state.studentDetail.cnic}
                                       onChange={this.changeValue.bind(this, 'cnic')}>
                                {() => <TextField id="outlined-name" label="CNIC No." fullWidth margin="normal"
                                                  variant="outlined"
                                />}</InputMask>
                            <InputMask mask="99999-9999999-9"
                                       value={this.state.studentDetail.phone}
                                       onChange={this.changeValue.bind(this, 'phone')}>
                                {() => <TextField id="outlined-name" label="Phone No." fullWidth margin="normal"
                                                  variant="outlined"
                                />}</InputMask>
                            <TextField id="outlined-name" label="Last Institution Name" fullWidth margin="normal"
                                       variant="outlined"
                                       value={this.state.studentDetail.lastInstitution}
                                       onChange={this.changeValue.bind(this, 'lastInstitution')}/><br/><br/>
                            <TextField id="date" variant="outlined" fullWidth label="Date of Admitted"
                                       onChange={this.changeValue.bind(this, "admittedInClass")} value={adm}
                                       type="date" InputLabelProps={{shrink: true,}}/><br/><br/>
                            <FormControl variant="filled">
                                <InputLabel htmlFor="filled-age-native-simple">Year</InputLabel>
                                <Select style={{width: '780px', textAlign: 'left'}}
                                        native
                                        value={this.state.studentDetail.year}
                                        onChange={this.changeYear.bind(this)}
                                        input={
                                            <FilledInput name="age" id="filled-age-native-simple"/>}>
                                    {this.state.yearsList.map((val, ind) => {
                                        return (
                                            <option key={ind} value={val}>{val}</option>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <br/><br/>
                            <FormControl variant="filled">
                                <InputLabel htmlFor="filled-age-native-simple">
                                    Admitted in Class
                                </InputLabel>
                                <Select style={{width: '780px', textAlign: 'left'}}
                                        native
                                        value={this.state.studentDetail.admittedInClass}
                                        onChange={this.changeValue.bind(this, 'admittedInClass')}
                                        input={
                                            <FilledInput name="age" id="filled-age-native-simple"/>
                                        }
                                >
                                    {this.state.classList.map((val, ind) => {
                                        return (
                                            <option key={ind} value={val}>{val}</option>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <ImageCropper onCropped={this.getNewImageURL}/>
                            <Button variant="contained" color="primary" size='large'
                                    style={{float: "right", margin: "10px"}}
                                    onClick={this.updateData.bind(this)}>Update Data</Button>
                        </CardContent>
                    </Card>
                </Container>
                <Dialog fullWidth
                        open={this.state.open}
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



