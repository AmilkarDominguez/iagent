import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Business } from '../../interfaces/businesses.intefaces';
import { ActivatedRoute } from '@angular/router';
import { IagentService } from '../../services/iagent.service';
import { switchMap } from 'rxjs/operators';
import { Property, Properties } from '../../interfaces/property.interface';
import { Log } from '../../interfaces/log.interface';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class MatchesComponent implements OnInit {
  visibleSidebar: boolean = false;
  baseUrl: string = environment.baseUrl;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private iagentService: IagentService,
  ) { }

  businesses: Business[] = [
    {
      state: 'Nuevo',
      type: 'Casa',
      price: 150000.00,
    },
    {
      state: 'Nuevo',
      type: 'Casa',
      price: 100000.00,
    },
    {
      state: 'Nuevo',
      type: 'Casa',
      price: 12345.00,
    },
    {
      state: 'Nuevo',
      type: 'Casa',
      price: 150000.00,
    },
    {
      state: 'Nuevo',
      type: 'Departamento',
      price: 12000.00,
    },
  ];

  properties: Property[] = [];

  id: number = 0;
  log: Log[] = [];
  Properties!: Properties;
  property: Property[] = [];
  ngOnInit(): void {
    this.showModalDialog()

  }


  showModalDialog(): void {
    //this.displayModal = true;
    this.confirmationService.confirm({
      // message: 'Are you sure that you want to proceed?',
      // header: 'Confirmation',
      // icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.messageService = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: 'You have accepted' });
      },
      reject: () => {
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({ severity: 'info', summary: 'Bienvenido', detail: 'You have accepted' });
      }
    });
  }
  viewMatches(): void {
    console.log('arrived');
    this.confirmationService.close();




    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.iagentService.getPropertiesByMatch(id)),
      )
      .subscribe(pro => this.properties = pro);

    // this.activatedRoute.params
    //   .pipe(
    //     switchMap(({ id }) => this.iagentService.getPropertiesByMatch(id)),
    //   )
    //   .subscribe(pro => this.property = pro);

    // console.log(this.property);


  }

  // getPropertiesByMatch() {
  //   this.iagentService.getPropertiesByMatch(6).subscribe(
  //     pro => { this.properties = pro }
  //   );
  // }

}
