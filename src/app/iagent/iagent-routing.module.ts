import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CathmentComponent } from './pages/cathment/cathment.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { LogbookComponent } from './pages/logbook/logbook.component';
import { RequirementComponent } from './pages/requirement/requirement.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { SearchPropertyComponent } from './pages/search-property/search-property.component';
import { DeailPropertyComponent } from './pages/deail-property/deail-property.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'cathment',
        component: CathmentComponent,
      },
      {
        path: 'requirement',
        component: RequirementComponent,
      },
      {
        path: 'matches/:id',
        component: MatchesComponent,
      },
      { path: 'detalles/:id', component: LogbookComponent },
      { path: 'datelle-propidad/:id', component: DeailPropertyComponent },
      {
        path: 'search',
        component: SearchPropertyComponent,
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IagentRoutingModule { }
