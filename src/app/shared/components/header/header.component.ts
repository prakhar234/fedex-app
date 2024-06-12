import { Component, HostListener } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { BackdropComponent } from '../backdrop/backdrop.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavigationComponent, BackdropComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @HostListener("window:resize", ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    if(width > 767) {
      this.toggleMenuVisible = false;
    }
  }

  toggleMenuVisible = false;

  toggleMenu() {
    this.toggleMenuVisible = !this.toggleMenuVisible;
  }

}
