import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AreaService } from '@services/area.service';
import { CityService } from '@services/city.service';
import { GenderService } from '@services/gender.service';
import { ProvinceService } from '@services/province.service';
import { RoleService } from '@services/role.service';
import { UserService } from '@services/user.service';

import { ToastrService } from 'ngx-toastr';

import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as _ from '../../../utilities/globals';

@Component({
    selector: 'app-users-modal',
    templateUrl: './users-modal.component.html',
    styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {
    public callback: EventEmitter<any> = new EventEmitter();
    loading: boolean = false;
    title?: string;
    saveBtnName?: string;
    closeBtnName?: string;
    user: any = {};
    genders: any = [];
    roles: any = [];
    provinces: any = [];
    cities: any = [];
    areas: any = [];
    url: String = _.BASE_URL;
    filters: any = {};
    isProducer: boolean = false;
    profilePicture: String = _.BASE_URL + '/assets/images/user.png';

    submitted: boolean = false;
    form: FormGroup;

    dateConfig: any = { isAnimated: true, containerClass: 'theme-dark-blue', dateInputFormat: 'YYYY/MM/DD' };

    constructor(
        public bsModalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private genderService: GenderService,
        private roleService: RoleService,
        private provinceService: ProvinceService,
        private cityService: CityService,
        private areaService: AreaService,
        private userService: UserService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        // console.log('user', this.user);
        this.filters = {
            search: '',
            skip: 0,
            take: 10
        };

        this.setEmployeeForm();
        this.getGenders();
        this.getRoles();
        this.getProvinces();
    }

    setEmployeeForm() {
        this.profilePicture = this.user ? this.url + '/' + this.user.user_document.document.path : this.profilePicture;
        this.isProducer = this.user ? this.user.is_seller : false;
        this.form = this.formBuilder.group({
            pk: [''],
            first_name: [this.user ? this.user.first_name : '', Validators.required],
            last_name: [this.user ? this.user.last_name : '', Validators.required],
            // middle_name: [this.user ? this.user.middle_name : '', Validators.required],
            mobile: [this.user ? this.user.mobile_number : '', Validators.required],
            email_address: [this.user ? this.user.email_address : '', Validators.required],
            birthdate: [this.user ? this.user.birthdate : '', Validators.required],
            gender: [this.user ? this.user.gender_pk : '', Validators.required],
            province: [this.user.user_address.province.province_code, Validators.required],
            city: [this.user.user_address.city.city_code, Validators.required],
            area: [this.user.user_address.area.pk, Validators.required],
            address_details: [this.user.user_address.address, Validators.required],
        });
    }

    get f() { return this.form.controls; }

    submit() {
        this.loading = true;
        // console.log('submitting');
        this.submitted = true;
        // console.log(this.form.invalid);
        // console.log(this.form.value);
        if (this.form.invalid) {
            return;
        }

        this.form.get('pk').patchValue(this.user.pk);
        this.userService
            .save(this.form.value)
            .subscribe({
                next: (data: any) => {
                    this.callback.emit({ data });
                    this.toastr.success('The user has been successfully updated', 'SUCCESS!');
                },
                error: (error: any) => {
                    console.log(error);
                    this.toastr.error('An error occurred while updating the user. Please try again', 'ERROR!');
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

    getGenders() {
        this.genderService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.genders = data.data;
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

    getRoles() {
        this.roleService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.roles = data.data;
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

    getProvinces() {
        this.provinceService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.provinces = data.data;
                    if (this.user.user_address != null) {
                        this.getCities();
                    }
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

    getCities() {
        this.cityService
            .fetchAll({ province_code: this.form.value.province })
            .subscribe({
                next: (data: any) => {
                    this.cities = data.data;
                    if (this.user.user_address != null) {
                        this.getAreas();
                    }
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

    getAreas() {
        this.areaService
            .fetchAll({ city_code: this.form.value.city })
            .subscribe({
                next: (data: any) => {
                    this.areas = data.data;
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

    provinceChanged() {
        console.log(this.form.value.province, this.form.value);
        // const province = this.provinces.filter(province => province.pk == this.);
        this.getCities();
    }

    cityChanged() {
        console.log(this.form.value.city, this.form.value);
        // const province = this.provinces.filter(province => province.pk == this.);
        this.getAreas();
    }


}
