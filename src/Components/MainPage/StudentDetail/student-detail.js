import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import UpdateStudent from "./update-student"
import ToolBarComponent from "../ToolBarComponent/toolbar-componet";
import Container from "@material-ui/core/Container";
import { height } from 'window-size';
import "../../../App.css"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


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
        this.setState({change: "change"})
    }

    render() {
        console.log(this.state.studentDetail.photoURL);
        return (
            <div >
             <ToolBarComponent title="View Student Details"/>
                {/* <img alt="Student pic" style={{height: "180px", width: "165px"}}
                             src={this.state.studentDetail.photoURL || "https://www.caretechfoundation.org.uk/wp-content/uploads/anonymous-person-221117.jpg"}/> */}
                {/*{this.state.change ?  <UpdateStudent studentDetail={this.state.studentDetail}/>: null}*/}
                <Container maxWidth="md">
                    {this.state.change ? <UpdateStudent studentDetail={this.state.studentDetail}/> :
                    <Card style={{display: "flex" ,margin: "100px auto",}}>
                    <div className="image-container">
                        <img src="https://nannyoptions.ie/2014/wp-content/uploads/2017/10/Why-Babies-and-Children-May-Wake-Up-Early-1-948x640.jpg"
                             className="image"/>
                    </div>
                    <div className="content-container">
                        <p className="h3">{this.state.studentDetail.name}</p>
                        <p className="f-name">S/o {this.state.studentDetail.fatherName} </p>
                        <div className="detail-container">

                            <div className="detail-container-content">
                                <p className="cell_1">Date Of Birth: </p>
                                <p className="cell_2">{new Date(this.state.studentDetail.dateOfBirth).toLocaleDateString()}</p>
                            </div>

                            <div className="detail-container-content">
                                <p className="cell_1">Address: </p>
                                <p className="cell_2">{this.state.studentDetail.address}</p>
                            </div>
                            <div className="detail-container-content">
                                <p className="cell_1">CNIC: </p>
                                <p className="cell_2">{this.state.studentDetail.cnic}</p>
                            </div>
                            <div className="detail-container-content">
                                <p className="cell_1">Phone No: </p>
                                <p className="cell_2">{this.state.studentDetail.phone}</p>
                            </div>


                            <div className="detail-container-content">
                                <p className="cell_1">Last Institution: </p>
                                <p className="cell_2">{this.state.studentDetail.lastInstitution}</p>
                            </div>
                            <div className="detail-container-content">
                                <p className="cell_1">Admitted In Class: </p>
                                <p className="cell_2">{this.state.studentDetail.admittedInClass}</p>
                            </div>

                            <div className="detail-container-content">
                                <p className="cell_1">Admission Date: </p>
                                <p className="cell_2">{new Date(this.state.studentDetail.admissionDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <Button color="primary"  size='large' style={{float:"right" , margin:"10px"}}
                                onClick={this.change.bind(this)}>Edit</Button>
                    </div>

                </Card>}
                </Container>
            </div>
        )
    }
}

export default StudentDetail;



