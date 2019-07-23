import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ImageCropper from "../AddStudentData/image-cropper";


class Find extends Component {
    constructor() {
        super();
        this.state = {
            yearsList: ['' , 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
                2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
                2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2000, 2001, 2002, 2003, 2004, 2005,
                2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
                2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043,
                2044, 2045, 2046, 2047, 2048, 2049 , 2050],
            classList: [ "" , "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
            year: '',
            class: ''
        }
    }

    categoryChange(p , e){
        this.setState({[p]: e.target.value})
    }

    find(){
        var filters = {
            class: this.state.class,
            year: this.state.year,
        };
        for (var v in filters){
            if (!filters[v]) {
               delete filters[v]
            }
        }
        const url = 'http://localhost:9000/find-students/find-student';
        fetch(url, {
            method: "get",
            body: JSON.stringify(filters),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((studentsData) => {
                console.log(studentsData);
            });
        })
            .catch((err) => {
                console.log(err);
            });

    }

    render() {

        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '80px'}}><Typography color="inherit"
                          style={{fontSize: '25px'}}>FIND</Typography></Toolbar>
                </AppBar>
                <Card style={{width:'500px' , margin: '20px 0 0 40px'}}>
                    <CardContent>
                        <div>
                        <FormControl variant="filled" >
                            <InputLabel htmlFor="filled-age-native-simple">
                                Search by Year
                            </InputLabel>
                            <Select style={{width: '150px'}}
                                native
                                value={this.state.year}
                                onChange={this.categoryChange.bind(this ,'year')}
                                input={
                                    <FilledInput name="age" id="filled-age-native-simple" />
                                }
                            >
                                {this.state.yearsList.map((val , ind)=>{
                                    return(
                                        <option value={val}>{val}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" >
                            <InputLabel htmlFor="filled-age-native-simple">
                                Search by Class
                            </InputLabel>
                            <Select style={{width: '150px'}}
                                native
                                value={this.state.class}
                                onChange={this.categoryChange.bind(this ,'class')}
                                input={
                                    <FilledInput name="age" id="filled-age-native-simple" />
                                }
                            >
                                {this.state.classList.map((val , ind)=>{
                                    return(
                                        <option value={val}>{val}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        </div>
                        <Button variant="contained" color="primary" size='large'
                                onClick={this.find.bind(this)}>Find</Button>
                    </CardContent>

                </Card>


            </div>
        )
    }


}

export default Find;



