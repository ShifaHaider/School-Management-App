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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';


class AddStudents extends Component {
    constructor() {
        super();
        this.state = {
            studentName: '',
            fatherName: '',
            dateOfBirth: '',
            address: '',
            CNIC: '',
            phoneNo: '',
            lastInstitution: '',
            admissionDate: '',
            admittedClass: '',
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
            loading: false
        };
    }

    getStudentImageURL = (url) => {
        console.log(url);
        this.setState({studentImageURL: url});
    };

    changeValue(p, e) {
        console.log(e.target.value);
        if(p === "admissionDate"){
            this.setState({year: e.target.value.split("-")[0]})
        }
        this.setState({[p]: e.target.value});
    }

    saveStData() {
        // this.setState({open: true});
        var dateOfBirth = new Date(this.state.dateOfBirth).getTime();
        var admissionDate = new Date(this.state.admissionDate).getTime();
        var studentData = {
            studentName: this.state.studentName,
            fatherName: this.state.fatherName,
            dateOfBirth: dateOfBirth,
            address: this.state.address,
            CNIC: this.state.CNIC,
            phoneNo: this.state.phoneNo,
            lastInstitution: this.state.lastInstitution,
            admittedClass: this.state.admittedClass,
            admissionDate: admissionDate,
            year: this.state.year,
            studentPhotoURL: this.state.studentImageURL,
        };
        for (var d in studentData) {
            if(studentData[d] == ''){
                this.setState({open: true , dialogText: "field is Required !!"});
                return;
                break;
            }
            else {
                this.setState({open: true , loading: true , dialogText: "Saving..."});
            }
        }

        const url = 'http://localhost:9000/add-students/add-student';
        fetch(url, {
            method: "post",
            body: JSON.stringify(studentData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((studData) => {
                this.setState({studentName: "" , fatherName: "" , dateOfBirth: "" ,address:"",CNIC:"" ,phoneNo:"",
                    lastInstitution:"", admittedClass:"" , admissionDate:"" , year:"" , loading: false, dialogText: "Saved!!"});
            });
        })
            .catch((err) => {
                this.setState({open: true, err});
                console.log(err);
            });
    }

    changeYear(e) {
        this.setState({year: e.target.value});
    }

    handleClose(){
        this.setState({open: false});
    }

    render() {
        return (
            <div>
                <ToolBarComponent title="Add Student"/>
                {/*<InputMask mask="99-99-9999" defaultValue="26-07-2019" />*/}
                <Container maxWidth="md">
                <Card style={{ margin: '20px 0 15px 0'}}>
                    <CardContent>
                        <TextField id="outlined-name" label="Name of Student" fullWidth margin="normal"
                                   variant="outlined"
                                   value={this.state.studentName}
                                   onChange={this.changeValue.bind(this, 'studentName')}/>
                        <TextField id="outlined-name" label="Father's Name" fullWidth margin="normal" variant="outlined"
                                   value={this.state.fatherName}
                                   onChange={this.changeValue.bind(this, 'fatherName')}/><br/><br/>
                        <TextField id="date" variant="outlined" fullWidth label="Date of Birth"
                                   value={this.state.dateOfBirth}
                                   onChange={this.changeValue.bind(this, "dateOfBirth")}
                                   type="date" InputLabelProps={{shrink: true,}}/>
                        <TextField id="outlined-name" label="Address" fullWidth margin="normal" variant="outlined"
                                   value={this.state.address} onChange={this.changeValue.bind(this, 'address')}/>
                        <TextField id="outlined-name" label="CNIC No." fullWidth margin="normal" variant="outlined"
                                   type="number"
                                   value={this.state.CNIC} onChange={this.changeValue.bind(this, 'CNIC')}/>
                        <TextField id="outlined-name" label="Phone No." fullWidth margin="normal" variant="outlined"
                                   type="number"
                                   value={this.state.phoneNo} onChange={this.changeValue.bind(this, 'phoneNo')}/>
                        <TextField id="outlined-name" label="Last Institution Name" fullWidth margin="normal"
                                   variant="outlined"
                                   value={this.state.lastInstitution}
                                   onChange={this.changeValue.bind(this, 'lastInstitution')}/><br/><br/>
                        <TextField id="date" variant="outlined" fullWidth label="Date of Admitted"
                                   value={this.state.admissionDate}
                                   onChange={this.changeValue.bind(this , "admissionDate")}
                                   type="date" InputLabelProps={{shrink: true,}}/><br/><br/>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="filled-age-native-simple" >Year</InputLabel>
                            <Select style={{width: '680px', textAlign: 'left'}}
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
                        <br/><br/>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="filled-age-native-simple">
                                Admitted in Class
                            </InputLabel>
                            <Select style={{width: '680px', textAlign: 'left'}}
                                    native
                                    value={this.state.admittedClass}
                                    onChange={this.changeValue.bind(this, 'admittedClass')}
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
                    <Dialog fullWidth
                            open={this.state.open}
                        onClose={this.handleClose.bind(this)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.loading ? <CircularProgress color="primary" /> :null}
                                <br/>{this.state.dialogText}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </div>
        )
    }


}

export default AddStudents;



