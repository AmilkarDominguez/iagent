import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PrimengModule } from '../primeng/primeng.module';
import { GraficaComponent } from './grafica/grafica.component';
import { OpsidebarComponent } from './opsidebar/opsidebar.component';

@NgModule({
  declarations: [
    MenuComponent,
    GraficaComponent,
    OpsidebarComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports:[
    MenuComponent,
    GraficaComponent,
    OpsidebarComponent
  ]
})
export class SharedModule { }
