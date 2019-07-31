import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import UpdateStudent from "./update-student"
import ToolBarComponent from "../ToolBarComponent/toolbar-componet";
import Container from "@material-ui/core/Container";
import "../../../App.css"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class StudentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentID: this.props.match.params.id,
            studentDetail: {},
            open: false,

        };
        this.loadDetailStudent();
    }


    loadDetailStudent() {
        const url = 'https://school-management--app.herokuapp.com/students/find-student-detail';
        fetch(url, {
            method: "post",
            body: JSON.stringify({studentID: this.state.studentID}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((a) => {
                this.setState({studentDetail: a});
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    change() {
        this.setState({change: true});
        var dateOfBirth = new Date(this.state.studentDetail.dateOfBirth);
        dateOfBirth = dateOfBirth.getFullYear() + '-' + dateOfBirth.getMonth() + "-" + dateOfBirth.getDay();
        var dob = dateOfBirth.split("-");
        for (var i = 0; i < dob.length; i++) {
            if (dob[i].length < 2) {
                dob.splice(i, 1, "0" + dob[i]);
            }
        }
        dob = dob.join("-");
        var studentDetail = this.state.studentDetail;
        studentDetail.dateOfBirth = dob;
        this.setState({studentDetail: studentDetail});
        var admissionDate = new Date(this.state.studentDetail.admissionDate);
        admissionDate = admissionDate.getFullYear() + '-' + admissionDate.getMonth() + "-" + admissionDate.getDate();
        var adm = admissionDate.split("-");
        for (var d = 0; d < adm.length; d++) {
            if (adm[d].length < 2) {
                adm.splice(d, 1, "0" + adm[d]);
            }
        }
        adm = adm.join("-");
        var studentDetail2 = this.state.studentDetail;
        studentDetail2.admissionDate = adm;
        this.setState({studentDetail: studentDetail2});
    }
pageChange=(condition)=>{
        this.setState({change: condition});
};
    render() {
        console.log(this.state.studentDetail.photoURL);
        return (
            <div style={{marginTop: '120px'}}>
             <ToolBarComponent title="View Student Details"/>
                <Container>
                    {this.state.change ? <UpdateStudent studentDetail={this.state.studentDetail} afterComplete={this.pageChange}/> :
                    <Card style={{margin: "30px auto",width: "50%" }}>
                        <CardContent style={{textAlign: "center"}}>
                            <img alt="student pic" style={{borderRadius: "50%" ,height: "160px"}} src={this.state.studentDetail.photoURL || "https://www.caretechfoundation.org.uk/wp-content/uploads/anonymous-person-221117.jpg"}/>
                            <br/><br/>
                            <Typography variant="h5" component="h2">{this.state.studentDetail.name}</Typography>
                            <List component="nav" aria-label="secondary mailbox folder">
                                <ListItem button>
                                    <ListItemText secondary="F/Name" />
                                    <ListItemText primary={this.state.studentDetail.fatherName} style={{textAlign: "right"}}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText secondary="Date of Birth" />
                                    <ListItemText primary={new Date(this.state.studentDetail.dateOfBirth).toLocaleDateString()} style={{textAlign: "right"}}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText secondary="Address" />
                                    <ListItemText primary={this.state.studentDetail.address} style={{textAlign: "right"}}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText secondary="CNIC No." />
                                    <ListItemText primary={this.state.studentDetail.cnic} style={{textAlign: "right"}}/>

                                </ListItem>
                                <ListItem button>
                                    <ListItemText secondary="Phone No." />
                                    <ListItemText primary={this.state.studentDetail.phone} style={{textAlign: "right"}}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText secondary="Last Institution attended" />
                                    <ListItemText primary={this.state.studentDetail.lastInstitution} style={{textAlign: "right"}}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText secondary="Date of Admitted" />
                                    <ListItemText primary={new Date(this.state.studentDetail.admissionDate).toLocaleDateString()} style={{textAlign: "right"}}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText secondary="Admitted in Class" />
                                    <ListItemText primary={this.state.studentDetail.admittedInClass} style={{textAlign: "right"}}/>
                                </ListItem>
                            </List>
                            <Button color="primary" variant="contained" size='large' style={{width: "60%"}}
                                    onClick={this.change.bind(this)}>Edit</Button>
                        </CardContent>

                </Card>}
                </Container>
            </div>
        )
    }
}

export default StudentDetail;



