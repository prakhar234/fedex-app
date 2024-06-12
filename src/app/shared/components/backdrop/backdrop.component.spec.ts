import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdropComponent } from './backdrop.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BackdropComponent', () => {
  let component: BackdropComponent;
  let fixture: ComponentFixture<BackdropComponent>;
  let el: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackdropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackdropComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    spyOn(component.backdropClick, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit backdrop click event on click', () => {
    const backdrop = el.queryAll(By.css('.backdrop'))[0].nativeElement;
    backdrop.dispatchEvent(new Event('click'))
    expect(component.backdropClick.emit).toHaveBeenCalled();
  })
});
