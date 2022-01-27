import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from '../../interfaces/property.interface';
import { Log } from '../../interfaces/log.interface';
import { IagentService } from '../../services/iagent.service';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.scss'],
  providers: [MessageService]
})
export class LogbookComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  visibleSidebar: boolean = false;
  _status: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private iagentService: IagentService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  registerForm: FormGroup = this.fb.group({
    action: ['CONTACTO', [Validators.required, Validators.minLength(3)]],
    detail: ['Detalle de bitacora', [Validators.required, Validators.minLength(3)]]
  });


  property!: Property;
  id: number = 0;
  log: Log[] = [];

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.iagentService.getPropertyById(id)),
        //switchMap(({ id }) => this.iagentService.getLogs(id))
      )
      .subscribe(pro => {
        this.property = pro
        this._status = this.property.status;
      });


    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = id
      this.iagentService.getLogs(id)
        .subscribe((resp) => {
          //console.log(resp)
          this.log = resp.items;
          //console.log(this.log)
        });
    });

  }

  fiedlIsValid(field: string) {
    return this.registerForm.controls[field].errors
      && this.registerForm.controls[field].touched;
  }

  registerLog() {
    const {
      action,
      detail,
    } = this.registerForm.value;

    //console.log(this.id);

    this.iagentService.registerLog(this.id, action, detail)
      .subscribe(resp => {

        //console.log(resp);

        this.iagentService.getLogs(this.id).subscribe(resp => this.log = resp.items)


      });
  }
  openGoogleMap() {
    window.open("https://maps.google.com/?q=" + this.property.lat + "," + this.property.lon, '_blank');
  }

  updateStatus() {
    this.iagentService.updateStatusProperty(this.id, this._status)
      .subscribe(resp => {
        console.log(resp);
      });
  }

}
