import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheAdminComponent } from './recherche-admin.component';

describe('RechercheAdminComponent', () => {
  let component: RechercheAdminComponent;
  let fixture: ComponentFixture<RechercheAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
