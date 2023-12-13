import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalificarPeliculaPage } from './calificar-pelicula.page';

describe('CalificarPeliculaPage', () => {
  let component: CalificarPeliculaPage;
  let fixture: ComponentFixture<CalificarPeliculaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalificarPeliculaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
