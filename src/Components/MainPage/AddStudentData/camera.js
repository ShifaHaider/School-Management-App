
import React, {useState } from "react";
import Webcam from "react-webcam";
import firebase from 'firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";

var imageCapture;
function getMediaStream() {
    window.navigator.mediaDevices.getUserMedia({video: true})
        .then((mediaStream) => {
            let mediaStreamTrack = mediaStream.getVideoTracks()[0];
            imageCapture = new ImageCapture(mediaStreamTrack);
        })
}

getMediaStream();

const MyCamera = (props) => {
    // var openDialog = true;
    const [imageSrc, setImageSrc] = useState("");
    const [openDialog, setOpenDialog] = useState(true);
    const [confirm, setConfirm] = useState(false);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        function () {
            setImageSrc(webcamRef.current.getScreenshot());
            setConfirm(true);
        }, [webcamRef]
    );

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    function closeDialog() {
        setOpenDialog(false);
        props.open(false);
    }

    function pictureUpload() {
        setLoading(true);
        setConfirm(false);
        var name = "image" + Math.random() * 100;
        imageCapture.takePhoto()
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                firebase.storage().ref().child(name).put(blob).then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setLoading(false);
                        setText("Saved!!");
                        props.onCropped(downloadURL);
                    });
                });
                window.URL.revokeObjectURL(url);
            })
    }


    return (
        <div>
            <Dialog open={openDialog}
                    onClose={closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                <DialogContent style={{paddingTop: "10px", textAlign: "center"}}>
                    <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={500}
                        videoConstraints={videoConstraints}/>
                    <br/>
                    <Button variant="outlined" component="span" onClick={capture}>Take photo</Button><br/><br/>
                    <img src={imageSrc} alt="" width="200px" height='200px'/>
                    <br/><br/>
                    {confirm ?
                        <Button variant="outlined" color="primary" onClick={pictureUpload}>Confirm</Button> : null}
                    {loading ? <CircularProgress color="primary"/> : text}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MyCamera;
