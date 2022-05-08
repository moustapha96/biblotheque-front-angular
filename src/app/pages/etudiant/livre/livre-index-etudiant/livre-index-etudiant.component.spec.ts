import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreIndexEtudiantComponent } from './livre-index-etudiant.component';

describe('LivreIndexEtudiantComponent', () => {
  let component: LivreIndexEtudiantComponent;
  let fixture: ComponentFixture<LivreIndexEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreIndexEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreIndexEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
