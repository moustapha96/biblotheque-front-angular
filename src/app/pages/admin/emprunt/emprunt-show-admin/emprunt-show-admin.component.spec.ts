import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntShowAdminComponent } from './emprunt-show-admin.component';

describe('EmpruntShowAdminComponent', () => {
  let component: EmpruntShowAdminComponent;
  let fixture: ComponentFixture<EmpruntShowAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntShowAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntShowAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
