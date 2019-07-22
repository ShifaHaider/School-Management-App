import React, {Component} from 'react';
import firebase from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            a: 300
        }
    }

    handleChange(p, e) {
        this.setState({[p]: e.target.value})
    }

    loginAccount() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                console.log(data);
                localStorage.setItem("adminID", data.user.uid);
                this.props.history.push('/main');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }


    render() {
        var screenWidth = document.body.scrollWidth / 2;
        var card = document.getElementsByClassName('card');
        console.log(card[0]);
        console.log(card);
        // a.style.marginLeft = screenWidth;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={{minHeight: '90px'}}><Typography color="inherit" style={{fontSize: '25px'}}>LOGIN</Typography></Toolbar>
                </AppBar>
                <Card className='card'
                      style={{width: '416px', textAlign: 'center', height: '350px', marginTop: '100px'}}>
                    <div style={{paddingTop: '40px'}}>
                        <CardContent>
                            <Typography>
                                <TextField
                                    id="outlined-name"
                                    label="Email"
                                    value={this.state.email}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange.bind(this, 'email')}
                                />
                            </Typography>
                            <Typography>
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    value={this.state.password}
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange.bind(this, 'password')}
                                />
                            </Typography>
                        </CardContent>
                        <Button variant="contained" color="primary" size='large'
                                onClick={this.loginAccount.bind(this)}>Login</Button>
                    </div>
                </Card>
                {/*<input type="text" placeholder='Email' onChange={this.handleChange.bind(this, 'email')}*/}
                {/*       value={this.state.email}/><br/>*/}
                {/*<input type="password" placeholder='Password' onChange={this.handleChange.bind(this, 'password')}*/}
                {/*       value={this.state.password}/><br/>*/}
                {/*<button onClick={this.loginAccount.bind(this)}>Login</button>*/}

            </div>
        )
    }
}

export default Login;
