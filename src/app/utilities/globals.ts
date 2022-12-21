import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import moment from 'moment';
//
// ===== File globals.ts
//
'use strict';

export const PRODUCTION: boolean = environment.production;
export const BASE_URL: string = `${environment.api}`;
export const SEP = '/';
export const VERSION: string = "1.0";
export let PAGINATION: any = {
    skip: 0,
    take: 10
}

export function numbersOnly(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
}

export const YEARS = () => {
    const years = [];
    const dateStart = moment();
    const dateEnd = moment().subtract(100, 'y');

    while (dateEnd.diff(dateStart, 'years') != 0) {
        years.push(dateStart.format('YYYY'));
        dateStart.subtract(1, 'year');
    }
    return years;
}

export const MONTHS = () => {
    const months = [];
    const dateStart = moment();
    const dateEnd = moment().add(12, 'month');

    while (dateEnd.diff(dateStart, 'months') > 0) {
        months.push(("0" + dateStart.format('M')).slice(-2));
        dateStart.add(1, 'month');
    }
    return months;
}

export const DAYS = (year: any, month: any) => {
    const days = [];
    month = month ? month : '01';
    year = year ? year : moment().format('YYYY');
    console.log(year, month);
    const dateStart = moment(year + '-' + month, 'YYYY-MM');
    const dateEnd = moment(year + '-' + month, 'YYYY-MM').add(dateStart.daysInMonth(), 'days');
    while (dateEnd.diff(dateStart, 'days') > 0) {
        days.push(("0" + dateStart.format('D')).slice(-2));
        dateStart.add(1, 'days');
    }
    return days;
}














export let schedule: any = {};

export let routes: any = [
    { path: '/dashboard', title: 'SIDEBAR.DASHBOARD', icon: 'fa fa-home text-info', class: '' },
    { path: '/scholars', title: 'SIDEBAR.SCHOLARS', icon: 'fa fa-users text-info', class: '' },
    { path: '/settings', title: 'Settings', icon: 'ni ni-ui-04  text-info', class: '' },
    // { path: '/timesheet', title: 'SIDEBAR.TIMESHEET',  icon: 'fa fa-calendar-alt text-info', class: '' },
    // { path: '/leaves', title: 'SIDEBAR.LEAVES',  icon: 'ni-calendar-grid-58 text-info', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/profile', title: 'SIDEBAR.PROFILE',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

export let admin_routes: any = [
    { path: '/employees', title: 'Employees', icon: 'ni ni-spaceship', class: '' },
    { path: '/timelogs', title: 'SIDEBAR.TIMELOGS', icon: 'ni ni-palette', class: '' },
    { path: '/settings', title: 'Settings', icon: 'ni ni-ui-04', class: '' }
];

export let languages: any = [
    { name: 'English (US)', code: 'en_us', icon: 'en_us.svg' },
    { name: 'English (UK)', code: 'en_gb', icon: 'en_gb.svg' },
    { name: 'Español', code: 'es', icon: 'es.svg' },
    { name: '日本語', code: 'jp', icon: 'jp.svg' },
    { name: '한국어', code: 'kr', icon: 'kr.svg' }
];

export function objectToParams(object: any) {
    let params: any;
    for (var i in object) {
        params = new HttpParams().set(i, object[i]);
    }
    return params;
}

export function errorMessage(message: any) {
    Swal.fire('ERROR', message, 'error');
}

export async function confirmMessage(buttons: any, callback: any) {
    Swal.fire('Hello world!');
    // Swal.fire({
    //     title: buttons.title,
    //     text: buttons.text,
    //     type: 'question',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: buttons.confirm,
    //     cancelButtonText: buttons.cancel,
    // }).then((result) => {
    //     callback(result.value);
    // })
}

export function timeArray(duration: any) {
    let time_arr: any = [];
    let time = moment('00:00', 'HH:mm');
    let end_time = moment('23:30', 'HH:mm');

    time_arr.push({
        value: moment('00:00', 'HH:mm').format('HH:mm')
    });

    while (time.isBefore(end_time, 'minutes')) {
        time.add(duration, 'minutes');
        time_arr.push({
            value: time.format('HH:mm')
        });
    }

    return time_arr;
}

export function stringify(json: Object) {
    return JSON.stringify(json);
}
