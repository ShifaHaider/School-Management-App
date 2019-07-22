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


class Find extends Component {
    constructor() {
        super();
        this.state = {

        }
    }



    render() {

        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '80px'}}><Typography color="inherit"
                                                                     style={{fontSize: '25px'}}>FIND</Typography></Toolbar>
                </AppBar>

            </div>
        )
    }


}

export default Find;



