import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LoaderComponent } from '@components/loader/loader.component';
import Swal from 'sweetalert2';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
    @ViewChild(LoaderComponent) loader: LoaderComponent;
    public image: EventEmitter<any> = new EventEmitter();

    imageChangedEvent: any = '';
    base64Image: any = '';
    submitted: boolean = false;

    constructor(
        public fileUploaderRef: BsModalRef,
        private userService: UserService
    ) { }

    ngOnInit(): void {
    }

    fileChangeEvent(event: any): void {
        this.loader.toggle();
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.base64Image = event.base64;
    }
    imageLoaded(image: LoadedImage) {
        this.loader.toggle();
    }
    cropperReady() {
        console.log("🚀 ~ file: photo-editor.component.ts ~ line 29 ~ PhotoEditorComponent ~ cropperReady ~ cropperReady", 'cropperReady')
    }
    loadImageFailed() {
        Swal.fire('Failed', 'An error occurred! Please try again.', 'error');
    }

    save() {
        // console.log(this.base64Image);

        var block = this.base64Image.split(";");
        // Get the content type of the image
        var contentType = block[0].split(":")[1];
        // get the real base64 content of the file
        var realData = block[1].split(",")[1];

        // Convert it to a blob to upload
        var blob = this.b64toBlob(realData, contentType, 256);

        // Create a FormData and append the file with "image" as parameter name
        var formData = new FormData();
        formData.append("image", blob);

        // this.userService.uploadPhoto(formData)
        //     .then((data) => {
        //         this.image.emit({ data: data.file, res: 200 });
        //         this.fileUploaderRef.hide();
        //     })
        //     .catch((err) => {
        //         Swal.fire('ERROR', 'An error occurred! Please try again.', 'error');
        //     });

    }

    public b64toBlob(b64Data: any, contentType: any, sliceSize: any) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

}
