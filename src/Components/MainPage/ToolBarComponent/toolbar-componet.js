import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Button from '@material-ui/core/Button';



class ToolBarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false
        };

    }


    handleOpen() {
        this.setState({openMenu: true})
    }


    render() {


        return (
            <div style={{ flexGrow: 1,}}>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '80px'}}>
                        <Typography color="inherit" style={{fontSize: '25px' , flexGrow: 1}}>{this.props.title}</Typography>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {popupState => (
                                <React.Fragment>
                                    <IconButton aria-label="delete" color="inherit" {...bindTrigger(popupState)} style={{float: "right"}}>
                                        <MoreIcon />
                                    </IconButton>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}><Link to="/main/find">Find Student</Link></MenuItem>
                                        <MenuItem onClick={popupState.close}><Link to="/main/add-student">Add Student</Link></MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </Toolbar>
                </AppBar>

            </div>
        )
    }
}

export default ToolBarComponent;



