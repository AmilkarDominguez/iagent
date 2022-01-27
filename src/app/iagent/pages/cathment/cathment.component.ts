import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { OfferType, PropertyType } from '../../interfaces/businesses.intefaces';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IagentService } from 'src/app/iagent/services/iagent.service';
import { User } from '../../interfaces/user.interface';
import { Feature } from '../../interfaces/feature.interface';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ConfirmationService } from 'primeng/api';
import { Department } from '../../interfaces/department.interface';

declare var google: any;
export enum PageNames {
  PropetyTypePage,
  OfferTypePage,
  TitlePage,
  PhotosPage,
  AddressPage,
  MapPage,
  PricePage,
  DataPage,
  FeaturesPage,
}

@Component({
  selector: 'app-cathment',
  templateUrl: './cathment.component.html',
  styleUrls: ['./cathment.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class CathmentComponent implements OnInit {

  PageNames = PageNames;
  pageActive: PageNames = PageNames.PropetyTypePage;
  baseUrl: string = environment.baseUrl;
  visibleSidebar: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private iagentService: IagentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  _property_type!: string;
  _offer_type!: string;
  _lat!: number;
  _lng!: number;
  _title!: string;
  _description!: string;
  _address!: string;
  _property_location!: string;
  _countryId!: number;
  _price!: number;
  _currency_type!: string;
  _no_bedrooms!: number;
  _no_bathrooms!: number;
  _total_surface!: number;
  _length_unit!: string;
  _files: any[] = [];


  propetyForm: FormGroup = this.fb.group({
    title: ['Título', [Validators.required]],
    description: ['Descripción', [Validators.required]],
    address: ['Dirección', [Validators.required]],
    property_location: ['Ubicación', [Validators.required]],
    departmentId: ['1', [Validators.required]],
    countryId: ['1', [Validators.required]],
    price: ['1', [Validators.required]],
    currency_type: ['BOB', [Validators.required]],
    no_bedrooms: ['0', [Validators.required]],
    no_bathrooms: ['0', [Validators.required]],
    total_surface: ['1', [Validators.required]],
    constructed_surface: ['1', [Validators.required]],
    length_unit: ['M2', [Validators.required]]
  });
  fiedlIsValid(field: string) {
    return this.propetyForm.controls[field].errors
      && this.propetyForm.controls[field].touched;
  }
  user!: User;
  features: Feature[] = [];
  departments: Department[] = [];
  ngOnInit(): void {
    this.getUser();
    this.loadMaps(-17.7769174, -63.1965487);
    this.getFeateures();
    this.getDepartments();
  }
  getUser() {
    this.iagentService.getUser()
      .subscribe(resp => this.user = resp);
  }
  getFeateures() {
    this.iagentService.getFeatures()
      .subscribe(resp => this.features = resp);
  }
  getDepartments() {
    this.iagentService.getDepartments()
      .subscribe(resp => this.departments = resp);
  }

  photosUploader(event: any) {
    this._files = event.files;
  }
  onSelectPhotos(event: any) {
    this._files = event.currentFiles;
  }


  plusBedrooms() {
    if (this.propetyForm.value.no_bedrooms < 25)
      ++this.propetyForm.value.no_bedrooms;
  }
  minusBedrooms() {
    if (this.propetyForm.value.no_bedrooms > 0)
      --this.propetyForm.value.no_bedrooms;
  }
  plusBathrooms() {
    if (this.propetyForm.value.no_bathrooms < 25)
      ++this.propetyForm.value.no_bathrooms;
  }
  minusBathrooms() {
    if (this.propetyForm.value.no_bathrooms > 0)
      --this.propetyForm.value.no_bathrooms;
  }

  /*Google maps functions and vars*/

  optionsMap: any;
  overlaysMap: any[] = [];

  optionsMapPreview: any;
  overlaysMapPreview: any[] = [];
  loadMaps(_lat: number, _lng: number) {

    this.optionsMap = {
      center: { lat: _lat, lng: _lng },
      zoom: 12
    };
    this.optionsMapPreview = {
      center: { lat: _lat, lng: _lng },
      zoom: 12
    };
    this.addMarker(_lat, _lng);
  }

  addMarker(_lat: any, _lng: any) {
    const svgMarker = {
      path: "M17.7,4.4C16.2,2.9,14.1,2,12,2S7.8,2.9,6.3,4.4S3.9,8,3.9,10.2C3.9,16.5,12,22,12,22s8.1-5.4,8.1-11.8 C20.1,8,19.2,5.9,17.7,4.4z M14.4,12.9C14.4,13,14.3,13,14.4,12.9C14.3,13,14.2,13,14.1,13h-1.4c0,0-0.1,0-0.1,0 c0,0-0.1-0.1-0.1-0.1v-1.2c0-0.1-0.1-0.2-0.2-0.2h-0.7c-0.1,0-0.2,0.1-0.2,0.2v1.2c0,0,0,0.1-0.1,0.1c0,0-0.1,0-0.1,0H9.9 c0,0,0,0-0.1,0c0-0.1,0-0.1,0-0.1v-2.4c0,0,0,0,0-0.1s0,0,0-0.1l2.1-2c0,0,0,0,0.1,0s0,0,0.1,0s0,0,0.1,0s0,0,0.1,0l0.9,0.9V8.8 c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1,0h0.3c0,0,0.1,0,0.1,0c0,0,0.1,0.1,0.1,0.1v1.1l0.5,0.5c0,0,0,0,0,0.1s0,0,0,0.1V12.9L14.4,12.9z",
      fillColor: "#FF666C",
      fillOpacity: 0.9,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
    };

    this.overlaysMap = [
      new google.maps.Marker({ position: { lat: _lat, lng: _lng }, title: "Ubicación", icon: svgMarker, }),
    ];

    this.overlaysMapPreview = [
      new google.maps.Marker({ position: { lat: _lat, lng: _lng }, title: "Ubicación", icon: svgMarker, }),
    ];
    this._lat = _lat;
    this._lng = _lng;
  }
  handleMapClick(event: any) {
    //event: MouseEvent of Google Maps api
    this.addMarker(event.latLng.lat(), event.latLng.lng());
  }

  getCurrentGPS(map: any, gmapPreview: any): void {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        console.log("position.coords.latitude : ", position.coords.latitude)
        console.log("position.coords.longitude : ", position.coords.longitude)

        this._lat = position.coords.latitude;
        this._lng = position.coords.longitude;

        console.log(this._lat);
        console.log(this._lng);


        this.loadMaps(this._lat, this._lng);

        /** Este funciona */
        map.setCenter(new google.maps.LatLng(this._lat, this._lng));
        gmapPreview.setCenter(new google.maps.LatLng(this._lat, this._lng));
      })
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

  }

  /*End Google maps functions and vars*/

  progressBarValue: number = 5;

  departmentCardStyle = '';
  houseCardStyle = '';
  officeCardStyle = '';
  terraintCardStyle = '';
  barnCardStyle = '';
  comercialCardStyle = '';
  buildCardStyle = '';

  rentCardStyle = '';
  saleCardStyle = '';
  antiqueCardStyle = '';


  //TERRENO, GALPON, LOCAL_COMERCIAL, EDIFICIO

  selectCardPropety(propertyTypeSelect: number) {

    this.progressBarValue = 10;
    this.btnNextPropetyTypePage = false;
    if (propertyTypeSelect == PropertyType.DEPARTAMENTO) {
      this._property_type = 'DEPARTAMENTO';
      this.departmentCardStyle = 'card-selected';
      this.houseCardStyle = '';
      this.officeCardStyle = '';
      this.terraintCardStyle = '';
      this.barnCardStyle = '';
      this.comercialCardStyle = '';
      this.buildCardStyle = '';
    }
    if (propertyTypeSelect == PropertyType.CASA) {
      this._property_type = 'CASA';
      this.departmentCardStyle = '';
      this.houseCardStyle = 'card-selected';
      this.officeCardStyle = '';
      this.terraintCardStyle = '';
      this.barnCardStyle = '';
      this.comercialCardStyle = '';
      this.buildCardStyle = '';
    }
    if (propertyTypeSelect == PropertyType.OFICINA) {
      this._property_type = 'OFICINA';
      this.departmentCardStyle = '';
      this.houseCardStyle = '';
      this.officeCardStyle = 'card-selected';
      this.terraintCardStyle = '';
      this.barnCardStyle = '';
      this.comercialCardStyle = '';
      this.buildCardStyle = '';
    }
    if (propertyTypeSelect == PropertyType.TERRENO) {
      this._property_type = 'TERRENO';
      this.departmentCardStyle = '';
      this.houseCardStyle = '';
      this.officeCardStyle = '';
      this.terraintCardStyle = 'card-selected';
      this.barnCardStyle = '';
      this.comercialCardStyle = '';
      this.buildCardStyle = '';
    }
    if (propertyTypeSelect == PropertyType.GALPON) {
      this._property_type = 'GALPON';
      this.departmentCardStyle = '';
      this.houseCardStyle = '';
      this.officeCardStyle = '';
      this.terraintCardStyle = '';
      this.barnCardStyle = 'card-selected';
      this.comercialCardStyle = '';
      this.buildCardStyle = '';
    }
    if (propertyTypeSelect == PropertyType.LOCAL_COMERCIAL) {
      this._property_type = 'LOCAL_COMERCIAL';
      this.departmentCardStyle = '';
      this.houseCardStyle = '';
      this.officeCardStyle = '';
      this.terraintCardStyle = '';
      this.barnCardStyle = '';
      this.comercialCardStyle = 'card-selected';
      this.buildCardStyle = '';
    }
    if (propertyTypeSelect == PropertyType.EDIFICIO) {
      this._property_type = 'EDIFICIO';
      this.departmentCardStyle = '';
      this.houseCardStyle = '';
      this.officeCardStyle = '';
      this.terraintCardStyle = '';
      this.barnCardStyle = '';
      this.comercialCardStyle = '';
      this.buildCardStyle = 'card-selected';
    }
  }

  selectCardOffer(offerTypeSelect: OfferType) {
    this.progressBarValue = 20;
    this.btnNextOfferTypePage = false;
    if (offerTypeSelect == OfferType.ALQUILER) {
      this._offer_type = 'ALQUILER';
      this.rentCardStyle = 'card-selected';
      this.saleCardStyle = '';
      this.antiqueCardStyle = '';
    }
    if (offerTypeSelect == OfferType.VENTA) {
      this._offer_type = 'VENTA';
      this.rentCardStyle = '';
      this.saleCardStyle = 'card-selected';
      this.antiqueCardStyle = '';
    }
    if (offerTypeSelect == OfferType.ANTICRETICO) {
      this._offer_type = 'ANTICRETICO';
      this.rentCardStyle = '';
      this.saleCardStyle = '';
      this.antiqueCardStyle = 'card-selected';
    }
  }


  checkedToggleButton: boolean = true;

  btnNextPropetyTypePage: boolean = true;

  displayModal: boolean = false;

  id!: number;
  showModalDialog() {
    //this.displayModal = true;

    this.confirmationService.confirm({
      // message: 'Are you sure that you want to proceed?',
      // header: 'Confirmation',
      // icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.messageService = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        //this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: 'You have accepted' });
      },
      reject: () => {
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        //this.messageService.add({ severity: 'info', summary: 'Bienvenido', detail: 'You have accepted' });
      }
    });
  }
  goLeadsPage() {
    this.router.navigateByUrl(`matches/${this.id}`);
  }

  nextPropetyTypePage() {
    this.pageActive = 1;
  }
  btnNextOfferTypePage: boolean = true;
  backOfferPage() {
    this.progressBarValue = 10;
    this.pageActive = 0;
  }
  nextOfferPage() {

    this.progressBarValue = 20;
    this.pageActive = 2;
  }
  backTitlePage() {
    this.progressBarValue = 10;
    this.pageActive = 1;
  }
  nextTitlePage() {

    this.progressBarValue = 30;
    this.pageActive = 3;
  }
  backPhotosPage() {
    this.progressBarValue = 20;
    this.pageActive = 2;
  }
  nextPhotosPage() {

    this.progressBarValue = 40;
    this.pageActive = 4;
  }
  backAddressPage() {
    this.progressBarValue = 30;
    this.pageActive = 3;
  }
  nextAddressPage() {

    this.progressBarValue = 50;
    this.pageActive = 5;
  }
  backMapPage() {
    this.progressBarValue = 40;
    this.pageActive = 4;
  }
  nextMapPage() {

    this.progressBarValue = 60;
    this.pageActive = 6;
  }
  backPricePage() {
    this.progressBarValue = 50;
    this.pageActive = 5;
  }
  nextPricePage() {

    this.progressBarValue = 70;
    this.pageActive = 7;
  }
  backDataPage() {
    this.progressBarValue = 60;
    this.pageActive = 6;
  }
  nextDataPage() {

    this.progressBarValue = 80;
    this.pageActive = 8;
  }
  backFeaturesPage() {

    this.progressBarValue = 70;
    this.pageActive = 7;
  }

  publish() {
    this.progressBarValue = 90;
    this.register();
  }

  /** Funcion para disminuir una característica multiple */
  minusFeature(featureSelected: Feature) {
    if (!featureSelected.quantity) {
      //console.log('es NaN');
      featureSelected.quantity = 0;
      featureSelected.isSelected = true;
    } else {
      if (featureSelected.quantity >= 0) {
        featureSelected.quantity--;
      }
    }
    if (featureSelected.quantity === 0) {
      featureSelected.isSelected = false;
    }

    console.log(featureSelected);
  }

  /** Funcion para incrementar una característica multiple */
  plusFeature(featureSelected: Feature) {

    if (!featureSelected.quantity) {
      //console.log('es NaN');
      featureSelected.quantity = 1;
      featureSelected.isSelected = true;
    } else {
      featureSelected.quantity++;
    }
    //console.log(featureSelected);
  }

  /** Funcion para agregar una característica */
  selectFeature(featureSelected: Feature, quantity: number) {
    featureSelected.isSelected = !featureSelected.isSelected;
    featureSelected.quantity = quantity;
    //console.log(featureSelected);
  }

  register() {
    let featuresData: any[] = [];
    for (let i = 0; i < this.features.length; i++) {
      if (this.features[i].isSelected) {
        featuresData.push(
          { featureId: this.features[i].id, quantity: this.features[i].quantity }
        )
      }
    }

    //console.log(featuresData);
    this.iagentService.registerProperty(
      // *title
      this.propetyForm.value.title,
      // *description
      this.propetyForm.value.description,
      // *price
      this.propetyForm.value.price,
      // *total_surface
      this.propetyForm.value.total_surface,
      // *constructed_surface
      this.propetyForm.value.constructed_surface,
      // *length_unit
      this.propetyForm.value.length_unit,
      // *lat
      this._lat,
      // *lon
      this._lng,
      // *offer_type
      this._offer_type,
      // *currency_type
      this.propetyForm.value.currency_type,
      // *property_type
      this._property_type,
      // *no_bathrooms
      this.propetyForm.value.no_bathrooms,
      // *no_bedrooms
      this.propetyForm.value.no_bedrooms,
      // *address
      this.propetyForm.value.address,
      // *property_location
      this.propetyForm.value.property_location,
      // *countryId
      this.propetyForm.value.countryId,
      // *departmentId
      this.propetyForm.value.departmentId,
      // *features
      featuresData,
      // *files
      <File[]>this._files,
      // *publication_type
      'CAPTACION'
    )
      .subscribe(resp => {
        console.log(resp);
        if (typeof resp.id != "undefined") {
          //console.log('hay id');
          this.messageService.add({ severity: 'success', summary: 'Registro exitoso', detail: 'id : ' + resp.id });
          this.id = resp.id;
          this.showModalDialog();
        } else {
          //console.log('no hay id');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp });
        }

      });
  }
}
