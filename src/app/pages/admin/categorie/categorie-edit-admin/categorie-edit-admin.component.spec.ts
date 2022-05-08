import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieEditAdminComponent } from './categorie-edit-admin.component';

describe('CategorieEditAdminComponent', () => {
  let component: CategorieEditAdminComponent;
  let fixture: ComponentFixture<CategorieEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
