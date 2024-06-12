import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  provideRouter,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { routes } from '../../../app.routes';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter(routes, withViewTransitions()),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have trials as the logo', () => {
    const headerLogo = el.query(By.css('.app-header-logo'));
    expect(headerLogo.nativeElement.textContent).toEqual('FedEx');
  });

  it('should have navigation items', () => {
    const navBar = el.query(By.css('.navigation'));
    expect(navBar).toBeTruthy();
  });

  it('should toggle menu', () => {
    expect(component.toggleMenuVisible).toBeFalse();
    component.toggleMenu();
    expect(component.toggleMenuVisible).toBeTrue();
  })

  it('should call onResize when window is resized', () => {
    spyOn(component, 'onResize').and.callThrough();
    const resizeEvent = new Event('resize');
    Object.defineProperty(resizeEvent, 'target', {
      value: {
        innerWidth: 1024
      },
      writable: false
    });

    // Dispatch the resize event
    window.dispatchEvent(resizeEvent);
    fixture.detectChanges();
    expect(component.onResize).toHaveBeenCalled();
  });

  it('should have toggleMenuVisible as false when window size is more than 767', () => {
    spyOn(component, 'onResize').and.callThrough();
    const resizeEvent = new Event('resize');
    Object.defineProperty(resizeEvent, 'target', {
      value: {
        innerWidth: 1024
      },
      writable: false
    });

    // Dispatch the resize event
    window.dispatchEvent(resizeEvent);
    fixture.detectChanges();
    expect(component.onResize).toHaveBeenCalled();
    expect(component.toggleMenuVisible).toBeFalse();
  });
});
