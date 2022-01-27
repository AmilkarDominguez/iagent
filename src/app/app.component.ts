import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
export let AppHttpClient: HttpClient;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iagent';

  constructor(
    private httpClient: HttpClient
  ) {
    AppHttpClient = this.httpClient;
  }




}

