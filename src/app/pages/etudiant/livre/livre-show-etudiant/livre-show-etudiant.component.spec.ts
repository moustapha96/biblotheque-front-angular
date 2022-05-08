import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreShowEtudiantComponent } from './livre-show-etudiant.component';

describe('LivreShowEtudiantComponent', () => {
  let component: LivreShowEtudiantComponent;
  let fixture: ComponentFixture<LivreShowEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreShowEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreShowEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
