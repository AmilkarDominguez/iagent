import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Business } from '../../interfaces/businesses.intefaces';

import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';
import { IagentService } from 'src/app/iagent/services/iagent.service';
import { Properties, Property } from '../../interfaces/property.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit, AfterViewInit {

  data: any;
  chartOptions: any;
  properties!: Properties;
  property: Property[] = [];
  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private iagentService: IagentService,
    private activatedRoute: ActivatedRoute,

  ) {
    //this.getPropertiesOfUser();

    //Selected modal options
    this.selectModalOptions = [
      { label: "Captación", value: "captacion" },
      { label: "Requerimiento", value: "requerimiento" }
    ];

    //Data Charts
    this.data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Últimos negocios',
          backgroundColor: '#9D74A6',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
        }
      ]
    };


  }
  ngOnInit() {
    this.getPropertiesOfUser();
    // this.activatedRoute.params.subscribe((params) => {
    //   //this.getPropertiesOfUser();
    // });
  }
  async getPropertiesOfUser() {
    this.iagentService.getPropertiesOfUser()
      .subscribe(resp => {
        console.log(resp);
        this.properties = resp
        this.property = this.properties.items
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      //this.showWelcome()
      //this.getPropertiesOfUser();
      //this.getPropertiesOfUser();
      //this.getPropertiesOfUser();
    })
  }




  selectModalOptions: any[];
  selectedModalOption: string = "captacion";



  showWelcome() {
    this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: this.authService.getEmail()! });
  }

  //Modal
  displayModalPost: boolean = false;

  goCreateProperty(option: string) {
    console.log(option);
    if (option === 'captacion')
      this.router.navigate(['/cathment']);
    if (option === 'requerimiento')
      this.router.navigate(['/requirement']);
  }


}
