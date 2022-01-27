import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
//Custom modules
import { AppRouterModule } from './app-router.module';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

// import { PrimengModule } from './primeng/primeng.module';
// import { SharedModule } from './shared/shared.module';
// import { AgentModule } from './agent/agent.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //Rutas
    AppRouterModule,
    // //Componentes PrimeNG
    // PrimengModule,
    // //Componentes
    // SharedModule,
    // AgentModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
