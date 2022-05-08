import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIndexAdminComponent } from './user-index-admin.component';

describe('UserIndexAdminComponent', () => {
  let component: UserIndexAdminComponent;
  let fixture: ComponentFixture<UserIndexAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIndexAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIndexAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
