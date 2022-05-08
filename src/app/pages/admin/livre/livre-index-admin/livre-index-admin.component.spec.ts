import { ComponentFixture, TestBed } from '@angular/core/testing';

import LivreIndexAdminComponent from './livre-index-admin.component';

describe('LivreIndexAdminComponent', () => {
  let component: LivreIndexAdminComponent;
  let fixture: ComponentFixture<LivreIndexAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreIndexAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreIndexAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
