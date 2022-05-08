import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreEditAdminComponent } from './livre-edit-admin.component';

describe('LivreEditAdminComponent', () => {
  let component: LivreEditAdminComponent;
  let fixture: ComponentFixture<LivreEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
