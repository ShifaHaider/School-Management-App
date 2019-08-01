import React, {Component} from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default class ImageCropper extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            src: null,
            crop: {
                unit: "%",
                width: 30,
                aspect: 16 / 16
            },
            confirm: '',
            imageFile: {},
            fileURL: '',
            downloadURL: '',
            showCrop: false,
            onSelect: false,
            loading: false,
            success: false,
            text: '',
            open: true
        };
    };


    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({src: reader.result, onSelect: true})
            );
            reader.readAsDataURL(e.target.files[0]);

        }
    };

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({crop});
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, "newFile.jpeg");
            this.setState({croppedImageUrl});
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = "images";
                this.setState({imageFile: blob});
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                this.setState({fileURL: this.fileUrl});
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }

    fileUpload() {
        this.setState({loading: true, onSelect: false});
        firebase.storage().ref().child(this.state.imageFile.name).put(this.state.imageFile).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log(downloadURL);
                this.props.onCropped(downloadURL);
                this.setState({onSelect: false, loading: false, text: "Saved!!"});
            });
        });
        this.setState({src: null, showCrop: true});

    }

    handleClose(){
        this.setState({open: false})
    }
    render() {
        const {crop, croppedImageUrl, src} = this.state;
        return (
            <div className="App">
                <Dialog fullWidth open={this.state.open}
                        onClose={this.handleClose.bind(this)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogContent style={{textAlign: "center", paddingTop: "30px"}}>
                        <input accept="image/*"
                               style={{display: "none"}} id="outlined-button-file"
                               multiple type="file" onChange={this.onSelectFile}
                        />
                        <label htmlFor="outlined-button-file">
                            <Button variant="outlined" component="span">
                                Upload
                            </Button>
                        </label><br/>
                        {this.state.src &&
                        <ReactCrop style={{height: "200px"}} src={src} crop={crop} onImageLoaded={this.onImageLoaded}
                                   onComplete={this.onCropComplete} onChange={this.onCropChange}
                        />}
                        <br/>
                        {croppedImageUrl && this.state.showCrop ? (
                            <img alt="Crop" style={{maxWidth: "100%"}} src={croppedImageUrl}/>
                        ) : null}
                        <br/>
                        {this.state.onSelect ?
                            <Button color="primary" onClick={this.fileUpload.bind(this)}>Confirm</Button> : null}
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

