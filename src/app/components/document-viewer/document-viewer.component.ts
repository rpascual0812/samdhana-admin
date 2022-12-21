import { Component, EventEmitter, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { DocumentService } from '@services/document.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { FileUploaderComponent } from '@components/file-uploader/file-uploader.component';
import * as _ from '../../utilities/globals';

@Component({
    selector: 'app-document-viewer',
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
    list: any[] = [];
    public image: EventEmitter<any> = new EventEmitter();
    documents: any = [];
    selected: any = [];
    url: string = (!_.PRODUCTION ? _.BASE_URL : '');
    show: boolean = false;
    pagination: any = _.PAGINATION;

    constructor(
        private cdr: ChangeDetectorRef,
        public documentUploaderRef: BsModalRef,
        public documentViewerRef: BsModalRef,
        private modalService: BsModalService,
        private documentService: DocumentService
    ) { }

    ngOnInit(): void {
        this.show = true;
        setTimeout(() => {
            this.fetch();
        }, 1000);
    }

    fetch() {
        this.documentService.fetchAll(this.pagination)
            .then((data: any) => {
                this.show = false;
                this.documents = data;
                this.cdr.detectChanges();
            })
            .catch((err: any) => {
                this.show = false;
            });
    }

    uploadFiles() {
        const initialState: ModalOptions = {
            class: 'modal-lg'
        };
        this.documentUploaderRef = this.modalService.show(FileUploaderComponent, initialState);

        this.documentUploaderRef.content.document.subscribe(res => {
            this.documents.unshift({
                path: res.file.path,
                filename: res.file.filename,
                selected: false
            });

            this.cdr.detectChanges();
        });
    }

    select() {
        this.image.emit({ data: this.selected, res: 200 });
        this.documentUploaderRef.hide();
    }

    toggleDocument(i: any) {
        this.documents[i].selected = !this.documents[i].selected;
        (this.documents[i].selected) ?
            this.selected.push(this.documents[i])
            :
            this.selected = this.selected.filter((selected: any) => selected.pk != this.documents[i].pk);
    }

}
