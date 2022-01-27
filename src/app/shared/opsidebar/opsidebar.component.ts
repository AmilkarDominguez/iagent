import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-opsidebar',
  templateUrl: './opsidebar.component.html',
  styleUrls: ['./opsidebar.component.scss']
})
export class OpsidebarComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private router: Router,
    private authservice: AuthService
  ) {

    this.items = [
      {
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-fw pi-external-link',
            routerLink: '/home'
          },
        ]
      },
      {
        label: 'Propiedad',
        items: [
          {
            label: 'Crear captación',
            icon: 'pi pi-fw pi-external-link',
            routerLink: '/cathment'
          },
          {
            label: 'Crear requerimiento',
            icon: 'pi pi-external-link',
            routerLink: '/requirement'
          },
        ]
      },
      {
        label: 'Buscar',
        items: [
          {
            label: 'Buscar propiedad',
            icon: 'pi pi-external-link',
            routerLink: '/search'
          },
        ]
      },
      // {
      //   label: 'Edit',
      //   items: [
      //     {
      //       label: 'Add User',
      //       icon: './assets/icon/bed.svg'
      //     },
      //     {
      //       label: 'Remove User',
      //       icon: 'pi pi-fw pi-user-minus'
      //     }
      //   ]
      // },
    ];
  }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authservice.logout();
  }
}
