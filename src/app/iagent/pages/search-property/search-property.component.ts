import { Component, OnInit } from '@angular/core';
import { PropertyTypeCheck, OfferTypeCheck } from '../../interfaces/businesses.intefaces';
import { IagentService } from 'src/app/iagent/services/iagent.service';
import { Properties, Property } from '../../interfaces/property.interface';
import { environment } from '../../../../environments/environment';
import { Department } from '../../interfaces/department.interface';
@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.scss']
})
export class SearchPropertyComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  visibleSidebar: boolean = false;
  propertyTypes = PropertyTypeCheck;
  offerTypes = OfferTypeCheck;
  properties!: Properties;
  property: Property[] = [];

  prot: string[] = [];
  offt: string[] = [];
  dptId: string[] = [];
  departments: Department[] = [];
  constructor(
    private iagentService: IagentService,
  ) { }

  ngOnInit(): void {
    this.getProperties();
    this.getDepartments();
  }
  getDepartments() {
    this.iagentService.getDepartments()
      .subscribe(resp => this.departments = resp);
  }
  filter() {
    this.getProperties();
  }

  onCheckChangeProt(val: any) {
    //Verificando si existe
    if (!this.prot.includes(val)) {
      //console.log('si existe');
      this.prot.push(val);
    } else {
      //Removiendo... 
      //console.log('removiendo');
      for (let i = 0; i < this.prot.length; i++) {
        if (this.prot[i] === val) {
          this.prot.splice(i, 1);
        }
      }
    }
    console.log(this.prot);
  }



  onCheckChangeOfft(val: any) {
    //Verificando si existe
    if (!this.offt.includes(val)) {
      //console.log('si existe');
      this.offt.push(val);
    } else {
      //Removiendo... 
      //console.log('removiendo');
      for (let i = 0; i < this.offt.length; i++) {
        if (this.offt[i] === val) {
          this.offt.splice(i, 1);
        }
      }
    }
    console.log(this.offt);
  }

  onCheckChangeDp(val: any) {
    //Verificando si existe
    if (!this.dptId.includes(val)) {
      //console.log('si existe');
      this.dptId.push(val);
    } else {
      //Removiendo... 
      //console.log('removiendo');
      for (let i = 0; i < this.dptId.length; i++) {
        if (this.dptId[i] === val) {
          this.dptId.splice(i, 1);
        }
      }
    }
    console.log(this.dptId);
  }

  getProperties() {
    this.iagentService.getProperties(this.prot, this.offt, this.dptId)
      .subscribe(resp => {
        console.log(resp);
        this.properties = resp
        this.property = this.properties.items
      });
  }
}
