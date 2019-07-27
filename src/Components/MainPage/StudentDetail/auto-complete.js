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
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import Container from "@material-ui/core/Container";


class AutoComplete extends Component {
    constructor(props) {
        super(props);
        console.log(new Date(props.studentDetail.dateOfBirth).toLocaleDateString());
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
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({studentDetail: nextProps.studentDetail});
    }

    changeValue(p, e) {
        var studentDetail = this.state.studentDetail;
        if(studentDetail[p] === "admissionDate"){
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
    getNewImageURL =(url)=>{
        var studentDetail = this.state.studentDetail;
        studentDetail.studentPhotoURL = url;
        this.setState({studentDetail: studentDetail});
    };
    updateData() {
        var studentDetail = this.state.studentDetail;
        studentDetail.dateOfBirth = new Date(studentDetail.dateOfBirth).getTime();
        studentDetail.admissionDate = new Date(studentDetail.admissionDate).getTime();
        for (var d in studentDetail) {
            if(studentDetail[d] == ''){
                this.setState({open: true , dialogText: "field is Required !!"});
                return;
                break;
            }
            else {
                // this.setState({open: true , loading: true , dialogText: "Saving..."});
            }
        }
        const url = 'http://localhost:9000/add-students/update-student-profile';
        fetch(url, {
            method: "post",
            body: JSON.stringify({studentID: this.state.studentDetail._id , updatedData: this.state.studentDetail}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((studData) => {
                this.setState({ loading: false, dialogText: "Saved!!"});
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    handleClose(){
        this.setState({open: false});
    }

    render() {
        return (
            <div>
                <Card style={{width: '', margin: '20px 0 15px 50px'}}>
                    <CardContent>
                        <TextField id="outlined-name" label="Name of Student" fullWidth margin="normal"
                                   variant="outlined"
                                   value={this.state.studentDetail.studentName}
                                   onChange={this.changeValue.bind(this, 'studentName')}/>
                        <TextField id="outlined-name" label="Father's Name" fullWidth margin="normal" variant="outlined"
                                   value={this.state.studentDetail.fatherName}
                                   onChange={this.changeValue.bind(this, 'fatherName')}/><br/><br/>
                        <TextField id="date" variant="outlined" fullWidth label="Date of Birth"
                                   // value={new Date(this.state.studentDetail.dateOfBirth).toLocaleDateString()}
                                   value="2010-10-02"
                                   onChange={this.changeValue.bind(this, "dateOfBirth")}
                                   type="date" InputLabelProps={{shrink: true,}}/>
                        <TextField id="outlined-name" label="Address" fullWidth margin="normal" variant="outlined"
                                   value={this.state.studentDetail.address}
                                   onChange={this.changeValue.bind(this, 'address')}/>
                        <TextField id="outlined-name" label="CNIC No." fullWidth margin="normal" variant="outlined"
                                   type="number"
                                   value={this.state.studentDetail.CNIC}
                                   onChange={this.changeValue.bind(this, 'CNIC')}/>
                        <TextField id="outlined-name" label="Phone No." fullWidth margin="normal" variant="outlined"
                                   type="number"
                                   value={this.state.studentDetail.phoneNo}
                                   onChange={this.changeValue.bind(this, 'phoneNo')}/>
                        <TextField id="outlined-name" label="Last Institution Name" fullWidth margin="normal"
                                   variant="outlined"
                                   value={this.state.studentDetail.lastInstitution}
                                   onChange={this.changeValue.bind(this, 'lastInstitution')}/><br/><br/>
                        <TextField id="date" variant="outlined" fullWidth label="Date of Admitted"
                                   onChange={this.changeYear.bind(this)} value={new Date(this.state.studentDetail.dateOfBirth).toLocaleDateString()}
                                   type="date" InputLabelProps={{shrink: true,}}/><br/><br/>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="filled-age-native-simple">Year</InputLabel>
                            <Select style={{width: '680px', textAlign: 'left'}}
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
                            <Select style={{width: '680px', textAlign: 'left'}}
                                    native
                                    value={this.state.studentDetail.admittedClass}
                                    onChange={this.changeValue.bind(this, 'admittedClass')}
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
                        <Button variant="contained" color="primary" size='large' style={{float: "right"}}
                                onClick={this.updateData.bind(this)}>Update Data</Button>
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
                            <br/>
                            {this.state.dialogText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }


}

export default AutoComplete;



