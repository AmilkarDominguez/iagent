import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsidebarComponent } from './opsidebar.component';

describe('OpsidebarComponent', () => {
  let component: OpsidebarComponent;
  let fixture: ComponentFixture<OpsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
