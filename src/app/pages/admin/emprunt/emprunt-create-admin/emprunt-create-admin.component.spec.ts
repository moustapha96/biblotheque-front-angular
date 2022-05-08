import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntCreateAdminComponent } from './emprunt-create-admin.component';

describe('EmpruntCreateAdminComponent', () => {
  let component: EmpruntCreateAdminComponent;
  let fixture: ComponentFixture<EmpruntCreateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntCreateAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntCreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
