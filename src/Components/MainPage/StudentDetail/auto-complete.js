import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ImageCropper from "../AddStudentData/image-cropper";
import Button from "@material-ui/core/Button";


class AutoComplete extends Component {
    constructor(props) {
        super(props);
        console.log(props.studentDetail);
        this.state = {
            studentDetail: props.studentDetail,
            yearsList: ['', 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
                2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
                2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2000, 2001, 2002, 2003, 2004, 2005,
                2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
                2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043,
                2044, 2045, 2046, 2047, 2048, 2049, 2050],
            classList: ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({studentDetail: nextProps.studentDetail});
    }

    changeValue(p, e) {
        console.log(e);
        var studentDetail = this.state.studentDetail;
        studentDetail[p] = e.target.value;
        this.setState({studentDetail: studentDetail});
    }

    changeYear(e) {
        var year = this.state.studentDetail.year;
        year = e.target.value.split("-")[0];
    }

    updateData() {
        console.log(this.state.studentDetail);
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
                console.log(studData);
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        console.log(this.state.studentDetail);
        return (
            <div>
                <Card style={{width: '715px', margin: '20px 0 15px 50px'}}>
                    <CardContent>
                        <TextField id="outlined-name" label="Name of Student" fullWidth margin="normal"
                                   variant="outlined"
                                   value={this.state.studentDetail.studentName}
                                   onChange={this.changeValue.bind(this, 'studentName')}/>
                        <TextField id="outlined-name" label="Father's Name" fullWidth margin="normal" variant="outlined"
                                   value={this.state.studentDetail.fatherName}
                                   onChange={this.changeValue.bind(this, 'fatherName')}/><br/><br/>
                        <TextField id="date" variant="outlined" fullWidth label="Date of Birth"
                                   value={this.state.studentDetail.dateOfBirth}
                                   onChange={this.changeValue.bind(this, "dateOfBirth")}
                                   type="date" defaultValue="24-05-2016" InputLabelProps={{shrink: true,}}/>
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
                                   onChange={this.changeYear.bind(this)} value={this.state.studentDetail.admissionDate}
                                   type="date" defaultValue="20-05-2014" InputLabelProps={{shrink: true,}}/><br/><br/>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">Year</InputLabel>
                            <Select style={{width: '680px', textAlign: 'left'}}
                                    native
                                    value={this.state.studentDetail.year}
                                    onChange={this.changeYear.bind(this)}
                                    input={
                                        <OutlinedInput name="age" id="outlined-age-native-simple"/>}>
                                {this.state.yearsList.map((val, ind) => {
                                    return (
                                        <option key={ind} value={val}>{val}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">
                                Admitted in Class
                            </InputLabel>
                            <Select style={{width: '680px', textAlign: 'left'}}
                                    native
                                    value={this.state.studentDetail.admittedClass}
                                    onChange={this.changeValue.bind(this, 'admittedClass')}
                                    input={
                                        <OutlinedInput name="age" id="outlined-age-native-simple"/>
                                    }
                            >
                                {this.state.classList.map((val, ind) => {
                                    return (
                                        <option key={ind} value={val}>{val}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <ImageCropper/>
                    </CardContent>
                    <Button variant="contained" color="primary" size='large'
                            onClick={this.updateData.bind(this)}>Update Data</Button><br/><br/>
                </Card>


            </div>
        )
    }


}

export default AutoComplete;


