import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntShowEtudiantComponent } from './emprunt-show-etudiant.component';

describe('EmpruntShowEtudiantComponent', () => {
  let component: EmpruntShowEtudiantComponent;
  let fixture: ComponentFixture<EmpruntShowEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntShowEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntShowEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
