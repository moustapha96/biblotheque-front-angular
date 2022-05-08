import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreCreateAdminComponent } from './livre-create-admin.component';

describe('LivreCreateAdminComponent', () => {
  let component: LivreCreateAdminComponent;
  let fixture: ComponentFixture<LivreCreateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreCreateAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreCreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
