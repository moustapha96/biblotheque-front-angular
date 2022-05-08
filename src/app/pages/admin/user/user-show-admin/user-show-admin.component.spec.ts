import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowAdminComponent } from './user-show-admin.component';

describe('UserShowAdminComponent', () => {
  let component: UserShowAdminComponent;
  let fixture: ComponentFixture<UserShowAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShowAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
