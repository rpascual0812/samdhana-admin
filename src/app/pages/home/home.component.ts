import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    type = 'doughnut';
    data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }
        ]
    };
    options = {
        responsive: true,
        maintainAspectRatio: true
    };
    constructor() { }

    ngOnInit(): void {
    }

}
