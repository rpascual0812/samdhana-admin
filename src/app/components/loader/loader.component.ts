import { Component } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
    status: boolean = false

    toggle() {
        this.status = !this.status;
    }
}
