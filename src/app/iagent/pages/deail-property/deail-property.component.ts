import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../interfaces/property.interface';
import { IagentService } from '../../services/iagent.service';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-deail-property',
  templateUrl: './deail-property.component.html',
  styleUrls: ['./deail-property.component.scss'],
  providers: [MessageService]
})
export class DeailPropertyComponent implements OnInit {

  property!: Property;
  baseUrl: string = environment.baseUrl;
  visibleSidebar: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private iagentService: IagentService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.iagentService.getPropertyById(id)),
      )
      .subscribe(pro => this.property = pro);
  }

  openGoogleMap() {
    window.open("https://maps.google.com/?q=" + this.property.lat + "," + this.property.lon, '_blank');
  }
}
