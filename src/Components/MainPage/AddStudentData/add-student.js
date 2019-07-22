import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


class AddStudents extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            age: null,
            class: '',
            year: null,
            admissionDate: ''
        }
    }

    changeValue(p , e) {
        this.setState({[p]: e.target.value});
    }
    addData(){

    }
    render() {

        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '80px'}}><Typography color="inherit"
                                                                     style={{fontSize: '25px'}}>Add Students Data</Typography></Toolbar>
                </AppBar>
                <Card style={{width:'416px' , margin: '20px 0 0 40px'}}>
                    <CardContent>
                        <TextField id="outlined-name" label="Name" fullWidth margin="normal" variant="outlined"
                                   value={this.state.name} onChange={this.changeValue.bind(this, 'name')}/>
                        <TextField id="outlined-name" label="Age" fullWidth margin="normal" variant="outlined" type='number'
                                   value={this.state.age} onChange={this.changeValue.bind(this, 'age')}/>
                        <TextField id="outlined-name" label="Class" fullWidth margin="normal" variant="outlined"
                                   value={this.state.class} onChange={this.changeValue.bind(this, 'class')}/>
                        <TextField id="outlined-name" label="Year" fullWidth margin="normal" variant="outlined" type='number'
                                   value={this.state.year} onChange={this.changeValue.bind(this, 'year')}/>
                        {/*<TextField id="outlined-name" label="Student Admission Date" fullWidth margin="normal" variant="outlined"*/}
                        {/*           value={this.state.admissionDate} onChange={this.changeValue.bind(this, 'admissionDate')}/>*/}
                        <TextField id="date" variant="outlined" fullWidth label="Student Admission Date"
                                   type="date" defaultValue="2017-05-24" InputLabelProps={{shrink: true,}}/>
                    </CardContent>
                    <Button variant="contained" color="primary" size='large'
                            onClick={this.addData.bind(this)}>Add Data</Button><br/><br/>
                </Card>

            </div>
        )
    }


}

export default AddStudents;



