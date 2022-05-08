import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntIndexAdminComponent } from './emprunt-index-admin.component';

describe('EmpruntIndexAdminComponent', () => {
  let component: EmpruntIndexAdminComponent;
  let fixture: ComponentFixture<EmpruntIndexAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntIndexAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntIndexAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
