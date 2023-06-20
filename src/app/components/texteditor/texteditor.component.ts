import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { DocumentViewerComponent } from '@components/document-viewer/document-viewer.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { filter } from 'rxjs/operators';
import * as _ from '../../utilities/globals';

declare var tinymce: any;

@Component({
    selector: 'app-texteditor',
    templateUrl: './texteditor.component.html',
    styleUrls: ['./texteditor.component.scss'],
})
export class TexteditorComponent implements OnInit, AfterViewInit {
    @Input() conditions: any = {
        showUploader: false
    };

    @Input() content: any = '';
    @Input() height: any = 500;

    tinymceInit: any;
    source: any;
    documentModalRef?: BsModalRef;
    editor: any;

    // options: any = {
    //     height: 500,
    //     automatic_uploads: false,
    //     paste_data_images: true,
    //     selector: '#editor',
    //     plugins: [
    //         'advlist autolink link image lists charmap print preview hr anchor pagebreak',
    //         'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
    //         'table emoticons template paste help '
    //     ],
    //     toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
    //         'bullist numlist outdent indent | link ' + (this.conditions.showUploader ? 'fileuploader' : '') + ' | print preview fullscreen | ' +
    //         'forecolor backcolor emoticons | help',
    //     menu: {
    //         insert: { title: 'Insert', items: 'link fileuploader' }
    //     },
    //     menubar: 'file edit format tools table help',
    //     // menubar: 'file edit view insert format tools table help',

    //     setup: (editor) => {
    //         this.editor = editor;
    //         const buttonAction = () => {
    //             this.openDocuments();
    //             // editor.insertContent('<img src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/11/One-Piece-Character-Guide.jpg?q=50&fit=contain&w=767&h=384&dpr=1.5"/>');
    //         }

    //         editor.ui.registry.addButton('fileuploader', {
    //             icon: 'gallery',
    //             tooltip: "Insert image from documents",
    //             onAction: function () {
    //                 buttonAction();
    //             }
    //         });
    //     }
    // }

    options: any = {};

    constructor(
        private modalService: BsModalService,
    ) { }

    ngOnInit(): void {
        this.options = {
            height: this.height,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                'advcode'
            ],
            toolbar:
                'code undo redo | formatselect | bold italic forecolor backcolor |' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | link ' + (this.conditions.showUploader ? 'fileuploader' : '') + ' | removeformat | fullscreen help',
            setup: (editor) => {
                this.editor = editor;
                const buttonAction = () => {
                    this.openDocuments();
                    // editor.insertContent('<img src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/11/One-Piece-Character-Guide.jpg?q=50&fit=contain&w=767&h=384&dpr=1.5"/>');
                }

                editor.ui.registry.addButton('fileuploader', {
                    icon: 'gallery',
                    tooltip: "Insert image from documents",
                    onAction: function () {
                        buttonAction();
                    }
                });
            }
        };
    }

    ngAfterViewInit(): void {
        tinymce.init(this.options);
    }

    openDocuments() {
        const initialState: ModalOptions = {
            class: 'modal-xl',
            initialState: {
                list: [ // just a sample data passed to modal for future reference
                    'Open a modal with component',
                    'Pass your data',
                    'Do something else',
                    '...'
                ],
            }
        };

        this.documentModalRef = this.modalService.show(DocumentViewerComponent, initialState);

        this.documentModalRef.content.image.subscribe(res => {
            res.data.forEach(doc => {
                this.editor.insertContent('<img src="' + (!_.PRODUCTION ? _.BASE_URL : '') + '/' + doc.path + '/' + doc.filename + '"/>');
            });
        });
    }

    returnMessage() {
        return this.editor.getContent();
    }

    reset() {
        this.editor.setContent('');
    }

}
