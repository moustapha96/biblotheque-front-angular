import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieCreateAdminComponent } from './categorie-create-admin.component';

describe('CategorieCreateAdminComponent', () => {
  let component: CategorieCreateAdminComponent;
  let fixture: ComponentFixture<CategorieCreateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieCreateAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieCreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
