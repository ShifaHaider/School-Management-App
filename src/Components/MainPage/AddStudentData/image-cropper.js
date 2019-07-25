import React, { Component  } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import firebase from 'firebase';


export default class ImageCropper extends Component {
constructor(props){
    super(props);
    this.state = {
        src: null,
        crop: {
            unit: "%",
            width: 30,
            aspect: 16 / 9
        },
        confirm: '',
        imageFile: {},
        fileURL: ''
    };
};


    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);

        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, "newFile.jpeg");
            this.setState({ croppedImageUrl });
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
                blob.name = fileName;
                this.setState({imageFile: blob});

                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                console.log(this.fileUrl);
                this.setState({fileURL: this.fileUrl});
                resolve(this.fileUrl);
            }, "image/jpeg");
    });
    }

    fileUpload(){
        console.log(this.state.fileURL);
        this.props.onCropped(this.state.fileURL);
        // var event = firebase.storage().ref().put(this.state.fileURL);
        // event.getDownloadURL().then((snapshot) => {
        //     console.log(snapshot);
        // });

    }
    render() {
        const { crop, croppedImageUrl, src } = this.state;
        return (
            <div className="App">
                <div>
                    {/*<input type="file" onChange={this.onSelectFile} />*/}
                    <TextField id="outlined-name" margin="normal" variant="outlined"
                          type='file' onChange={this.onSelectFile}/>
                </div>
                { src &&  <ReactCrop
                    src={src}
                    crop={crop}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                /> }
                <br/>
                {croppedImageUrl && (
                    <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                )}
                <br/>
                <Button variant="outlined" onClick={this.fileUpload.bind(this)}>Confirm</Button>
            </div>
        );
    }
}
