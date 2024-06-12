import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  standalone: true,
  imports: [],
  templateUrl: './backdrop.component.html',
  styleUrl: './backdrop.component.scss'
})
export class BackdropComponent {
  @Output() backdropClick = new EventEmitter<void>();

  handleClick() {
    this.backdropClick.emit();
  }

}
