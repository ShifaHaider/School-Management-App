import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from '@material-ui/core/IconButton';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
// import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Button from "@material-ui/core/Button";
import Logo from "../../../Logo/vBgXFc.png"



class ToolBarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false
        };
    }


    handleOpen() {
        this.setState({openMenu: true});
    }
    findStudent(){
        // this.props.history.push('/main/find');

    }
    addStudent(){
        // this.props.history.push('/main/add-student');
    }
    logout(){
        localStorage.clear();
        window.location.reload();
    }
    render() {
        return (
            <div style={{ flexGrow: 1, position: 'fixed' , top: 0, zIndex: 100, width: "100%"}}>
                <AppBar position="static" style={{backgroundColor: "#E8E8E8" , color: "#00897b" }}>
                    <Toolbar >
                        <img src={Logo} alt="" height='55px' width='75px'/>
                        <div style={{position: "absolute", right: "30px"}}>
                            <Button size="large" color="primary"> <Link to='/main/find' style={{color: "#00897b"}}>Find Students</Link></Button>
                            <Button size="large" color="primary"><Link to='/main/add-student' style={{color: "#00897b"}}>Add Students</Link></Button>
                            <Button size="large" color="primary" onClick={this.logout.bind(this)}><Link to='/login' style={{color: "#00897b"}}>Log Out</Link></Button>
                        </div>
                        {/*<PopupState variant="popover" popupId="demo-popup-menu">*/}
                        {/*    {popupState => (*/}
                        {/*        <React.Fragment>*/}
                        {/*            <IconButton aria-label="delete" color="inherit" {...bindTrigger(popupState)} style={{float: "right"}}>*/}
                        {/*                <MoreIcon />*/}
                        {/*            </IconButton>*/}
                        {/*            <Menu {...bindMenu(popupState)}>*/}
                        {/*                <MenuItem onClick={this.findStudent.bind(this)}><Link to='/main/find'>Find Students</Link></MenuItem>*/}
                        {/*                <MenuItem onClick={this.addStudent.bind(this)}><Link to='/main/add-student'>Add Student</Link></MenuItem>*/}
                        {/*                <MenuItem onClick={this.logout.bind(this)}><Link to='/login'>Log Out</Link></MenuItem>*/}
                        {/*            </Menu>*/}
                        {/*        </React.Fragment>*/}
                        {/*    )}*/}
                        {/*</PopupState>*/}
                    </Toolbar>
                </AppBar>

            </div>
        )
    }
}

export default ToolBarComponent;



