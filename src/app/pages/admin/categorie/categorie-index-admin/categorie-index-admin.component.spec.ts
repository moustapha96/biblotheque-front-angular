import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieIndexAdminComponent } from './categorie-index-admin.component';

describe('CategorieIndexAdminComponent', () => {
  let component: CategorieIndexAdminComponent;
  let fixture: ComponentFixture<CategorieIndexAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieIndexAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieIndexAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
