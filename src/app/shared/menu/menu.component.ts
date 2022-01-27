import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  visibleSidebar: boolean = false;
  email!: string;
  ngOnInit() {
    this.items = [
      // {
      //   label: 'File',
      //   items: [{
      //     label: 'New',
      //     icon: 'pi pi-fw pi-plus',
      //     items: [
      //       { label: 'Project' },
      //       { label: 'Other' },
      //     ]
      //   },
      //   { label: 'Open' },
      //   { label: 'Quit' }
      //   ]
      // },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      //   items: [
      //     { label: 'Delete', icon: 'pi pi-fw pi-trash' },
      //     { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
      //   ]
      // },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
        //routerLink: 'home'
      },
      // {
      //   label: 'Captación',
      //   icon: 'pi pi-fw pi-home',
      //   routerLink: 'cathment'
      // },
      // {
      //   label: 'Requerimiento',
      //   icon: 'pi pi-fw pi-search',
      //   routerLink: 'requirement'
      // },

    ];

  }

  constructor(
    private router: Router,
    private authservice: AuthService
  ) {
    this.email = authservice.getEmail()!;
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authservice.logout();
  }


}
