import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntEditAdminComponent } from './emprunt-edit-admin.component';

describe('EmpruntEditAdminComponent', () => {
  let component: EmpruntEditAdminComponent;
  let fixture: ComponentFixture<EmpruntEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
