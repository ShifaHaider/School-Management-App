import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';


class ToolBarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false
        }
    }


    handleOpen() {
        this.setState({openMenu: true})
    }


    render() {


        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '80px'}}>
                        <Typography>{this.props.title}</Typography>
                        <IconButton edge="end" color="inherit" onClick={this.handleOpen.bind(this)}>
                            <MoreIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>


                <Menu
                    id="simple-menu"
                    keepMounted
                    open={this.state.openMenu}
                >
                    <MenuItem> <Link to="/main/find">Find Student</Link></MenuItem>
                    <MenuItem><Link to="/main/add-student">Add Student</Link></MenuItem>
                </Menu>
            </div>
        )
    }


}

export default ToolBarComponent;



