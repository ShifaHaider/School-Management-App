import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import ImageCropper from "./image-cropper";
import FilledInput from "@material-ui/core/FilledInput";


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
            admissionDate: '2017-05-24',
            admittedClass: '',
            yearsList: ['' , 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
                2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
                2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2000, 2001, 2002, 2003, 2004, 2005,
                2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
                2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043,
                2044, 2045, 2046, 2047, 2048, 2049 , 2050],
            classList: [ "" , "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],

        }
    }

    changeValue(p , e) {
        this.setState({[p]: e.target.value});
    }
    saveStData(){
        var studentData = {
            studentName: this.state.studentName,
            fatherName: this.state.fatherName,
            dateOfBirth: this.state.dateOfBirth,
            address: this.state.address,
            CNIC: this.state.CNIC,
            phoneNo: this.state.phoneNo,
            lastInstitution: this.state.lastInstitution,
            admittedClass: this.state.admittedClass,
            admissionDate: this.state.admissionDate
        };
        console.log(studentData);

        // const url = 'http://localhost:9000/add-students/add-student';
        // fetch(url, {
        //     method: "post",
        //     body: JSON.stringify(studentData),
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     }
        // }).then((data) => {
        //     data.json().then((a) => {
        //         console.log(a);
        //     });
        // })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '80px'}}><Typography color="inherit"
                                                                     style={{fontSize: '25px'}}>Add Students Data</Typography></Toolbar>
                </AppBar>
                <Card style={{width:'715px' , margin: '20px 0 0 40px'}}>
                    <CardContent>
                        <TextField id="outlined-name" label="Name of Student" fullWidth margin="normal" variant="outlined"
                                   value={this.state.studentName} onChange={this.changeValue.bind(this, 'studentName')}/>
                                   <TextField id="outlined-name" label="Father's Name" fullWidth margin="normal" variant="outlined"
                                   value={this.state.fatherName} onChange={this.changeValue.bind(this, 'fatherName')}/><br/><br/>
                        <TextField id="date" variant="outlined" fullWidth label="Date of Birth" value={this.state.dateOfBirth}
                                   onChange={this.changeValue.bind(this,"dateOfBirth")}
                                   type="date" defaultValue="2017-05-24" InputLabelProps={{shrink: true,}}/>
                        <TextField id="outlined-name" label="Address" fullWidth margin="normal" variant="outlined"
                                   value={this.state.address} onChange={this.changeValue.bind(this, 'address')}/>
                        <TextField id="outlined-name" label="CNIC No." fullWidth margin="normal" variant="outlined" type="number"
                                   value={this.state.CNIC} onChange={this.changeValue.bind(this, 'CNIC')}/>
                                   <TextField id="outlined-name" label="Phone No." fullWidth margin="normal" variant="outlined" type="number"
                                   value={this.state.phoneNo} onChange={this.changeValue.bind(this, 'phoneNo')}/>
                        <TextField id="outlined-name" label="Last Institution Name" fullWidth margin="normal" variant="outlined"
                                   value={this.state.lastInstitution} onChange={this.changeValue.bind(this, 'lastInstitution')}/><br/><br/>
                        <TextField id="date" variant="outlined" fullWidth label="Date of Admitted"
                                   onChange={this.changeValue.bind(this,"admissionDate")}
                                   type="date" defaultValue="2017-05-24" InputLabelProps={{shrink: true,}}/><br/><br/>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">
                               Admitted in Class
                            </InputLabel>
                            <Select style={{width: '600px' , textAlign: 'left'}}
                                    native
                                    value={this.state.admittedClass}
                                    onChange={this.changeValue.bind(this ,'admittedClass')}
                                    input={
                                        <OutlinedInput name="age" id="outlined-age-native-simple" />
                                    }
                            >
                                {this.state.classList.map((val , ind)=>{
                                    return(
                                        <option value={ind}>{val}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                      <ImageCropper/>
                    </CardContent>
                    <Button variant="contained" color="primary" size='large'
                            onClick={this.saveStData.bind(this)}>Add Data</Button><br/><br/>
                </Card>

            </div>
        )
    }


}

export default AddStudents;



