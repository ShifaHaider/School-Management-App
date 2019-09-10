import React, { Component } from 'react';
import Camera from 'react-camera';
import firebase from 'firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";


export default class MyCamera extends Component {

    constructor(props) {
        super(props);
        this.state={
            imageSrc: "",
            open: true,
            imageBlob: {},
            text: '',
            onSelect: false,
            loading: false,
            success: false,
        };
        this.takePicture = this.takePicture.bind(this);

    }

    takePicture() {
        console.log(this.camera);
        this.camera.capture()
            .then(blob => {
                var src = URL.createObjectURL(blob);
                this.setState({imageSrc: src , imageBlob: blob , onSelect: true});
                this.img.onload = () => { URL.revokeObjectURL(this.src); }
            })
    }
        handleClose() {
            this.props.afterComplete(false , true);
            this.setState({open: false});
    }
    pictureUpload(){
        var name = "image" + Math.random() * 100;
        this.setState({loading: true, onSelect: false});
        firebase.storage().ref().child(name).put(this.state.imageBlob).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                // console.log(downloadURL);
                this.props.onCropped(downloadURL);
                this.setState({onSelect: false, loading: false, text: "Saved!!"});
            });
        });
    }
    render() {
        return (
            <div>
                <Dialog open={this.state.open}
                        onClose={this.handleClose.bind(this)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogContent style={{paddingTop: "10px" , textAlign:"center" }}>
                        <div style={style.container}>
                        <Camera style={style.captureImage}
                                ref={(cam) => {
                                    this.camera = cam;
                                }}>
                            <div style={style.captureContainer} onClick={this.takePicture}>
                                <div style={style.captureButton}>
                                    <div style={{width: "30px" , height: '30px', backgroundColor: "red", borderRadius: "50%" ,margin: "13px"}}/>
                                </div>
                            </div>
                        </Camera>
                        </div>
                        {/*<Button variant="outlined" component="span" onClick={this.takePicture}>Take photo</Button><br/>*/}
                        {this.state.imageSrc ?
                            <img style={{width: '200px' , height: "200px"}}
                                      src={this.state.imageSrc}
                                      ref={(img) => {
                                          this.img = img;
                                      }}
                            />: null}
                        <br/><br/>
                        {this.state.onSelect ?
                            <Button variant="contained" color="primary"  onClick={this.pictureUpload.bind(this)}>Confirm</Button> : null}
                        <br/>
                        {this.state.loading ?
                            <CircularProgress color="primary"/> : this.state.text}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose.bind(this)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

const style = {
    captureImage: {
        position: 'relative',
        width: '500px',
        height: '400px'
    },
    captureContainer: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        bottom: 0,
        width: '100%'
    },
    captureButton: {
        backgroundColor: '#fff',
        borderRadius: '50%',
        height: 56,
        width: 56,
        color: '#000',
        margin: 20
    },

};
