import React, { Component  } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

export default class ImageCropper extends Component {
    state = {
        src: null,
        crop: {
            unit: "%",
            width: 30,
            aspect: 16 / 9
        }
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
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        // console.log(image, crop, fileName);
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
                console.log(blob);
                this.setState({imageFile: blob});
                if (!blob) {

                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                // console.log(this.fileUrl);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }
    fileUpload(input){
        var file = input.target.files[0];
        console.log(file);
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
                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                )}
                <br/>
                {croppedImageUrl && (
                    <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                )}
                <Button variant="outlined">Confirm</Button>
                {/*<input type="file" onChange={this.fileUpload.bind(this)}/>*/}
            </div>
        );
    }
}
