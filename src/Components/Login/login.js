import React, {Component} from 'react';
import firebase from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import '../../App.css'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {amber, green} from "@material-ui/core/colors";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const {className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}
MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};
class Login extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            email: '',
            password: '',
            snackbarOpen: false,
            snackbarMessage: "",
            variant: "error"
        }
    }

    handleChange(p, e) {
        this.setState({[p]: e.target.value})
    }

    loginAccount() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                localStorage.setItem("adminID", data.user.uid);
                // this.props.history.push('/main');
                window.location.assign("/main/find");
            })
            .catch((error) => {
                this.setState({ snackbarOpen: true , snackbarMessage: error.message });
                console.log(error.message);

            });
    }
    snackbarClose(){
        this.setState({snackbarOpen: false});
    }

    render() {
        return (
            <div className='App'>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '90px'}}><Typography color="inherit"
                   style={{fontSize: '25px'}}>LOGIN</Typography></Toolbar>
                </AppBar>
                <Container maxWidth="sm">
                <Card className='cardStyle' style={{textAlign: 'center', height: '330px', marginTop: '100px'}}>
                    <CardContent style={{paddingTop: '40px'}}>
                        <TextField style={{width: "335px"}}
                            id="outlined-name"
                            label="Email"
                            value={this.state.email}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange.bind(this, 'email')}
                        />
                        <TextField style={{width: "335px"}}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange.bind(this, 'password')}
                        />
                    </CardContent>
                    <Button variant="contained" color="primary" size='large' style={{width: "240px" , height: "55px"}}
                            onClick={this.loginAccount.bind(this)}>Login</Button>
                </Card>
                </Container>
                <Snackbar style={{bottom: "10px"}}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                          }}
                          open={this.state.snackbarOpen}
                          autoHideDuration={3000}
                          onClose={this.snackbarClose.bind(this)}
                >
                    <MySnackbarContentWrapper
                        onClose={this.snackbarClose.bind(this)}
                        variant={this.state.variant}
                        message={this.state.snackbarMessage}
                    />
                </Snackbar>
            </div>
        )
    }
}

export default Login;
