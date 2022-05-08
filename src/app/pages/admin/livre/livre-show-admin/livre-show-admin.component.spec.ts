import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreShowAdminComponent } from './livre-show-admin.component';

describe('LivreShowAdminComponent', () => {
  let component: LivreShowAdminComponent;
  let fixture: ComponentFixture<LivreShowAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreShowAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreShowAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
