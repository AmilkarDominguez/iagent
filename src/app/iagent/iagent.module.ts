import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IagentRoutingModule } from './iagent-routing.module';
import { MainComponent } from './pages/main/main.component';


import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { CathmentComponent } from './pages/cathment/cathment.component';
import { LogbookComponent } from './pages/logbook/logbook.component';
import { RequirementComponent } from './pages/requirement/requirement.component';
import { MatchesComponent } from './pages/matches/matches.component';

import { HttpClientModule } from '@angular/common/http';
import { SearchPropertyComponent } from './pages/search-property/search-property.component';
import { DeailPropertyComponent } from './pages/deail-property/deail-property.component';
@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    CathmentComponent,
    LogbookComponent,
    RequirementComponent,
    MatchesComponent,
    SearchPropertyComponent,
    DeailPropertyComponent
  ],
  imports: [
    CommonModule,
    IagentRoutingModule,
    PrimengModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class IagentModule { }
