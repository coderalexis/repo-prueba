import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título en la barra de herramientas', () => {
    const toolbarElement = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbarElement).toBeTruthy();

    const titleElement = toolbarElement.query(By.css('span'));
    expect(titleElement.nativeElement.textContent).toContain('Veterinaria Patitas');
  });

  it('debería tener botones de navegación con rutas correctas', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button[mat-button]'));
    expect(buttons.length).toBe(3);

    const expectedLinks = ['/', '/nueva-cita', '/lista-citas'];
    buttons.forEach((button, index) => {
      const routerLink = button.attributes['routerLink'];
      expect(routerLink).toBe(expectedLinks[index]);
      const buttonText = button.nativeElement.textContent.trim();
      const expectedTexts = ['Inicio', 'Nueva Cita', 'Ver Citas'];
      expect(buttonText).toBe(expectedTexts[index]);
    });
  });

  it('debería contener un router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });
});
