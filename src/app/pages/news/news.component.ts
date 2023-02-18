import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DateTime } from 'luxon';
import * as _ from '../../utilities/globals';
import Swal from 'sweetalert2';

import { NewsService } from '@services/news.service';
import { NewsModalComponent } from './news-modal/news-modal.component';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
    bsModalRef?: BsModalRef;

    loading: boolean = false;
    articles: any = [];
    filters: any = {};
    url: String = _.BASE_URL;

    pagination: any = {
        page: 1,
        count: 0,
        tableSize: 5
    };
    tableSizes = [5, 10, 20, 30, 40, 50, 100, 300, 500, 1000];

    constructor(
        private formBuilder: FormBuilder,
        private newsService: NewsService,
        private modalService: BsModalService
    ) { }


    ngOnInit(): void {
        this.filters = {
            keyword: '',
            skip: 0,
            take: this.pagination.tableSize
        };

        this.fetch();
    }

    fetch() {
        this.filters.skip = (this.pagination.page * this.pagination.tableSize) - this.pagination.tableSize;
        this.filters.take = this.pagination.tableSize;

        this.newsService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.articles = data.data;
                    console.log(this.articles);
                    this.articles.forEach(banner => {
                        banner.date_formatted = DateTime.fromISO(banner.date_created).toFormat('LLLL dd, yyyy hh:mm:ss a');
                        let icon = {};
                        let background = {};
                        // banner.slider_document.forEach(slider => {
                        //     if (slider.type == 'icon') {
                        //         icon = slider;
                        //     }
                        //     else if (slider.type == 'background') {
                        //         background = slider;
                        //     }
                        // });

                        // banner['icon'] = icon;
                        // banner['background'] = background;
                    });

                    this.pagination.count = data.total;
                },
                error: (error: any) => {
                    console.log(error);
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

    openModal(article: any) {
        const title = article ? 'Edit ' + article.title : 'Add news & updates';

        const initialState: ModalOptions = {
            class: 'modal-lg',
            initialState: {
                title: title,
                article: article,
            }
        };
        this.bsModalRef = this.modalService.show(NewsModalComponent, initialState);
        this.bsModalRef.content.saveBtnName = 'Save';
        this.bsModalRef.content.closeBtnName = 'Close';

        this.bsModalRef.content.callback.subscribe(res => {
            const data = res.data.data;
            this.fetch();
        });
    }

    onTableDataChange(event: any) {
        this.pagination.page = event;
        this.fetch();
    }

    onTableSizeChange(event: any): void {
        this.pagination.tableSize = event.target.value;
        this.pagination.page = 1;
        this.fetch();
    }

    delete(i: any) {
        const _news = this.articles[i];
        Swal.fire({
            icon: 'question',
            title: 'Are you sure your want to delete ' + _news.title + '?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            confirmButtonColor: '#dc3545',
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.newsService
                    .delete(_news)
                    .subscribe({
                        next: (data: any) => {
                            Swal.fire(_news.title + ' has been successfully deleted!', '', 'success');
                            this.articles.splice(i, 1);
                        },
                        error: (error: any) => {
                            console.log(error);
                            setTimeout(() => { this.loading = false; }, 500);
                        },
                        complete: () => {
                            console.log('Complete');
                            setTimeout(() => { this.loading = false; }, 500);
                        }
                    });
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

}
