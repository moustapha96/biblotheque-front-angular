import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntIndexEtudiantComponent } from './emprunt-index-etudiant.component';

describe('EmpruntIndexEtudiantComponent', () => {
  let component: EmpruntIndexEtudiantComponent;
  let fixture: ComponentFixture<EmpruntIndexEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntIndexEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntIndexEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
